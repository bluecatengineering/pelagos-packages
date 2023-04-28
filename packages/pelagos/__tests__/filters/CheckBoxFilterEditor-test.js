import {useState} from 'react';
import {shallow} from 'enzyme';

import CheckBoxFilterEditor, {
	NewCheckBoxFilterEditor,
	OldCheckBoxFilterEditor,
} from '../../src/filters/CheckBoxFilterEditor';

jest.unmock('../../src/filters/CheckBoxFilterEditor');

const anyFunction = expect.any(Function);

describe('CheckBoxFilterEditor', () => {
	describe('rendering', () => {
		it('renders expected elements when forArea is not set', () => {
			const wrapper = shallow(<CheckBoxFilterEditor label="label" options={[]} getLabel={jest.fn()} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when forArea is set', () => {
			const wrapper = shallow(<CheckBoxFilterEditor label="label" options={[]} getLabel={jest.fn()} forArea />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('OldCheckBoxFilterEditor', () => {
		describe('rendering', () => {
			it('renders expected elements', () => {
				const wrapper = shallow(
					<OldCheckBoxFilterEditor label="label" list={['a']} options={['a', 'b']} getLabel={(o) => o} />
				);
				expect(wrapper.getElement()).toMatchSnapshot();
			});
		});

		describe('behaviour', () => {
			it('adds an item to the list', () => {
				const onListChange = jest.fn();
				const wrapper = shallow(
					<OldCheckBoxFilterEditor
						label="label"
						list={['b']}
						options={['a']}
						getLabel={jest.fn()}
						onListChange={onListChange}
					/>
				);
				wrapper.find('#checkBoxOption-a').prop('onChange')();
				expect(onListChange.mock.calls).toEqual([[['b', 'a']]]);
			});

			it('adds an item to the list when the list is null', () => {
				const onListChange = jest.fn();
				const wrapper = shallow(
					<OldCheckBoxFilterEditor
						label="label"
						list={null}
						options={['a']}
						getLabel={jest.fn()}
						onListChange={onListChange}
					/>
				);
				wrapper.find('#checkBoxOption-a').prop('onChange')();
				expect(onListChange.mock.calls).toEqual([[['a']]]);
			});

			it('removes an item from the list', () => {
				const onListChange = jest.fn();
				const wrapper = shallow(
					<OldCheckBoxFilterEditor
						label="label"
						list={['a', 'b']}
						options={['a']}
						getLabel={jest.fn()}
						onListChange={onListChange}
					/>
				);
				wrapper.find('#checkBoxOption-a').prop('onChange')();
				expect(onListChange.mock.calls).toEqual([[['b']]]);
			});

			it('removes the last item from the list', () => {
				const onListChange = jest.fn();
				const wrapper = shallow(
					<OldCheckBoxFilterEditor
						label="label"
						list={['a']}
						options={['a']}
						getLabel={jest.fn()}
						onListChange={onListChange}
					/>
				);
				wrapper.find('#checkBoxOption-a').prop('onChange')();
				expect(onListChange.mock.calls).toEqual([[null]]);
			});
		});
	});

	describe('NewCheckBoxFilterEditor', () => {
		describe('rendering', () => {
			it('renders expected elements', () => {
				const wrapper = shallow(
					<NewCheckBoxFilterEditor
						id="test"
						label="label"
						list={['a']}
						options={['a', 'b']}
						getLabel={(o) => o}
						chipId="button"
					/>
				);
				expect(wrapper.getElement()).toMatchSnapshot();
			});

			it('renders expected elements when list is not set', () => {
				const wrapper = shallow(
					<NewCheckBoxFilterEditor id="test" label="label" options={['a', 'b']} getLabel={(o) => o} chipId="button" />
				);
				expect(wrapper.getElement()).toMatchSnapshot();
			});
		});

		describe('behaviour', () => {
			it('adds an item to the list', () => {
				const list = ['b'];
				const setList = jest.fn();
				useState.mockReturnValueOnce([list, setList]);
				const wrapper = shallow(
					<NewCheckBoxFilterEditor id="test" label="label" list={list} options={['a']} getLabel={jest.fn()} />
				);
				wrapper.find('#test-a').simulate('change', {target: {checked: true, value: '0'}});
				expect(setList.mock.calls).toEqual([[anyFunction]]);
				expect(setList.mock.calls[0][0](list)).toEqual(['b', 'a']);
			});

			it('removes an item from the list', () => {
				const list = ['a', 'b'];
				const setList = jest.fn();
				useState.mockReturnValueOnce([list, setList]);
				const wrapper = shallow(
					<NewCheckBoxFilterEditor id="test" label="label" list={list} options={['a']} getLabel={jest.fn()} />
				);
				wrapper.find('#test-a').simulate('change', {target: {checked: false, value: '0'}});
				expect(setList.mock.calls).toEqual([[anyFunction]]);
				expect(setList.mock.calls[0][0](list)).toEqual(['b']);
			});

			it('calls onSave when the editor calls onSave', () => {
				const list = ['a'];
				const onSave = jest.fn();
				const wrapper = shallow(
					<NewCheckBoxFilterEditor
						id="test"
						label="label"
						list={list}
						options={['a', 'b']}
						getLabel={(o) => o}
						onSave={onSave}
					/>
				);
				wrapper.find('#test').prop('onSave')();
				expect(onSave.mock.calls).toEqual([[list]]);
			});

			it('calls onSave when the editor calls onSave and the list is empty', () => {
				const onSave = jest.fn();
				const wrapper = shallow(
					<NewCheckBoxFilterEditor
						id="test"
						label="label"
						list={[]}
						options={['a', 'b']}
						getLabel={(o) => o}
						onSave={onSave}
					/>
				);
				wrapper.find('#test').prop('onSave')();
				expect(onSave.mock.calls).toEqual([[null]]);
			});
		});
	});
});
