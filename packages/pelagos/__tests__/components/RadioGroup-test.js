import {shallow} from 'enzyme';

import RadioGroup from '../../src/components/RadioGroup';
import useRandomId from '../../src/hooks/useRandomId';

jest.unmock('../../src/components/RadioGroup');

const options = ['foo', 'bar', 'baz'];
const renderLabel = (v) => v.toUpperCase();

const pressKey = (value, key, focusedValue) => {
	const onChange = jest.fn();
	const preventDefault = jest.fn();
	const childNodes = options.map(() => ({firstChild: {focus: jest.fn()}}));
	const wrapper = shallow(
		<RadioGroup id="test" value={value} options={options} renderLabel={renderLabel} onChange={onChange} />
	);
	wrapper
		.find('#random-id')
		.simulate('keydown', {key, target: {value: focusedValue}, currentTarget: {childNodes}, preventDefault});
	return {
		changes: onChange.mock.calls,
		focused: childNodes.findIndex(({firstChild}) => firstChild.focus.mock.calls.length),
		prevented: preventDefault.mock.calls.length,
	};
};

useRandomId.mockReturnValue('random-id');

describe('RadioGroup', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<RadioGroup id="test" className="TestClass" value="foo" options={options} renderLabel={renderLabel} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useRandomId.mock.calls).toEqual([['test']]);
		});

		it('makes the first option reachable with tab when no option is selected', () => {
			const wrapper = shallow(<RadioGroup id="test" options={options} renderLabel={renderLabel} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is not set', () => {
			const wrapper = shallow(<RadioGroup id="test" value="foo" options={options} renderLabel={renderLabel} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onChange when a radio button is changed', () => {
			const onChange = jest.fn();
			const wrapper = shallow(
				<RadioGroup id="test" value="foo" options={options} renderLabel={renderLabel} onChange={onChange} />
			);
			wrapper.find('#random-id-bar').simulate('change', {target: {value: 'bar'}});
			expect(onChange.mock.calls).toEqual([['bar']]);
		});

		it('calls onChange when the left key is pressed', () => {
			expect(pressKey('bar', 'ArrowLeft', 'bar')).toEqual({changes: [['foo']], focused: 0, prevented: 1});
		});

		it('calls onChange when the up key is pressed on the first option', () => {
			expect(pressKey('foo', 'ArrowUp', 'foo')).toEqual({changes: [['baz']], focused: 2, prevented: 1});
		});

		it('calls onChange when the right key is pressed', () => {
			expect(pressKey('bar', 'ArrowRight', 'bar')).toEqual({changes: [['baz']], focused: 2, prevented: 1});
		});

		it('calls onChange when the down key is pressed on the last option', () => {
			expect(pressKey('baz', 'ArrowDown', 'baz')).toEqual({changes: [['foo']], focused: 0, prevented: 1});
		});

		it('moves from the focused option when no option is selected', () => {
			expect(pressKey(undefined, 'ArrowDown', 'foo')).toEqual({changes: [['bar']], focused: 1, prevented: 1});
			expect(pressKey(undefined, 'ArrowUp', 'foo')).toEqual({changes: [['baz']], focused: 2, prevented: 1});
		});

		it('does not call onChange when other key is pressed', () => {
			const onChange = jest.fn();
			const wrapper = shallow(
				<RadioGroup id="test" value="baz" options={options} renderLabel={renderLabel} onChange={onChange} />
			);
			wrapper.find('#random-id').simulate('keydown', {key: ' '});
			expect(onChange).not.toHaveBeenCalled();
		});
	});
});
