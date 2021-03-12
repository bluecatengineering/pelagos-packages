import {useState} from 'react';
import {shallow} from 'enzyme';

import FilterList from '../../src/filters/FilterList';

jest.unmock('../../src/filters/FilterList');
jest.unmock('../../src/strings');

const FilterEditor = () => <></>;
const getFilterTitle = (name) => name;

global.document = {body: {}};

describe('FilterList', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<FilterList />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when filters are set', () => {
			const getValues = jest.fn();
			const filters = {
				view: [{id: 'a'}, {id: 'abc'}],
				zoneName: ['b'],
			};
			const views = ['a', 'abc'];

			const wrapper = shallow(
				<FilterList
					filters={filters}
					views={views}
					excludedKeys={[]}
					getFilterTitle={getFilterTitle}
					getValues={getValues}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when filter is set', () => {
			const getValues = jest.fn();
			const filters = {view: ['abc']};
			const setFilter = jest.fn();
			useState.mockReturnValue(['view', setFilter]);
			const wrapper = shallow(
				<FilterList
					filters={filters}
					excludedKeys={[]}
					getFilterTitle={getFilterTitle}
					getValues={getValues}
					filterEditor={FilterEditor}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when filter key is excluded', () => {
			const getValues = jest.fn();
			const filters = {view: ['abc']};
			const setFilter = jest.fn();
			useState.mockReturnValue(['view', setFilter]);
			const wrapper = shallow(
				<FilterList
					filters={filters}
					excludedKeys={['view']}
					getFilterTitle={getFilterTitle}
					getValues={getValues}
					filterEditor={FilterEditor}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onApply with null when a remove button is clicked', () => {
			const getValues = jest.fn();
			const filters = {view: ['abc']};
			const onApply = jest.fn();
			const remove = {dataset: {key: 'view'}};
			const event = {
				target: {
					closest: jest.fn().mockReturnValueOnce(remove),
				},
				stopPropagation: jest.fn(),
			};
			const wrapper = shallow(
				<FilterList
					filters={filters}
					onApply={onApply}
					excludedKeys={[]}
					getFilterTitle={getFilterTitle}
					getValues={getValues}
					filterEditor={FilterEditor}
				/>
			);
			wrapper.find('[onClick]').simulate('click', event);
			expect(event.target.closest.mock.calls).toEqual([['[data-kind="remove"]']]);
			expect(event.stopPropagation.mock.calls).toEqual([[]]);
			expect(onApply.mock.calls).toEqual([['view', null]]);
		});

		it('calls setFilter when a filter button is clicked', () => {
			const getValues = jest.fn();
			const filters = {view: ['abc']};
			const setFilter = jest.fn();
			const item = {dataset: {key: 'view'}};
			const event = {
				target: {
					closest: jest.fn().mockReturnValueOnce(null).mockReturnValueOnce(item),
				},
				stopPropagation: jest.fn(),
			};
			useState.mockReturnValue([null, setFilter]);
			const wrapper = shallow(
				<FilterList filters={filters} getFilterTitle={getFilterTitle} getValues={getValues} excludedKeys={[]} />
			);
			wrapper.find('[onClick]').simulate('click', event);
			expect(event.target.closest.mock.calls).toEqual([['[data-kind="remove"]'], ['[data-kind="item"]']]);
			expect(event.stopPropagation.mock.calls).toEqual([[]]);
			expect(setFilter.mock.calls).toEqual([['view']]);
		});

		it('does not call setFilter when no button is clicked', () => {
			const getValues = jest.fn();
			const filters = {view: ['abc']};
			const setFilter = jest.fn();
			const event = {
				target: {
					closest: jest.fn().mockReturnValueOnce(null),
				},
				stopPropagation: jest.fn(),
			};
			useState.mockReturnValue([null, setFilter]);
			const wrapper = shallow(
				<FilterList filters={filters} getFilterTitle={getFilterTitle} getValues={getValues} excludedKeys={[]} />
			);
			wrapper.find('[onClick]').simulate('click', event);
			expect(event.target.closest.mock.calls).toEqual([['[data-kind="remove"]'], ['[data-kind="item"]']]);
			expect(event.stopPropagation.mock.calls).toEqual([]);
			expect(setFilter.mock.calls).toEqual([]);
		});

		it('calls setFilter when the editor is closed', () => {
			const getValues = jest.fn();
			const filters = {view: ['abc']};
			const setFilter = jest.fn();
			useState.mockReturnValue(['view', setFilter]);
			const wrapper = shallow(
				<FilterList
					filters={filters}
					excludedKeys={[]}
					getFilterTitle={getFilterTitle}
					getValues={getValues}
					filterEditor={FilterEditor}
				/>
			);
			wrapper.find('FilterEditor').prop('onClose')();
			expect(setFilter.mock.calls).toEqual([[null]]);
		});

		it('calls onApply when the editor is saved', () => {
			const getValues = jest.fn();
			const filters = {view: ['abc']};
			const values = ['x'];
			const setFilter = jest.fn();
			const onApply = jest.fn();
			useState.mockReturnValue(['view', setFilter]);
			const wrapper = shallow(
				<FilterList
					filters={filters}
					onApply={onApply}
					excludedKeys={[]}
					getFilterTitle={getFilterTitle}
					getValues={getValues}
					filterEditor={FilterEditor}
				/>
			);
			wrapper.find('FilterEditor').prop('onSave')(values);
			expect(setFilter.mock.calls).toEqual([[null]]);
			expect(onApply.mock.calls).toEqual([['view', values]]);
		});
	});
});
