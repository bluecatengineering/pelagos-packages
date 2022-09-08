import {useState} from 'react';
import {shallow} from 'enzyme';

import FilterMenu from '../../src/filters/FilterMenu';

jest.unmock('../../src/filters/FilterMenu');

global.document = {};

describe('FilterMenu', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const getOptionText = jest.fn();
			const options = ['a', 'b'];
			const wrapper = shallow(<FilterMenu getOptionText={getOptionText} options={options} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when filter is set', () => {
			const getOptionText = jest.fn();
			const options = ['a', 'b'];
			useState.mockReturnValueOnce(['value']);
			const wrapper = shallow(<FilterMenu getOptionText={getOptionText} options={options} getEditor={jest.fn()} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when filters is set', () => {
			const getOptionText = jest.fn();
			const options = ['a', 'b'];
			useState.mockReturnValueOnce([null]);
			const filters = {view: 'view1'};
			const wrapper = shallow(<FilterMenu filters={filters} getOptionText={getOptionText} options={options} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls setFilterName when an option is clicked', () => {
			const setFilterName = jest.fn();
			const getOptionText = jest.fn();
			const options = ['a', 'b'];
			useState.mockReturnValueOnce([null, setFilterName]);
			const wrapper = shallow(<FilterMenu getOptionText={getOptionText} options={options} />);
			wrapper.find('[data-key="a"]').simulate('click', {target: {dataset: {key: 'a'}}});
			expect(setFilterName.mock.calls).toEqual([['a']]);
		});

		it('calls setFilter when the editor is closed', () => {
			const getOptionText = jest.fn();
			const options = ['view', 'zoneName'];
			const filters = {view: ['view1']};
			const setFilter = jest.fn();
			useState.mockReturnValueOnce(['queryType', setFilter]);
			const wrapper = shallow(
				<FilterMenu filters={filters} getOptionText={getOptionText} options={options} getEditor={jest.fn()} />
			);
			wrapper.find('FilterEditor').prop('onClose')();
			expect(setFilter.mock.calls).toEqual([[null]]);
		});

		it('calls onApply when the editor is saved', () => {
			const getOptionText = jest.fn();
			const options = ['view', 'zoneName'];
			const filters = {view: ['view1']};
			const values = ['x'];
			const setFilter = jest.fn();
			const onApply = jest.fn();
			useState.mockReturnValueOnce(['view', setFilter]);
			const wrapper = shallow(
				<FilterMenu
					filters={filters}
					onApply={onApply}
					getOptionText={getOptionText}
					options={options}
					getEditor={jest.fn()}
				/>
			);
			wrapper.find('FilterEditor').prop('onSave')(values);
			expect(setFilter.mock.calls).toEqual([[null]]);
			expect(onApply.mock.calls).toEqual([['view', values]]);
		});
	});
});
