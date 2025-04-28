import {useLayoutEffect, useRef, useState} from 'react';
import {shallow} from 'enzyme';

import Select from '../../src/components/Select';
import useStringFinder from '../../src/hooks/useStringFinder';
import pageDown from '../../src/functions/pageDown';
import pageUp from '../../src/functions/pageUp';
import scrollToItem from '../../src/functions/scrollToItem';
import smoothScroll from '../../src/functions/smoothScroll';
import getInnerText from '../../src/functions/getInnerText';
import useRandomId from '../../src/hooks/useRandomId';

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

useRandomId.mockReturnValue('random-id');
getInnerText.mockReturnValue('text');

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
			expect(useRandomId.mock.calls).toEqual([['test']]);
		});

		it('renders expected elements when options are booleans', () => {
			const wrapper = shallow(
				<Select
					id="test"
					className="Test"
					value={false}
					options={[true, false]}
					placeholder="Testing"
					renderOption={(v) => (v ? 'Yes' : 'No')}
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

		it('renders expected elements when noLayer is true', () => {
			const wrapper = shallow(
				<Select
					id="test"
					className="Test"
					value="two"
					options={options}
					placeholder="Testing"
					noLayer
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
		it('scrolls to current option when open changes from false to true', () => {
			const child = {offsetTop: 50, offsetHeight: 25};
			const button = {closest: jest.fn().mockReturnValue({dataset: {theme: 'white'}})};
			const list = {
				clientHeight: 50,
				scrollTop: 0,
				scrollHeight: 75,

				children: [{}, {}, child],
				dataset: {},
			};
			useState.mockReturnValueOnce([true]).mockReturnValueOnce([2]);
			useRef.mockReturnValueOnce({current: button}).mockReturnValueOnce({current: list});
			shallow(<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />);
			expect(useLayoutEffect.mock.calls[0]).toEqual([anyFunction, [true, 2]]);

			useLayoutEffect.mock.calls[0][0]();
			expect(scrollToItem.mock.calls).toEqual([[list, child]]);
			expect(list.dataset.theme).toBe('white');
		});

		it('scrolls to current option when open changes from false to true and closest returns null', () => {
			const child = {offsetTop: 50, offsetHeight: 25};
			const button = {closest: jest.fn().mockReturnValue(null)};
			const list = {
				clientHeight: 50,
				scrollTop: 0,
				scrollHeight: 75,

				children: [{}, {}, child],
				dataset: {},
			};
			useState.mockReturnValueOnce([true]).mockReturnValueOnce([2]);
			useRef.mockReturnValueOnce({current: button}).mockReturnValueOnce({current: list});
			shallow(<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />);
			expect(useLayoutEffect.mock.calls[0]).toEqual([anyFunction, [true, 2]]);

			useLayoutEffect.mock.calls[0][0]();
			expect(scrollToItem.mock.calls).toEqual([[list, child]]);
			expect(list.dataset.theme).toBeUndefined();
		});

		it('does not scroll to current option when open changes from true to false', () => {
			shallow(<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />);
			expect(useLayoutEffect.mock.calls[0]).toEqual([anyFunction, [false, -1]]);

			useLayoutEffect.mock.calls[0][0]();
			expect(smoothScroll).not.toHaveBeenCalled();
		});

		it('shows the list when it is hidden and the button receives mouse down', () => {
			const setOpen = jest.fn();
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([false, setOpen]).mockReturnValueOnce([-1, setFocused]);
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('[role="combobox"]').simulate('mousedown');
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
			wrapper.find('[role="combobox"]').simulate('mousedown');
			expect(setOpen.mock.calls).toEqual([[false]]);
			expect(setFocused.mock.calls).toEqual([[-1]]);
		});

		it('scrolls the list up when it is visible and page up is pressed', () => {
			const setFocused = jest.fn();
			const event = {key: 'PageUp', preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const list = {};
			useState.mockReturnValueOnce([true]).mockReturnValueOnce([2, setFocused]);
			useRef.mockReturnValueOnce({current: null}).mockReturnValueOnce({current: list});
			pageUp.mockReturnValue(0);
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('[role="combobox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[0]]);
			expect(pageUp.mock.calls).toEqual([[list, 2]]);
		});

		it('ignores the event when the list is not visible and page up is pressed', () => {
			const event = {key: 'PageUp', preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('[role="combobox"]').simulate('keydown', event);
			expect(event.preventDefault).not.toHaveBeenCalled();
		});

		it('scrolls the list down when it is visible and page down is pressed', () => {
			const setFocused = jest.fn();
			const event = {key: 'PageDown', preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const list = {};
			useState.mockReturnValueOnce([true]).mockReturnValueOnce([0, setFocused]);
			useRef.mockReturnValueOnce({current: null}).mockReturnValueOnce({current: list});
			pageDown.mockReturnValue(2);
			const wrapper = shallow(
				<Select id="test" value="one" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('[role="combobox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[2]]);
			expect(pageDown.mock.calls).toEqual([[list, 0]]);
		});

		it('ignores the event when the list is not visible and page down is pressed', () => {
			const event = {key: 'PageDown', preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('[role="combobox"]').simulate('keydown', event);
			expect(event.preventDefault).not.toHaveBeenCalled();
		});

		it('focuses the last option when the list is visible and end is pressed', () => {
			const setFocused = jest.fn();
			const event = {key: 'End', preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
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
			wrapper.find('[role="combobox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[2]]);
			expect(scrollToItem.mock.calls).toEqual([[list, child]]);
		});

		it('ignores the event when the list is not visible and end is pressed', () => {
			const event = {key: 'End', preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('[role="combobox"]').simulate('keydown', event);
			expect(event.preventDefault).not.toHaveBeenCalled();
		});

		it('focuses the first option when the list is visible and home is pressed', () => {
			const setFocused = jest.fn();
			const event = {key: 'Home', preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
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
			wrapper.find('[role="combobox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[0]]);
			expect(scrollToItem.mock.calls).toEqual([[list, child]]);
		});

		it('ignores the event when the list is not visible and home is pressed', () => {
			const event = {key: 'Home', preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('[role="combobox"]').simulate('keydown', event);
			expect(event.preventDefault).not.toHaveBeenCalled();
		});

		it('focuses the previous option when the list is visible and up is pressed', () => {
			const setFocused = jest.fn();
			const event = {key: 'ArrowUp', preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
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
			wrapper.find('[role="combobox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[0]]);
			expect(smoothScroll).not.toHaveBeenCalled();
		});

		it('focuses the last option when the list is visible, up is pressed and the first option is focused', () => {
			const setFocused = jest.fn();
			const event = {key: 'ArrowUp', preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
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
			wrapper.find('[role="combobox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[2]]);
			expect(scrollToItem.mock.calls).toEqual([[list, child]]);
		});

		it('only prevents the event default when the list is not visible and up is pressed', () => {
			const event = {key: 'ArrowUp', preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('[role="combobox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
		});

		it('focuses the next option when the list is visible and down is pressed', () => {
			const setFocused = jest.fn();
			const event = {key: 'ArrowDown', preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
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
			wrapper.find('[role="combobox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[2]]);
			expect(smoothScroll).not.toHaveBeenCalled();
		});

		it('focuses the first option when the list is visible, down is pressed and the last option is focused', () => {
			const setFocused = jest.fn();
			const event = {key: 'ArrowDown', preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
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
			wrapper.find('[role="combobox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[0]]);
			expect(smoothScroll).not.toHaveBeenCalled();
		});

		it('shows the list when it is not visible and down is pressed', () => {
			const setOpen = jest.fn();
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([false, setOpen]).mockReturnValueOnce([-1, setFocused]);
			const event = {key: 'ArrowDown', preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('[role="combobox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(event.nativeEvent.stopImmediatePropagation).toHaveBeenCalledTimes(1);
			expect(setOpen.mock.calls).toEqual([[true]]);
			expect(setFocused.mock.calls).toEqual([[2]]);
		});

		it('finds an option starting with typed key when the list is visible and an alphanumeric key is pressed', () => {
			const setFocused = jest.fn();
			const event = {
				key: 'T',
				preventDefault: jest.fn(),
				nativeEvent: {stopImmediatePropagation: jest.fn()},
			};
			const list = {children: []};
			const find = jest.fn().mockReturnValue(1);
			useState.mockReturnValueOnce([true]).mockReturnValueOnce([0, setFocused]);
			useRef.mockReturnValueOnce({current: null}).mockReturnValueOnce({current: list});
			useStringFinder.mockReturnValue(find);
			const wrapper = shallow(
				<Select id="test" value="one" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('[role="combobox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[1]]);
			expect(smoothScroll).not.toHaveBeenCalled();
			expect(find.mock.calls).toEqual([['T', 0, 3, anyFunction]]);

			expect(find.mock.calls[0][3](1)).toBe('TEXT');
		});

		it('finds an option starting with typed key when the list is not visible and an alphanumeric key is pressed', () => {
			const setFocused = jest.fn();
			const event = {
				key: 'T',
				preventDefault: jest.fn(),
				nativeEvent: {stopImmediatePropagation: jest.fn()},
			};
			const find = jest.fn().mockReturnValue(1);
			const onChange = jest.fn();
			useState.mockReturnValueOnce([false]).mockReturnValueOnce([0, setFocused]);
			useRef.mockReturnValueOnce({current: null}).mockReturnValueOnce({});
			useStringFinder.mockReturnValue(find);
			const wrapper = shallow(
				<Select id="test" value="two" options={options} renderOption={renderOption} onChange={onChange} />
			);
			wrapper.find('[role="combobox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([]);
			expect(smoothScroll.mock.calls).toEqual([]);
			expect(find.mock.calls).toEqual([['T', 1, 3, anyFunction]]);
			expect(onChange.mock.calls).toEqual([['two']]);

			expect(find.mock.calls[0][3](1)).toBe('TEXT');
		});

		it('finds an option starting with typed key when the list is not visible, value is not set and an alphanumeric key is pressed', () => {
			const setFocused = jest.fn();
			const event = {
				key: 'T',
				preventDefault: jest.fn(),
				nativeEvent: {stopImmediatePropagation: jest.fn()},
			};
			const find = jest.fn().mockReturnValue(1);
			const onChange = jest.fn();
			useState.mockReturnValueOnce([false]).mockReturnValueOnce([0, setFocused]);
			useRef.mockReturnValueOnce({current: null}).mockReturnValueOnce({});
			useStringFinder.mockReturnValue(find);
			const wrapper = shallow(<Select id="test" options={options} renderOption={renderOption} onChange={onChange} />);
			wrapper.find('[role="combobox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([]);
			expect(smoothScroll.mock.calls).toEqual([]);
			expect(find.mock.calls).toEqual([['T', 0, 3, anyFunction]]);
			expect(onChange.mock.calls).toEqual([['two']]);

			expect(find.mock.calls[0][3](1)).toBe('TEXT');
		});

		it('does not change focused when the list is visible and an alphanumeric key with no matches is pressed', () => {
			const setFocused = jest.fn();
			const event = {
				key: 'X',
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
			wrapper.find('[role="combobox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused).not.toHaveBeenCalled();
			expect(smoothScroll).not.toHaveBeenCalled();
			expect(find.mock.calls).toEqual([['X', 0, 3, anyFunction]]);
		});

		it('ignores the event when an unknown key is pressed', () => {
			const preventDefault = jest.fn();
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			const button = wrapper.find('[role="combobox"]');

			button.simulate('keydown', {key: 'Other', preventDefault});

			expect(preventDefault).not.toHaveBeenCalled();
		});

		it('ignores the event when a key is pressed and any modifier is set', () => {
			const preventDefault = jest.fn();
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			const button = wrapper.find('[role="combobox"]');

			button.simulate('keydown', {key: 'Enter', shiftKey: true, preventDefault});
			button.simulate('keydown', {key: 'Enter', ctrlKey: true, preventDefault});
			button.simulate('keydown', {key: 'Enter', altKey: true, preventDefault});
			button.simulate('keydown', {key: 'Enter', metaKey: true, preventDefault});

			expect(preventDefault).not.toHaveBeenCalled();
		});

		it('hides the list and calls onChange when it is visible and enter is pressed', () => {
			const setOpen = jest.fn();
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([true, setOpen]).mockReturnValueOnce([2, setFocused]);
			const event = {key: 'Enter', preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const onChange = jest.fn();
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={onChange} />
			);
			wrapper.find('[role="combobox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setOpen.mock.calls).toEqual([[false]]);
			expect(setFocused.mock.calls).toEqual([[-1]]);
			expect(onChange.mock.calls).toEqual([['three']]);
		});

		it('shows the list when it is not visible and enter is pressed', () => {
			const setOpen = jest.fn();
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([false, setOpen]).mockReturnValueOnce([-1, setFocused]);
			const event = {key: 'Enter', preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} />
			);
			wrapper.find('[role="combobox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(event.nativeEvent.stopImmediatePropagation).toHaveBeenCalledTimes(1);
			expect(setOpen.mock.calls).toEqual([[true]]);
			expect(setFocused.mock.calls).toEqual([[2]]);
		});

		it('shows the list and selects the first option when enter is pressed and the value is not set', () => {
			const setOpen = jest.fn();
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([false, setOpen]).mockReturnValueOnce([-1, setFocused]);
			const event = {key: 'Enter', preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const wrapper = shallow(<Select id="test" options={options} renderOption={renderOption} onChange={jest.fn()} />);
			wrapper.find('[role="combobox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(event.nativeEvent.stopImmediatePropagation).toHaveBeenCalledTimes(1);
			expect(setOpen.mock.calls).toEqual([[true]]);
			expect(setFocused.mock.calls).toEqual([[0]]);
		});

		it('hides the list when it is visible and escape is pressed', () => {
			const onChange = jest.fn();
			const setOpen = jest.fn();
			const setFocused = jest.fn();
			const event = {key: 'Escape', preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			useState.mockReturnValueOnce([true, setOpen]).mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={onChange} />
			);
			wrapper.find('[role="combobox"]').simulate('keydown', event);
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
			wrapper.find('[role="combobox"]').simulate('blur');
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

		it('prevents focus when disabled and mouse down is pressed', () => {
			const event = {preventDefault: jest.fn()};
			useState.mockReturnValueOnce([true]).mockReturnValueOnce([0]);
			const wrapper = shallow(
				<Select id="test" value="three" options={options} renderOption={renderOption} onChange={jest.fn()} disabled />
			);

			wrapper.find('[role="combobox"]').simulate('mousedown', event);

			expect(event.preventDefault.mock.calls).toEqual([[]]);
		});
	});
});
