import {shallow} from 'enzyme';

import CheckBoxFilterEditor from '../../src/filters/CheckBoxFilterEditor';

jest.unmock('../../src/filters/CheckBoxFilterEditor');

describe('CheckBoxFilterEditor', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<CheckBoxFilterEditor label="label" list={['a']} options={['a', 'b']} getLabel={(o) => o} />
			);
			expect(wrapper.getElements()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('adds an item to the list', () => {
			const onListChange = jest.fn();
			const wrapper = shallow(
				<CheckBoxFilterEditor
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
				<CheckBoxFilterEditor
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
				<CheckBoxFilterEditor
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
				<CheckBoxFilterEditor
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
