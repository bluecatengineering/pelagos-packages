import {useEffect, useRef, useState} from 'react';
import {shallow} from 'enzyme';
import {smoothScroll, scrollToItem} from '@bluecat/helpers';

import Select from '../../src/components/Select';
import useStringFinder from '../../src/hooks/useStringFinder';
import pageDown from '../../src/functions/pageDown';
import pageUp from '../../src/functions/pageUp';

jest.unmock('../../src/components/Select');

const anyFunction = expect.any(Function);

const strings = {
	one: 'One',
	two: 'Two',
	three: 'Three',
};
const options = Object.keys(strings);
const renderOption = (o) => strings[o];

global.document = {};

describe('Select', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<Select
					id="test"
					className="Test"
					value="two"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is not set', () => {
			const wrapper = shallow(
				<Select
					id="test"
					value="two"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when value is not set', () => {
			const wrapper = shallow(
				<Select
					id="test"
					className="Test"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when disabled is true', () => {
			const wrapper = shallow(
				<Select
					id="test"
					className="Test"
					value="two"
					options={options}
					placeholder="Testing"
					disabled={true}
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when error is true', () => {
			const wrapper = shallow(
				<Select
					id="test"
					className="Test"
					value="two"
					options={options}
					placeholder="Testing"
					error={true}
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when open is true', () => {
			useState.mockReturnValueOnce([true]).mockReturnValueOnce([1]);
			const wrapper = shallow(
				<Select
					id="test"
					className="Test"
					value="two"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('places the list under the button', () => {
			const button = {
				dataset: {layer: '2'},
				getBoundingClientRect: jest.fn().mockReturnValue({bottom: 100, left: 200, width: 400}),
				closest: jest.fn(),
			};
			const list = {style: {}, dataset: {}};
			useRef.mockReturnValueOnce({current: button}).mockReturnValueOnce({current: list});
			useState.mockReturnValueOnce([true]).mockReturnValueOnce([0]);
			shallow(<Select id="test" options={options} renderOption={renderOption} onChange={jest.fn()} />);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, [true]]);
			useEffect.mock.calls[0][0]();
			expect(list.style).toEqual({top: '101px', left: '200px', width: '400px'});
			expect(list.dataset).toEqual({layer: '2'});
		});

		it('does not place the list when open is false', () => {
			useState.mockReturnValueOnce([false]).mockReturnValueOnce([0]);
			shallow(<Select id="test" options={options} renderOption={renderOption} onChange={jest.fn()} />);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, [false]]);
			expect(() => useEffect.mock.calls[0][0]()).not.toThrow();
		});

		it('scrolls to current option when open changes from false to true', () => {
			const child = {offsetTop: 50, offsetHeight: 25};
			const list = {
				clientHeight: 50,
				scrollTop: 0,
				scrollHeight: 75,

				children: [{}, {}, child],
			};
			useState.mockReturnValueOnce([true]).mockReturnValueOnce([2]);
			useRef.mockReturnValueOnce({current: null}).mockReturnValueOnce({current: list});
			shallow(<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />);
			expect(useEffect.mock.calls[1]).toEqual([anyFunction, [true, 2]]);

			useEffect.mock.calls[1][0]();
			expect(scrollToItem.mock.calls).toEqual([[list, child]]);
		});

		it('does not scroll to current option when open changes from true to false', () => {
			shallow(<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />);
			expect(useEffect.mock.calls[1]).toEqual([anyFunction, [false, -1]]);

			useEffect.mock.calls[1][0]();
			expect(smoothScroll).not.toHaveBeenCalled();
		});

		it('shows the list when it is hidden and the button receives mouse down', () => {
			const setOpen = jest.fn();
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([false, setOpen]).mockReturnValueOnce([-1, setFocused]);
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('button').simulate('mousedown');
			expect(setOpen.mock.calls).toEqual([[true]]);
			expect(setFocused.mock.calls).toEqual([[2]]);
		});

		it('hides the list when it is visible and the button receives mouse down', () => {
			const setOpen = jest.fn();
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([true, setOpen]).mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('button').simulate('mousedown');
			expect(setOpen.mock.calls).toEqual([[false]]);
			expect(setFocused.mock.calls).toEqual([[-1]]);
		});

		it('scrolls the list up when it is visible and page up is pressed', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 33, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const list = {};
			useState.mockReturnValueOnce([true]).mockReturnValueOnce([2, setFocused]);
			useRef.mockReturnValueOnce({current: null}).mockReturnValueOnce({current: list});
			pageUp.mockReturnValue(0);
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('button').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[0]]);
			expect(pageUp.mock.calls).toEqual([[list, 2]]);
		});

		it('ignores the event when the list is not visible and page up is pressed', () => {
			const event = {keyCode: 33, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('button').simulate('keydown', event);
			expect(event.preventDefault).not.toHaveBeenCalled();
		});

		it('scrolls the list down when it is visible and page down is pressed', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 34, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const list = {};
			useState.mockReturnValueOnce([true]).mockReturnValueOnce([0, setFocused]);
			useRef.mockReturnValueOnce({current: null}).mockReturnValueOnce({current: list});
			pageDown.mockReturnValue(2);
			const wrapper = shallow(
				<Select id="test" value="one" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('button').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[2]]);
			expect(pageDown.mock.calls).toEqual([[list, 0]]);
		});

		it('ignores the event when the list is not visible and page down is pressed', () => {
			const event = {keyCode: 34, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('button').simulate('keydown', event);
			expect(event.preventDefault).not.toHaveBeenCalled();
		});

		it('focuses the last option when the list is visible and end is pressed', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 35, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const child = {offsetTop: 50, offsetHeight: 25};
			const list = {
				clientHeight: 50,
				scrollTop: 0,
				scrollHeight: 75,
				children: [{}, {}, child],
			};
			useState.mockReturnValueOnce([true]).mockReturnValueOnce([0, setFocused]);
			useRef.mockReturnValueOnce({current: null}).mockReturnValueOnce({current: list});
			const wrapper = shallow(
				<Select id="test" value="one" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('button').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[2]]);
			expect(scrollToItem.mock.calls).toEqual([[list, child]]);
		});

		it('ignores the event when the list is not visible and end is pressed', () => {
			const event = {keyCode: 35, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('button').simulate('keydown', event);
			expect(event.preventDefault).not.toHaveBeenCalled();
		});

		it('focuses the first option when the list is visible and home is pressed', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 36, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const child = {offsetTop: 0, offsetHeight: 25};
			const list = {
				clientHeight: 50,
				scrollTop: 25,
				scrollHeight: 75,
				children: [child, {}, {}],
			};
			useState.mockReturnValueOnce([true]).mockReturnValueOnce([2, setFocused]);
			useRef.mockReturnValueOnce({current: null}).mockReturnValueOnce({current: list});
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('button').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[0]]);
			expect(scrollToItem.mock.calls).toEqual([[list, child]]);
		});

		it('ignores the event when the list is not visible and home is pressed', () => {
			const event = {keyCode: 36, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('button').simulate('keydown', event);
			expect(event.preventDefault).not.toHaveBeenCalled();
		});

		it('focuses the previous option when the list is visible and up is pressed', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 38, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const list = {
				clientHeight: 50,
				scrollTop: 0,
				scrollHeight: 75,
				children: [{offsetTop: 0, offsetHeight: 25}, {}],
			};
			useState.mockReturnValueOnce([true]).mockReturnValueOnce([1, setFocused]);
			useRef.mockReturnValueOnce({current: null}).mockReturnValueOnce({current: list});
			const wrapper = shallow(
				<Select id="test" value="two" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('button').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[0]]);
			expect(smoothScroll).not.toHaveBeenCalled();
		});

		it('focuses the last option when the list is visible, up is pressed and the first option is focused', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 38, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const child = {offsetTop: 50, offsetHeight: 25};
			const list = {
				clientHeight: 50,
				scrollTop: 0,
				scrollHeight: 75,
				children: [{}, {}, child],
			};
			useState.mockReturnValueOnce([true]).mockReturnValueOnce([0, setFocused]);
			useRef.mockReturnValueOnce({current: null}).mockReturnValueOnce({current: list});
			const wrapper = shallow(
				<Select id="test" value="one" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('button').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[2]]);
			expect(scrollToItem.mock.calls).toEqual([[list, child]]);
		});

		it('only prevents the event default when the list is not visible and up is pressed', () => {
			const event = {keyCode: 38, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('button').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
		});

		it('focuses the next option when the list is visible and down is pressed', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 40, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const list = {
				clientHeight: 50,
				scrollTop: 25,
				scrollHeight: 75,
				children: [{}, {}, {offsetTop: 50, offsetHeight: 25}],
			};
			useState.mockReturnValueOnce([true]).mockReturnValueOnce([1, setFocused]);
			useRef.mockReturnValueOnce({current: null}).mockReturnValueOnce({current: list});
			const wrapper = shallow(
				<Select id="test" value="two" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('button').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[2]]);
			expect(smoothScroll).not.toHaveBeenCalled();
		});

		it('focuses the first option when the list is visible, down is pressed and the last option is focused', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 40, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const list = {
				clientHeight: 50,
				scrollTop: 25,
				scrollHeight: 75,
				children: [{}, {}, {offsetTop: 50, offsetHeight: 25}],
			};
			useState.mockReturnValueOnce([true]).mockReturnValueOnce([2, setFocused]);
			useRef.mockReturnValueOnce({current: null}).mockReturnValueOnce({current: list});
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('button').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[0]]);
			expect(smoothScroll).not.toHaveBeenCalled();
		});

		it('shows the list when it is not visible and down is pressed', () => {
			const setOpen = jest.fn();
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([false, setOpen]).mockReturnValueOnce([-1, setFocused]);
			const event = {keyCode: 40, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('button').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(event.nativeEvent.stopImmediatePropagation).toHaveBeenCalledTimes(1);
			expect(setOpen.mock.calls).toEqual([[true]]);
			expect(setFocused.mock.calls).toEqual([[2]]);
		});

		it('finds an option starting with typed key when the list is visible and an alphanumeric key is pressed', () => {
			const setFocused = jest.fn();
			const event = {
				keyCode: 'T'.codePointAt(0),
				preventDefault: jest.fn(),
				nativeEvent: {stopImmediatePropagation: jest.fn()},
			};
			const list = {
				clientHeight: 75,
				scrollTop: 0,
				scrollHeight: 75,
				children: options.map((o) => ({textContent: renderOption(o)})),
			};
			const find = jest.fn().mockReturnValue(1);
			useState.mockReturnValueOnce([true]).mockReturnValueOnce([0, setFocused]);
			useRef.mockReturnValueOnce({current: null}).mockReturnValueOnce({current: list});
			useStringFinder.mockReturnValue(find);
			const wrapper = shallow(
				<Select id="test" value="one" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('button').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[1]]);
			expect(smoothScroll).not.toHaveBeenCalled();
			expect(find.mock.calls).toEqual([[84, 0, 3, anyFunction]]);

			expect(find.mock.calls[0][3](1)).toBe('TWO');
		});

		it('does not change focused when the list is visible and an alphanumeric key with no matches is pressed', () => {
			const setFocused = jest.fn();
			const event = {
				keyCode: 'X'.codePointAt(0),
				preventDefault: jest.fn(),
				nativeEvent: {stopImmediatePropagation: jest.fn()},
			};
			const list = {
				clientHeight: 75,
				scrollTop: 0,
				scrollHeight: 75,
				children: options.map((o) => ({textContent: renderOption(o)})),
			};
			const find = jest.fn().mockReturnValue(-1);
			useState.mockReturnValueOnce([true]).mockReturnValueOnce([0, setFocused]);
			useRef.mockReturnValueOnce({current: null}).mockReturnValueOnce({current: list});
			useStringFinder.mockReturnValue(find);
			const wrapper = shallow(
				<Select id="test" value="one" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('button').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused).not.toHaveBeenCalled();
			expect(smoothScroll).not.toHaveBeenCalled();
			expect(find.mock.calls).toEqual([[88, 0, 3, anyFunction]]);
		});

		it('ignores the event when an unknown key is pressed', () => {
			const preventDefault = jest.fn();
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			const button = wrapper.find('button');

			button.simulate('keydown', {keyCode: 47, preventDefault});
			button.simulate('keydown', {keyCode: 91, preventDefault});

			expect(preventDefault).not.toHaveBeenCalled();
		});

		it('ignores the event when a key is pressed and any modifier is set', () => {
			const preventDefault = jest.fn();
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			const button = wrapper.find('button');

			button.simulate('keydown', {keyCode: 13, shiftKey: true, preventDefault});
			button.simulate('keydown', {keyCode: 13, ctrlKey: true, preventDefault});
			button.simulate('keydown', {keyCode: 13, altKey: true, preventDefault});
			button.simulate('keydown', {keyCode: 13, metaKey: true, preventDefault});

			expect(preventDefault).not.toHaveBeenCalled();
		});

		it('hides the list and calls onChange when it is visible and enter is pressed', () => {
			const setOpen = jest.fn();
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([true, setOpen]).mockReturnValueOnce([2, setFocused]);
			const event = {keyCode: 13, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const onChange = jest.fn();
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={onChange} />
			);
			wrapper.find('button').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setOpen.mock.calls).toEqual([[false]]);
			expect(setFocused.mock.calls).toEqual([[-1]]);
			expect(onChange.mock.calls).toEqual([['three']]);
		});

		it('shows the list when it is not visible and enter is pressed', () => {
			const setOpen = jest.fn();
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([false, setOpen]).mockReturnValueOnce([-1, setFocused]);
			const event = {keyCode: 13, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('button').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(event.nativeEvent.stopImmediatePropagation).toHaveBeenCalledTimes(1);
			expect(setOpen.mock.calls).toEqual([[true]]);
			expect(setFocused.mock.calls).toEqual([[2]]);
		});

		it('shows the list and selects the first option when enter is pressed and the value is not set', () => {
			const setOpen = jest.fn();
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([false, setOpen]).mockReturnValueOnce([-1, setFocused]);
			const event = {keyCode: 13, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const wrapper = shallow(<Select id="test" options={options} renderOption={renderOption} onChange={jest.fn()} />);
			wrapper.find('button').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(event.nativeEvent.stopImmediatePropagation).toHaveBeenCalledTimes(1);
			expect(setOpen.mock.calls).toEqual([[true]]);
			expect(setFocused.mock.calls).toEqual([[0]]);
		});

		it('hides the list when it is visible and escape is pressed', () => {
			const onChange = jest.fn();
			const setOpen = jest.fn();
			const setFocused = jest.fn();
			const event = {keyCode: 27, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			useState.mockReturnValueOnce([true, setOpen]).mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={onChange} />
			);
			wrapper.find('button').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setOpen.mock.calls).toEqual([[false]]);
			expect(setFocused.mock.calls).toEqual([[-1]]);
			expect(onChange).not.toHaveBeenCalled();
		});

		it('hides the list when it is visible and loses focus', () => {
			const setOpen = jest.fn();
			const setFocused = jest.fn();
			const onChange = jest.fn();
			useState.mockReturnValueOnce([true, setOpen]).mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(
				<Select id="test" value="one" options={options} renderOption={renderOption} onChange={onChange} />
			);
			wrapper.find('button').simulate('blur');
			expect(setOpen.mock.calls).toEqual([[false]]);
			expect(setFocused.mock.calls).toEqual([[-1]]);
			expect(onChange).not.toHaveBeenCalled();
		});

		it('prevents event default when a mouse button is pressed pressed', () => {
			const event = {preventDefault: jest.fn()};
			useState.mockReturnValueOnce([true]).mockReturnValueOnce([0]);
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);

			wrapper.find('[role="listbox"]').simulate('mousedown', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
		});

		it('hides the list and calls onChange when it is visible and an option is clicked', () => {
			const setOpen = jest.fn();
			const setFocused = jest.fn();
			const element = {dataset: {index: '1'}};
			const closest = jest.fn().mockReturnValue(element);
			const event = {target: {closest}, preventDefault: jest.fn()};
			const onChange = jest.fn();
			useState.mockReturnValueOnce([true, setOpen]).mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(
				<Select id="test" value="one" options={options} renderOption={renderOption} onChange={onChange} />
			);
			wrapper.find('[role="listbox"]').simulate('mouseup', event);
			expect(closest.mock.calls).toEqual([['[role="option"]']]);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setOpen.mock.calls).toEqual([[false]]);
			expect(setFocused.mock.calls).toEqual([[-1]]);
			expect(onChange.mock.calls).toEqual([['two']]);
		});

		it('ignores the mouse up event when the option is not found', () => {
			const closest = jest.fn();
			const event = {target: {closest}, preventDefault: jest.fn()};
			useState.mockReturnValueOnce([true]).mockReturnValueOnce([0]);
			const wrapper = shallow(
				<Select id="test" value="one" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('[role="listbox"]').simulate('mouseup', event);
			expect(closest.mock.calls).toEqual([['[role="option"]']]);
			expect(event.preventDefault).not.toHaveBeenCalled();
		});
	});
});
