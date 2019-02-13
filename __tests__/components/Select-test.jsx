import React from 'react';
import {shallow} from 'enzyme';
import {smoothScroll} from '@bluecat/helpers';

import Select from '../../src/components/Select';

jest.unmock('../../src/components/Select');

const strings = {
	one: 'One',
	two: 'Two',
	three: 'Three',
};
const options = Object.keys(strings);
const renderOption = o => strings[o];

describe('Select', () => {
	jest.spyOn(Math, 'random').mockReturnValue(0.12345);

	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<Select
					componentId="test"
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
					componentId="test"
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
					componentId="test"
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
					componentId="test"
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
					componentId="test"
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
			const wrapper = shallow(
				<Select
					componentId="test"
					className="Test"
					value="two"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			const instance = wrapper.instance();
			instance.list.current = {focus: jest.fn()};
			instance.showList();
			wrapper.update();
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('sets the focus on the list and scrolls to current option when open changes from false to true', () => {
			const list = {
				clientHeight: 50,
				scrollTop: 0,
				scrollHeight: 75,
				focus: jest.fn(),
				children: [{}, {}, {offsetTop: 50, offsetHeight: 25}],
			};
			const wrapper = shallow(
				<Select
					componentId="test"
					className="Test"
					value="three"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			wrapper.instance().list.current = list;
			wrapper.setState({open: true, focused: 'three'});
			expect(list.focus).toHaveBeenCalledTimes(1);
			expect(smoothScroll.mock.calls).toEqual([[list, 0, 25, 150]]);
		});

		it('sets the focus on the button when open changes from true to false', () => {
			const button = {
				focus: jest.fn(),
			};
			const wrapper = shallow(
				<Select
					componentId="test"
					className="Test"
					value="three"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			const instance = wrapper.instance();
			instance.button.current = button;
			instance.state.open = true;
			wrapper.setState({open: false});
			expect(button.focus).toHaveBeenCalledTimes(1);
		});

		it('does not change focus when open does not change', () => {
			const wrapper = shallow(
				<Select
					componentId="test"
					className="Test"
					value="three"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			// since neither list nor button are set this call would fail if not implemented correctly
			wrapper.setState({focused: 'one'});
		});

		it('shows the list when enter is pressed on the button', () => {
			const event = {keyCode: 13, preventDefault: jest.fn()};
			const wrapper = shallow(
				<Select
					componentId="test"
					className="Test"
					value="three"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			wrapper.instance().list.current = {focus: jest.fn()};
			wrapper.find('[role="button"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(wrapper.state('open')).toBe(true);
			expect(wrapper.state('focused')).toBe('three');
		});

		it('shows the list and selects the first option when enter is pressed on the button and the value is not set', () => {
			const event = {keyCode: 13, preventDefault: jest.fn()};
			const wrapper = shallow(
				<Select
					componentId="test"
					className="Test"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			wrapper.instance().list.current = {focus: jest.fn()};
			wrapper.find('[role="button"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(wrapper.state('open')).toBe(true);
			expect(wrapper.state('focused')).toBe('one');
		});

		it('does not show the list when an unknown key is pressed on the button', () => {
			const event = {keyCode: 9, preventDefault: jest.fn()};
			const wrapper = shallow(
				<Select
					componentId="test"
					className="Test"
					value="three"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			wrapper.find('[role="button"]').simulate('keydown', event);
			expect(event.preventDefault).not.toHaveBeenCalled();
			expect(wrapper.state('open')).toBe(false);
		});

		it('shows the list when it is hidden and the button receives mouse down', () => {
			const event = {preventDefault: jest.fn()};
			const wrapper = shallow(
				<Select
					componentId="test"
					className="Test"
					value="three"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			wrapper.instance().list.current = {focus: jest.fn()};
			wrapper.find('[role="button"]').simulate('mousedown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(wrapper.state('open')).toBe(true);
		});

		it('hides the list when it is visible and the button receives mouse down', () => {
			const event = {preventDefault: jest.fn()};
			const wrapper = shallow(
				<Select
					componentId="test"
					className="Test"
					value="three"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			const instance = wrapper.instance();
			instance.state.open = true;
			instance.button.current = {focus: jest.fn()};
			wrapper.find('[role="button"]').simulate('mousedown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(wrapper.state('open')).toBe(false);
		});

		it('hides the list when it is visible and escape is pressed', () => {
			const event = {keyCode: 27, preventDefault: jest.fn()};
			const onChange = jest.fn();
			const wrapper = shallow(
				<Select
					componentId="test"
					className="Test"
					value="three"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={onChange}
				/>
			);
			const instance = wrapper.instance();
			instance.list.current = {focus: jest.fn()};
			instance.button.current = {focus: jest.fn()};
			instance.showList();
			wrapper.update();
			wrapper.find('[role="listbox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(wrapper.state('open')).toBe(false);
			expect(onChange).not.toHaveBeenCalled();
		});

		it('hides the list and calls onChange when it is visible and enter is pressed', () => {
			const event = {keyCode: 13, preventDefault: jest.fn()};
			const onChange = jest.fn();
			const wrapper = shallow(
				<Select
					componentId="test"
					className="Test"
					value="three"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={onChange}
				/>
			);
			const instance = wrapper.instance();
			instance.list.current = {focus: jest.fn()};
			instance.button.current = {focus: jest.fn()};
			instance.showList();
			wrapper.update();
			wrapper.find('[role="listbox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(wrapper.state('open')).toBe(false);
			expect(onChange.mock.calls).toEqual([['three']]);
		});

		it('scrolls the list up when it is visible and page up is pressed', () => {
			const event = {keyCode: 33, preventDefault: jest.fn()};
			const list = {
				clientHeight: 50,
				scrollTop: 25,
				scrollHeight: 75,
				children: [{offsetHeight: 25}, {}, {}],
				focus: jest.fn(),
			};
			const wrapper = shallow(
				<Select
					componentId="test"
					className="Test"
					value="three"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			const instance = wrapper.instance();
			instance.list.current = list;
			instance.showList();
			wrapper.update();
			wrapper.find('[role="listbox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(wrapper.state('focused')).toBe('one');
			expect(smoothScroll.mock.calls).toEqual([[list, 25, -25, 150]]);
		});

		it('focuses the first option when the list is visible, page up is pressed and list cannot be scrolled up', () => {
			const event = {keyCode: 33, preventDefault: jest.fn()};
			const list = {
				clientHeight: 50,
				scrollTop: 0,
				scrollHeight: 75,
				children: [{offsetHeight: 25}, {}],
				focus: jest.fn(),
			};
			const wrapper = shallow(
				<Select
					componentId="test"
					className="Test"
					value="two"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			const instance = wrapper.instance();
			instance.list.current = list;
			instance.showList();
			wrapper.update();
			wrapper.find('[role="listbox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(wrapper.state('focused')).toBe('one');
			expect(smoothScroll).not.toHaveBeenCalled();
		});

		it('scrolls the list down when it is visible and page down is pressed', () => {
			const event = {keyCode: 34, preventDefault: jest.fn()};
			const list = {
				clientHeight: 50,
				scrollTop: 0,
				scrollHeight: 75,
				children: [{offsetHeight: 25}],
				focus: jest.fn(),
			};
			const wrapper = shallow(
				<Select
					componentId="test"
					className="Test"
					value="one"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			const instance = wrapper.instance();
			instance.list.current = list;
			instance.showList();
			wrapper.update();
			wrapper.find('[role="listbox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(wrapper.state('focused')).toBe('three');
			expect(smoothScroll.mock.calls).toEqual([[list, 0, 25, 150]]);
		});

		it('focuses the last option when the list is visible, page down is pressed and the list cannot be scrolled down', () => {
			const event = {keyCode: 34, preventDefault: jest.fn()};
			const list = {
				clientHeight: 50,
				scrollTop: 25,
				scrollHeight: 75,
				children: [{offsetHeight: 25}, {}],
				focus: jest.fn(),
			};
			const wrapper = shallow(
				<Select
					componentId="test"
					className="Test"
					value="two"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			const instance = wrapper.instance();
			instance.list.current = list;
			instance.showList();
			wrapper.update();
			wrapper.find('[role="listbox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(wrapper.state('focused')).toBe('three');
			expect(smoothScroll).not.toHaveBeenCalled();
		});

		it('focuses the last option when the list is visible and end is pressed', () => {
			const event = {keyCode: 35, preventDefault: jest.fn()};
			const list = {
				clientHeight: 50,
				scrollTop: 0,
				scrollHeight: 75,
				children: [{}, {}, {offsetTop: 50, offsetHeight: 25}],
				focus: jest.fn(),
			};
			const wrapper = shallow(
				<Select
					componentId="test"
					className="Test"
					value="one"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			const instance = wrapper.instance();
			instance.list.current = list;
			instance.showList();
			wrapper.update();
			wrapper.find('[role="listbox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(wrapper.state('focused')).toBe('three');
			expect(smoothScroll.mock.calls).toEqual([[list, 0, 25, 150]]);
		});

		it('focuses the first option when the list is visible and home is pressed', () => {
			const event = {keyCode: 36, preventDefault: jest.fn()};
			const list = {
				clientHeight: 50,
				scrollTop: 25,
				scrollHeight: 75,
				children: [{offsetTop: 0, offsetHeight: 25}, {}, {}],
				focus: jest.fn(),
			};
			const wrapper = shallow(
				<Select
					componentId="test"
					className="Test"
					value="three"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			const instance = wrapper.instance();
			instance.list.current = list;
			instance.showList();
			wrapper.update();
			wrapper.find('[role="listbox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(wrapper.state('focused')).toBe('one');
			expect(smoothScroll.mock.calls).toEqual([[list, 25, -25, 150]]);
		});

		it('focuses the previous option when the list is visible and up is pressed', () => {
			const event = {keyCode: 38, preventDefault: jest.fn()};
			const list = {
				clientHeight: 50,
				scrollTop: 0,
				scrollHeight: 75,
				children: [{offsetTop: 0, offsetHeight: 25}, {}],
				focus: jest.fn(),
			};
			const wrapper = shallow(
				<Select
					componentId="test"
					className="Test"
					value="two"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			const instance = wrapper.instance();
			instance.list.current = list;
			instance.showList();
			wrapper.update();
			wrapper.find('[role="listbox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(wrapper.state('focused')).toBe('one');
			expect(smoothScroll).not.toHaveBeenCalled();
		});

		it('does not change focused when the list is visible, up is pressed and the first option is already focused', () => {
			const event = {keyCode: 38, preventDefault: jest.fn()};
			const list = {
				clientHeight: 50,
				scrollTop: 0,
				scrollHeight: 75,
				children: [{offsetTop: 0, offsetHeight: 25}],
				focus: jest.fn(),
			};
			const wrapper = shallow(
				<Select
					componentId="test"
					className="Test"
					value="one"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			const instance = wrapper.instance();
			instance.list.current = list;
			instance.showList();
			wrapper.update();
			wrapper.find('[role="listbox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(wrapper.state('focused')).toBe('one');
			expect(smoothScroll).not.toHaveBeenCalled();
		});

		it('focuses the next option when the list is visible and down is pressed', () => {
			const event = {keyCode: 40, preventDefault: jest.fn()};
			const list = {
				clientHeight: 50,
				scrollTop: 25,
				scrollHeight: 75,
				children: [{}, {}, {offsetTop: 50, offsetHeight: 25}],
				focus: jest.fn(),
			};
			const wrapper = shallow(
				<Select
					componentId="test"
					className="Test"
					value="two"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			const instance = wrapper.instance();
			instance.list.current = list;
			instance.showList();
			wrapper.update();
			wrapper.find('[role="listbox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(wrapper.state('focused')).toBe('three');
			expect(smoothScroll).not.toHaveBeenCalled();
		});

		it('does not change focused when the list is visible, down is pressed and the last option is already focused', () => {
			const event = {keyCode: 40, preventDefault: jest.fn()};
			const list = {
				clientHeight: 50,
				scrollTop: 25,
				scrollHeight: 75,
				children: [{}, {}, {offsetTop: 50, offsetHeight: 25}],
				focus: jest.fn(),
			};
			const wrapper = shallow(
				<Select
					componentId="test"
					className="Test"
					value="three"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			const instance = wrapper.instance();
			instance.list.current = list;
			instance.showList();
			wrapper.update();
			wrapper.find('[role="listbox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(wrapper.state('focused')).toBe('three');
			expect(smoothScroll).not.toHaveBeenCalled();
		});

		it('finds an option starting with typed key when the list is visible and an alphanumeric key is pressed', () => {
			const event = {keyCode: 'T'.codePointAt(0), preventDefault: jest.fn()};
			const list = {
				clientHeight: 75,
				scrollTop: 0,
				scrollHeight: 75,
				children: options.map(o => ({textContent: renderOption(o)})),
				focus: jest.fn(),
			};
			const wrapper = shallow(
				<Select
					componentId="test"
					className="Test"
					value="one"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			const instance = wrapper.instance();
			instance.list.current = list;
			instance.showList();
			wrapper.update();
			wrapper.find('[role="listbox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(wrapper.state('focused')).toBe('two');
			expect(smoothScroll).not.toHaveBeenCalled();
			expect(instance.searchString).toBe('T');
			jest.runOnlyPendingTimers();
			expect(instance.searchString).toBe('');
		});

		it('finds an option starting with the current prefix when the list is visible and two alphanumeric keys are pressed in sequence', () => {
			const event = {keyCode: 'H'.codePointAt(0), preventDefault: jest.fn()};
			const list = {
				clientHeight: 75,
				scrollTop: 0,
				scrollHeight: 75,
				children: options.map(o => ({textContent: renderOption(o)})),
				focus: jest.fn(),
			};
			const wrapper = shallow(
				<Select
					componentId="test"
					className="Test"
					value="one"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			const instance = wrapper.instance();
			instance.list.current = list;
			instance.showList();
			wrapper.update();
			const listBox = wrapper.find('[role="listbox"]');
			listBox.simulate('keydown', {keyCode: 'T'.codePointAt(0), preventDefault: jest.fn()});
			listBox.simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(wrapper.state('focused')).toBe('three');
			expect(smoothScroll).not.toHaveBeenCalled();
		});

		it('does not change focused when the list is visible and an alphanumeric key with no matches is pressed', () => {
			const event = {keyCode: 'X'.codePointAt(0), preventDefault: jest.fn()};
			const list = {
				clientHeight: 75,
				scrollTop: 0,
				scrollHeight: 75,
				children: options.map(o => ({textContent: renderOption(o)})),
				focus: jest.fn(),
			};
			const wrapper = shallow(
				<Select
					componentId="test"
					className="Test"
					value="one"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			const instance = wrapper.instance();
			instance.list.current = list;
			instance.showList();
			wrapper.update();
			wrapper.find('[role="listbox"]').simulate('keydown', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(wrapper.state('focused')).toBe('one');
			expect(smoothScroll).not.toHaveBeenCalled();
		});

		it('ignores the pressed key when the list is visible and the key is unknown', () => {
			const event = {keyCode: 1, preventDefault: jest.fn()};
			const wrapper = shallow(
				<Select
					componentId="test"
					className="Test"
					value="one"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			const instance = wrapper.instance();
			instance.list.current = {focus: jest.fn()};
			instance.showList();
			wrapper.update();
			wrapper.find('[role="listbox"]').simulate('keydown', event);
			expect(event.preventDefault).not.toHaveBeenCalled();
			expect(wrapper.state('focused')).toBe('one');
			expect(smoothScroll).not.toHaveBeenCalled();
		});

		it('focuses the option when the list is visible and the mouse is over it', () => {
			const event = {target: {dataset: {value: 'two'}}};
			const wrapper = shallow(
				<Select
					componentId="test"
					className="Test"
					value="one"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			const instance = wrapper.instance();
			instance.list.current = {focus: jest.fn()};
			instance.showList();
			wrapper.update();
			wrapper.find('[role="listbox"]').simulate('mouseover', event);
			expect(wrapper.state('focused')).toBe('two');
		});

		it('does not change focused when the list is visible and the mouse is over other element', () => {
			const event = {target: {dataset: {}}};
			const wrapper = shallow(
				<Select
					componentId="test"
					className="Test"
					value="one"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			const instance = wrapper.instance();
			instance.list.current = {focus: jest.fn()};
			instance.showList();
			wrapper.update();
			wrapper.find('[role="listbox"]').simulate('mouseover', event);
			expect(wrapper.state('focused')).toBe('one');
		});

		it('hides the list and calls onChange when it is visible and an option is clicked', () => {
			const event = {target: {dataset: {value: 'two'}}, preventDefault: jest.fn()};
			const onChange = jest.fn();
			const wrapper = shallow(
				<Select
					componentId="test"
					className="Test"
					value="one"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={onChange}
				/>
			);
			const instance = wrapper.instance();
			instance.list.current = {focus: jest.fn()};
			instance.button.current = {focus: jest.fn()};
			instance.showList();
			wrapper.update();
			wrapper.find('[role="listbox"]').simulate('click', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(wrapper.state('open')).toBe(false);
			expect(onChange.mock.calls).toEqual([['two']]);
		});

		it('hides the list when it is visible and loses focus', () => {
			const onChange = jest.fn();
			const wrapper = shallow(
				<Select
					componentId="test"
					className="Test"
					value="one"
					options={options}
					placeholder="Testing"
					renderOption={renderOption}
					onChange={onChange}
				/>
			);
			const instance = wrapper.instance();
			instance.list.current = {focus: jest.fn()};
			instance.button.current = {focus: jest.fn()};
			instance.showList();
			wrapper.update();
			wrapper.find('[role="listbox"]').simulate('blur');
			expect(wrapper.state('open')).toBe(false);
			expect(onChange).not.toHaveBeenCalled();
		});
	});
});
