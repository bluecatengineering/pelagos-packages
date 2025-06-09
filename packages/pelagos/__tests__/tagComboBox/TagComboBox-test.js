import {useEffect, useRef, useState} from 'react';
import {shallow} from 'enzyme';
import debounce from 'lodash-es/debounce';

import TagComboBox from '../../src/tagComboBox/TagComboBox';
import scrollToItem from '../../src/functions/scrollToItem';
import useRandomId from '../../src/hooks/useRandomId';
import useTooltip from '../../src/hooks/useTooltip';

jest.unmock('../../src/tagComboBox/TagComboBox');

jest.mock('lodash-es/debounce', () => jest.fn((f) => (f && (f.cancel = jest.fn()), f)));

useRandomId.mockReturnValue('random-id');

describe('TagComboBox', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<TagComboBox id="test" tags={['foo', 'bar']} validate={jest.fn()} onChange={jest.fn()} onError={jest.fn()} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useRandomId.mock.calls).toEqual([['test']]);
		});

		it('renders expected elements when optional properties are set', () => {
			const renderSuggestion = jest
				.fn()
				.mockReturnValueOnce(<div>Foo A</div>)
				.mockReturnValueOnce(<div className="TestClass">Foo B</div>);
			useState
				.mockReturnValueOnce(['text'])
				.mockReturnValueOnce([['foo-a', 'foo-b']])
				.mockReturnValueOnce([true])
				.mockReturnValueOnce([1])
				.mockReturnValueOnce(['Test of live text']);
			const wrapper = shallow(
				<TagComboBox
					id="test"
					className="TestClass"
					tags={['foo', 'bar']}
					error="error"
					validate={jest.fn()}
					renderSuggestion={renderSuggestion}
					onChange={jest.fn()}
					onError={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(renderSuggestion.mock.calls).toEqual([
				['foo-a', 0],
				['foo-b', 1],
			]);
		});

		it('renders expected elements when tags is empty and defaultTags is not set', () => {
			const wrapper = shallow(
				<TagComboBox id="test" tags={[]} validate={jest.fn()} onChange={jest.fn()} onError={jest.fn()} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when tags is empty and defaultTags is set', () => {
			const wrapper = shallow(
				<TagComboBox
					id="test"
					tags={[]}
					defaultTags={['foo', 'bar']}
					defaultTooltipText="Test tooltip"
					validate={jest.fn()}
					onChange={jest.fn()}
					onError={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useTooltip.mock.calls).toEqual([['Test tooltip', 'top']]);
		});

		it('renders expected elements when disabled', () => {
			const wrapper = shallow(
				<TagComboBox
					id="test"
					tags={['foo', 'bar']}
					validate={jest.fn()}
					disabled
					onChange={jest.fn()}
					onError={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useRandomId.mock.calls).toEqual([['test']]);
		});

		it('renders expected elements when disabled and defaultTags is set', () => {
			const wrapper = shallow(
				<TagComboBox
					id="test"
					tags={[]}
					defaultTags={['foo', 'bar']}
					defaultTooltipText="Test tooltip"
					disabled
					validate={jest.fn()}
					onChange={jest.fn()}
					onError={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useTooltip.mock.calls).toEqual([['Test tooltip', 'top']]);
		});
	});

	describe('behaviour', () => {
		it('calls onChange when the remove button is clicked', () => {
			const setLive = jest.fn();
			const onChange = jest.fn();
			const focus = jest.fn();
			useRef.mockReturnValueOnce({current: {focus}}).mockReturnValueOnce().mockReturnValueOnce();
			useState
				.mockReturnValueOnce([''])
				.mockReturnValueOnce([[]])
				.mockReturnValueOnce([false])
				.mockReturnValueOnce([-1])
				.mockReturnValueOnce([null, setLive]);
			const wrapper = shallow(
				<TagComboBox id="test" tags={['foo', 'bar']} validate={jest.fn()} onChange={onChange} onError={jest.fn()} />
			);
			const event = {target: {closest: jest.fn().mockReturnValue({dataset: {index: '0'}})}};
			wrapper.find('Tag').at(0).prop('onRemove')(event);
			expect(onChange.mock.calls).toEqual([[['bar'], event]]);
			expect(focus.mock.calls).toEqual([[]]);
			expect(setLive.mock.calls).toEqual([['foo removed']]);
		});

		it('calls onChange when enter is pressed', () => {
			const setText = jest.fn();
			const setSuggestions = jest.fn();
			const setOpen = jest.fn();
			const setSelected = jest.fn();
			const setLive = jest.fn();
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			const hidePopover = jest.fn();
			useRef.mockReturnValueOnce().mockReturnValueOnce().mockReturnValueOnce({current: {hidePopover}});
			useState
				.mockReturnValueOnce(['', setText])
				.mockReturnValueOnce([[], setSuggestions])
				.mockReturnValueOnce([false, setOpen])
				.mockReturnValueOnce([-1, setSelected])
				.mockReturnValueOnce([null, setLive]);
			const wrapper = shallow(
				<TagComboBox id="test" tags={['foo', 'bar']} validate={jest.fn()} onChange={onChange} onError={jest.fn()} />
			);
			const updateSuggestions = debounce.mock.results[0].value;
			const event = {key: 'Enter', preventDefault, target: {value: 'baz'}};
			wrapper.find('#random-id').simulate('keydown', event);
			expect(onChange.mock.calls).toEqual([[['foo', 'bar', 'baz'], event]]);
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(hidePopover.mock.calls).toEqual([[]]);
			expect(setText.mock.calls).toEqual([['']]);
			expect(setSuggestions.mock.calls).toEqual([[[]]]);
			expect(setOpen.mock.calls).toEqual([[false]]);
			expect(setSelected.mock.calls).toEqual([[-1]]);
			expect(setLive.mock.calls).toEqual([['baz added']]);
			expect(updateSuggestions.cancel.mock.calls).toEqual([[]]);
		});

		it('calls onChange when enter is pressed with a transform function', () => {
			const setText = jest.fn();
			const setSuggestions = jest.fn();
			const setOpen = jest.fn();
			const setSelected = jest.fn();
			const setLive = jest.fn();
			const onChange = jest.fn();
			const transform = jest.fn().mockReturnValue('transform');
			const validate = jest.fn();
			const preventDefault = jest.fn();
			const hidePopover = jest.fn();
			useRef.mockReturnValueOnce().mockReturnValueOnce().mockReturnValueOnce({current: {hidePopover}});
			useState
				.mockReturnValueOnce(['', setText])
				.mockReturnValueOnce([[], setSuggestions])
				.mockReturnValueOnce([false, setOpen])
				.mockReturnValueOnce([-1, setSelected])
				.mockReturnValueOnce([null, setLive]);
			const wrapper = shallow(
				<TagComboBox
					id="test"
					tags={['foo', 'bar']}
					validate={validate}
					transform={transform}
					onChange={onChange}
					onError={jest.fn()}
				/>
			);
			const event = {key: 'Enter', preventDefault, target: {value: 'baz'}};
			wrapper.find('#random-id').simulate('keydown', event);
			expect(transform.mock.calls).toEqual([['baz']]);
			expect(validate.mock.calls).toEqual([['transform']]);
			expect(onChange.mock.calls).toEqual([[['foo', 'bar', 'transform'], event]]);
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(hidePopover.mock.calls).toEqual([[]]);
			expect(setText.mock.calls).toEqual([['']]);
			expect(setSuggestions.mock.calls).toEqual([[[]]]);
			expect(setOpen.mock.calls).toEqual([[false]]);
			expect(setSelected.mock.calls).toEqual([[-1]]);
			expect(setLive.mock.calls).toEqual([['transform added']]);
		});

		it('does not call onChange when enter is pressed and the input text is empty', () => {
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			const wrapper = shallow(
				<TagComboBox id="test" tags={['foo', 'bar']} validate={jest.fn()} onChange={onChange} onError={jest.fn()} />
			);
			wrapper.find('#random-id').simulate('keydown', {key: 'Enter', preventDefault, target: {value: ''}});
			expect(onChange).not.toHaveBeenCalled();
			expect(preventDefault.mock.calls).toEqual([[]]);
		});

		it('does not call onChange when enter is pressed and the input text is already in tags', () => {
			const setText = jest.fn();
			const setSuggestions = jest.fn();
			const setOpen = jest.fn();
			const setSelected = jest.fn();
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			const hidePopover = jest.fn();
			useRef.mockReturnValueOnce().mockReturnValueOnce().mockReturnValueOnce({current: {hidePopover}});
			useState
				.mockReturnValueOnce(['', setText])
				.mockReturnValueOnce([[], setSuggestions])
				.mockReturnValueOnce([false, setOpen])
				.mockReturnValueOnce([-1, setSelected])
				.mockReturnValueOnce([null]);
			const wrapper = shallow(
				<TagComboBox id="test" tags={['foo', 'bar']} validate={jest.fn()} onChange={onChange} onError={jest.fn()} />
			);
			wrapper.find('#random-id').simulate('keydown', {key: 'Enter', preventDefault, target: {value: 'bar'}});
			expect(onChange).not.toHaveBeenCalled();
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(hidePopover.mock.calls).toEqual([[]]);
			expect(setText.mock.calls).toEqual([['']]);
			expect(setSuggestions.mock.calls).toEqual([[[]]]);
			expect(setOpen.mock.calls).toEqual([[false]]);
			expect(setSelected.mock.calls).toEqual([[-1]]);
		});

		it('calls onError when enter is pressed and validate returns en error', () => {
			const setText = jest.fn();
			const setSuggestions = jest.fn();
			const setOpen = jest.fn();
			const setSelected = jest.fn();
			const validate = jest.fn().mockReturnValue('error');
			const onChange = jest.fn();
			const onError = jest.fn();
			const preventDefault = jest.fn();
			const hidePopover = jest.fn();
			useRef.mockReturnValueOnce().mockReturnValueOnce().mockReturnValueOnce({current: {hidePopover}});
			useState
				.mockReturnValueOnce(['', setText])
				.mockReturnValueOnce([[], setSuggestions])
				.mockReturnValueOnce([false, setOpen])
				.mockReturnValueOnce([-1, setSelected])
				.mockReturnValueOnce([null]);
			const wrapper = shallow(
				<TagComboBox id="test" tags={['foo', 'bar']} validate={validate} onChange={onChange} onError={onError} />
			);
			const event = {key: 'Enter', preventDefault, target: {value: 'baz'}};
			wrapper.find('#random-id').simulate('keydown', event);
			expect(onChange).not.toHaveBeenCalled();
			expect(onError.mock.calls).toEqual([['error', event]]);
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(hidePopover.mock.calls).toEqual([[]]);
			expect(setText.mock.calls).toEqual([]);
			expect(setSuggestions.mock.calls).toEqual([[[]]]);
			expect(setOpen.mock.calls).toEqual([[false]]);
			expect(setSelected.mock.calls).toEqual([[-1]]);
		});

		it('calls onChange when enter is pressed and selected is set', () => {
			const setText = jest.fn();
			const setSuggestions = jest.fn();
			const setOpen = jest.fn();
			const setSelected = jest.fn();
			const setLive = jest.fn();
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			const hidePopover = jest.fn();
			useRef.mockReturnValueOnce().mockReturnValueOnce().mockReturnValueOnce({current: {hidePopover}});
			useState
				.mockReturnValueOnce(['', setText])
				.mockReturnValueOnce([['baz', 'baa'], setSuggestions])
				.mockReturnValueOnce([false, setOpen])
				.mockReturnValueOnce([0, setSelected])
				.mockReturnValueOnce([null, setLive]);
			const wrapper = shallow(
				<TagComboBox
					id="test"
					tags={['foo', 'bar']}
					validate={jest.fn()}
					renderSuggestion={jest.fn().mockReturnValue(<div />)}
					onChange={onChange}
					onError={jest.fn()}
				/>
			);
			const event = {key: 'Enter', preventDefault, target: {value: 'b'}};
			wrapper.find('#random-id').simulate('keydown', event);
			expect(onChange.mock.calls).toEqual([[['foo', 'bar', 'baz'], event]]);
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(hidePopover.mock.calls).toEqual([[]]);
			expect(setText.mock.calls).toEqual([['']]);
			expect(setSuggestions.mock.calls).toEqual([[[]]]);
			expect(setOpen.mock.calls).toEqual([[false]]);
			expect(setSelected.mock.calls).toEqual([[-1]]);
			expect(setLive.mock.calls).toEqual([['baz added']]);
		});

		it('calls onChange when enter is pressed and selected is set and the tag is already in tags', () => {
			const setText = jest.fn();
			const setSuggestions = jest.fn();
			const setOpen = jest.fn();
			const setSelected = jest.fn();
			const setLive = jest.fn();
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			const hidePopover = jest.fn();
			useRef.mockReturnValueOnce().mockReturnValueOnce().mockReturnValueOnce({current: {hidePopover}});
			useState
				.mockReturnValueOnce(['', setText])
				.mockReturnValueOnce([['bar', 'baa'], setSuggestions])
				.mockReturnValueOnce([false, setOpen])
				.mockReturnValueOnce([0, setSelected])
				.mockReturnValueOnce([null, setLive]);
			const wrapper = shallow(
				<TagComboBox
					id="test"
					tags={['foo', 'bar']}
					validate={jest.fn()}
					renderSuggestion={jest.fn().mockReturnValue(<div />)}
					onChange={onChange}
					onError={jest.fn()}
				/>
			);
			const event = {key: 'Enter', preventDefault, target: {value: 'b'}};
			wrapper.find('#random-id').simulate('keydown', event);
			expect(onChange.mock.calls).toEqual([]);
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(hidePopover.mock.calls).toEqual([[]]);
			expect(setText.mock.calls).toEqual([['']]);
			expect(setSuggestions.mock.calls).toEqual([[[]]]);
			expect(setOpen.mock.calls).toEqual([[false]]);
			expect(setSelected.mock.calls).toEqual([[-1]]);
			expect(setLive.mock.calls).toEqual([]);
		});

		it('calls onChange when backspace is pressed', () => {
			const setLive = jest.fn();
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			useRef.mockReturnValueOnce().mockReturnValueOnce().mockReturnValueOnce();
			useState
				.mockReturnValueOnce([''])
				.mockReturnValueOnce([[]])
				.mockReturnValueOnce([false])
				.mockReturnValueOnce([-1])
				.mockReturnValueOnce([null, setLive]);
			const wrapper = shallow(
				<TagComboBox id="test" tags={['foo', 'bar']} validate={jest.fn()} onChange={onChange} onError={jest.fn()} />
			);
			const event = {key: 'Backspace', preventDefault, target: {value: ''}};
			wrapper.find('#random-id').simulate('keydown', event);
			expect(onChange.mock.calls).toEqual([[['foo'], event]]);
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(setLive.mock.calls).toEqual([['bar removed']]);
		});

		it('does not call onChange when backspace is pressed and the text is not empty', () => {
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			const wrapper = shallow(
				<TagComboBox id="test" tags={['foo', 'bar']} validate={jest.fn()} onChange={onChange} onError={jest.fn()} />
			);
			wrapper.find('#random-id').simulate('keydown', {key: 'Backspace', preventDefault, target: {value: 'x'}});
			expect(onChange).not.toHaveBeenCalled();
			expect(preventDefault).not.toHaveBeenCalled();
		});

		it('does not call onChange when backspace is pressed and tags is empty', () => {
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			const wrapper = shallow(
				<TagComboBox id="test" tags={[]} validate={jest.fn()} onChange={onChange} onError={jest.fn()} />
			);
			wrapper.find('#random-id').simulate('keydown', {key: 'Backspace', preventDefault, target: {value: ''}});
			expect(onChange).not.toHaveBeenCalled();
			expect(preventDefault.mock.calls).toEqual([[]]);
		});

		it('calls setText when escape is pressed', () => {
			const setText = jest.fn();
			const setSuggestions = jest.fn();
			const setOpen = jest.fn();
			const setSelected = jest.fn();
			const preventDefault = jest.fn();
			const hidePopover = jest.fn();
			useRef.mockReturnValueOnce().mockReturnValueOnce().mockReturnValueOnce({current: {hidePopover}});
			useState
				.mockReturnValueOnce(['', setText])
				.mockReturnValueOnce([[], setSuggestions])
				.mockReturnValueOnce([false, setOpen])
				.mockReturnValueOnce([0, setSelected])
				.mockReturnValueOnce([null]);
			const wrapper = shallow(
				<TagComboBox id="test" tags={[]} validate={jest.fn()} onChange={jest.fn} onError={jest.fn()} />
			);
			const updateSuggestions = debounce.mock.results[0].value;
			const event = {key: 'Escape', preventDefault, target: {}};
			wrapper.find('#random-id').simulate('keydown', event);
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(hidePopover.mock.calls).toEqual([[]]);
			expect(setText.mock.calls).toEqual([['']]);
			expect(setSuggestions.mock.calls).toEqual([[[]]]);
			expect(setOpen.mock.calls).toEqual([[false]]);
			expect(setSelected.mock.calls).toEqual([[-1]]);
			expect(updateSuggestions.cancel.mock.calls).toEqual([[]]);
		});

		it('selects the previous item when arrow up is pressed', () => {
			const setSelected = jest.fn();
			const preventDefault = jest.fn();
			const child = {};
			const listElement = {children: [child]};
			useRef.mockReturnValueOnce().mockReturnValueOnce().mockReturnValueOnce({current: listElement});
			useState
				.mockReturnValueOnce([''])
				.mockReturnValueOnce([[]])
				.mockReturnValueOnce([true])
				.mockReturnValueOnce([1, setSelected])
				.mockReturnValueOnce([null]);
			const wrapper = shallow(
				<TagComboBox id="test" tags={[]} validate={jest.fn()} onChange={jest.fn} onError={jest.fn()} />
			);
			const event = {key: 'ArrowUp', preventDefault, target: {}};
			wrapper.find('#random-id').simulate('keydown', event);
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(setSelected.mock.calls).toEqual([[0]]);
			expect(scrollToItem.mock.calls).toEqual([[listElement, child]]);
		});

		it('selects the last item when arrow up is pressed and selected is 0', () => {
			const setSelected = jest.fn();
			const preventDefault = jest.fn();
			const child = {};
			const listElement = {children: [null, null, child]};
			useRef.mockReturnValueOnce().mockReturnValueOnce().mockReturnValueOnce({current: listElement});
			useState
				.mockReturnValueOnce([''])
				.mockReturnValueOnce([['foo', 'bar', 'baz']])
				.mockReturnValueOnce([true])
				.mockReturnValueOnce([0, setSelected])
				.mockReturnValueOnce([null]);
			const wrapper = shallow(
				<TagComboBox
					id="test"
					tags={[]}
					validate={jest.fn()}
					renderSuggestion={jest.fn().mockReturnValue(<div />)}
					onChange={jest.fn}
					onError={jest.fn()}
				/>
			);
			const event = {key: 'ArrowUp', preventDefault, target: {}};
			wrapper.find('#random-id').simulate('keydown', event);
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(setSelected.mock.calls).toEqual([[2]]);
			expect(scrollToItem.mock.calls).toEqual([[listElement, child]]);
		});

		it('ignores event when arrow up is pressed and open is false', () => {
			const setSelected = jest.fn();
			const preventDefault = jest.fn();
			useRef.mockReturnValueOnce().mockReturnValueOnce().mockReturnValueOnce();
			useState
				.mockReturnValueOnce([''])
				.mockReturnValueOnce([[]])
				.mockReturnValueOnce([false])
				.mockReturnValueOnce([1, setSelected])
				.mockReturnValueOnce([null]);
			const wrapper = shallow(
				<TagComboBox id="test" tags={[]} validate={jest.fn()} onChange={jest.fn} onError={jest.fn()} />
			);
			const event = {key: 'ArrowUp', preventDefault, target: {}};
			wrapper.find('#random-id').simulate('keydown', event);
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(setSelected.mock.calls).toEqual([]);
			expect(scrollToItem.mock.calls).toEqual([]);
		});

		it('selects the next item when arrow down is pressed', () => {
			const setSelected = jest.fn();
			const preventDefault = jest.fn();
			const child = {};
			const listElement = {children: [null, child]};
			useRef.mockReturnValueOnce().mockReturnValueOnce().mockReturnValueOnce({current: listElement});
			useState
				.mockReturnValueOnce([''])
				.mockReturnValueOnce([['foo', 'bar', 'baz']])
				.mockReturnValueOnce([true])
				.mockReturnValueOnce([0, setSelected])
				.mockReturnValueOnce([null]);
			const wrapper = shallow(
				<TagComboBox
					id="test"
					tags={[]}
					validate={jest.fn()}
					renderSuggestion={jest.fn().mockReturnValue(<div />)}
					onChange={jest.fn}
					onError={jest.fn()}
				/>
			);
			const event = {key: 'ArrowDown', preventDefault, target: {}};
			wrapper.find('#random-id').simulate('keydown', event);
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(setSelected.mock.calls).toEqual([[1]]);
			expect(scrollToItem.mock.calls).toEqual([[listElement, child]]);
		});

		it('selects the first item when arrow down is pressed and selected is the last item', () => {
			const setSelected = jest.fn();
			const preventDefault = jest.fn();
			const child = {};
			const listElement = {children: [child]};
			useRef.mockReturnValueOnce().mockReturnValueOnce().mockReturnValueOnce({current: listElement});
			useState
				.mockReturnValueOnce([''])
				.mockReturnValueOnce([['foo', 'bar', 'baz']])
				.mockReturnValueOnce([true])
				.mockReturnValueOnce([2, setSelected])
				.mockReturnValueOnce([null]);
			const wrapper = shallow(
				<TagComboBox
					id="test"
					tags={[]}
					validate={jest.fn()}
					renderSuggestion={jest.fn().mockReturnValue(<div />)}
					onChange={jest.fn}
					onError={jest.fn()}
				/>
			);
			const event = {key: 'ArrowDown', preventDefault, target: {}};
			wrapper.find('#random-id').simulate('keydown', event);
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(setSelected.mock.calls).toEqual([[0]]);
			expect(scrollToItem.mock.calls).toEqual([[listElement, child]]);
		});

		it('ignores event when arrow down is pressed and open is false', () => {
			const setSelected = jest.fn();
			const preventDefault = jest.fn();
			useRef.mockReturnValueOnce().mockReturnValueOnce().mockReturnValueOnce();
			useState
				.mockReturnValueOnce([''])
				.mockReturnValueOnce([[]])
				.mockReturnValueOnce([false])
				.mockReturnValueOnce([1, setSelected])
				.mockReturnValueOnce([null]);
			const wrapper = shallow(
				<TagComboBox id="test" tags={[]} validate={jest.fn()} onChange={jest.fn} onError={jest.fn()} />
			);
			const event = {key: 'ArrowDown', preventDefault, target: {}};
			wrapper.find('#random-id').simulate('keydown', event);
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(setSelected.mock.calls).toEqual([]);
			expect(scrollToItem.mock.calls).toEqual([]);
		});

		it('calls setText and getSuggestions when the input changes', () => {
			const setText = jest.fn();
			const setSuggestions = jest.fn();
			const setOpen = jest.fn();
			const setSelected = jest.fn();
			const promise = Promise.resolve(['foo-a', 'foo-b']);
			const getSuggestions = jest.fn().mockReturnValue(promise);
			const onError = jest.fn();
			const showPopover = jest.fn();
			useRef.mockReturnValueOnce().mockReturnValueOnce().mockReturnValueOnce({current: {showPopover}});
			useState
				.mockReturnValueOnce(['', setText])
				.mockReturnValueOnce([[], setSuggestions])
				.mockReturnValueOnce([false, setOpen])
				.mockReturnValueOnce([-1, setSelected])
				.mockReturnValueOnce([null]);
			const wrapper = shallow(
				<TagComboBox
					id="test"
					tags={[]}
					validate={jest.fn()}
					getSuggestions={getSuggestions}
					onChange={jest.fn()}
					onError={onError}
				/>
			);
			const event = {target: {value: 'foo'}};
			wrapper.find('#random-id').simulate('change', event);
			expect(setText.mock.calls).toEqual([['foo']]);
			expect(onError.mock.calls).toEqual([[null, event]]);
			expect(getSuggestions.mock.calls).toEqual([['foo']]);
			return promise.then(() => {
				expect(setSuggestions.mock.calls).toEqual([[['foo-a', 'foo-b']]]);
				expect(setOpen.mock.calls).toEqual([[true]]);
				expect(setSelected.mock.calls).toEqual([[-1]]);
				expect(showPopover.mock.calls).toEqual([[]]);
			});
		});

		it('calls setText and getSuggestions when the input changes and suggestions is empty', () => {
			const setText = jest.fn();
			const setSuggestions = jest.fn();
			const setOpen = jest.fn();
			const setSelected = jest.fn();
			const promise = Promise.resolve([]);
			const getSuggestions = jest.fn().mockReturnValue(promise);
			const onError = jest.fn();
			const hidePopover = jest.fn();
			useRef.mockReturnValueOnce().mockReturnValueOnce().mockReturnValueOnce({current: {hidePopover}});
			useState
				.mockReturnValueOnce(['', setText])
				.mockReturnValueOnce([[], setSuggestions])
				.mockReturnValueOnce([false, setOpen])
				.mockReturnValueOnce([-1, setSelected])
				.mockReturnValueOnce([null]);
			const wrapper = shallow(
				<TagComboBox
					id="test"
					tags={[]}
					validate={jest.fn()}
					getSuggestions={getSuggestions}
					onChange={jest.fn()}
					onError={onError}
				/>
			);
			const event = {target: {value: 'foo'}};
			wrapper.find('#random-id').simulate('change', event);
			expect(setText.mock.calls).toEqual([['foo']]);
			expect(onError.mock.calls).toEqual([[null, event]]);
			expect(getSuggestions.mock.calls).toEqual([['foo']]);
			return promise.then(() => {
				expect(setSuggestions.mock.calls).toEqual([[[]]]);
				expect(setOpen.mock.calls).toEqual([[false]]);
				expect(setSelected.mock.calls).toEqual([[-1]]);
				expect(hidePopover.mock.calls).toEqual([[]]);
			});
		});

		it('calls setText when the input changes and value is empty', () => {
			const setText = jest.fn();
			const setSuggestions = jest.fn();
			const setOpen = jest.fn();
			const setSelected = jest.fn();
			const onError = jest.fn();
			const hidePopover = jest.fn();
			useRef.mockReturnValueOnce().mockReturnValueOnce().mockReturnValueOnce({current: {hidePopover}});
			useState
				.mockReturnValueOnce(['', setText])
				.mockReturnValueOnce([[], setSuggestions])
				.mockReturnValueOnce([false, setOpen])
				.mockReturnValueOnce([-1, setSelected])
				.mockReturnValueOnce([null]);
			const wrapper = shallow(
				<TagComboBox id="test" tags={[]} validate={jest.fn()} onChange={jest.fn()} onError={onError} />
			);
			const updateSuggestions = debounce.mock.results[0].value;
			const event = {target: {value: ''}};
			wrapper.find('#random-id').simulate('change', event);
			expect(setText.mock.calls).toEqual([['']]);
			expect(onError.mock.calls).toEqual([[null, event]]);
			expect(setSuggestions.mock.calls).toEqual([[[]]]);
			expect(setOpen.mock.calls).toEqual([[false]]);
			expect(setSelected.mock.calls).toEqual([[-1]]);
			expect(hidePopover.mock.calls).toEqual([[]]);
			expect(updateSuggestions.cancel.mock.calls).toEqual([[]]);
		});

		it('shows the list on focus', () => {
			const setOpen = jest.fn();
			const setSelected = jest.fn();
			const showPopover = jest.fn();
			useRef.mockReturnValueOnce().mockReturnValueOnce().mockReturnValueOnce({current: {showPopover}});
			useState
				.mockReturnValueOnce([''])
				.mockReturnValueOnce([['foo']])
				.mockReturnValueOnce([false, setOpen])
				.mockReturnValueOnce([-1, setSelected])
				.mockReturnValueOnce([null]);
			const wrapper = shallow(
				<TagComboBox
					id="test"
					tags={[]}
					validate={jest.fn()}
					renderSuggestion={jest.fn().mockReturnValue(<div />)}
					onChange={jest.fn()}
					onError={jest.fn()}
				/>
			);
			wrapper.find('#random-id').simulate('focus');
			expect(setOpen.mock.calls).toEqual([[true]]);
			expect(setSelected.mock.calls).toEqual([[-1]]);
			expect(showPopover.mock.calls).toEqual([[]]);
		});

		it('does not show the list on focus if suggestions is empty', () => {
			const setOpen = jest.fn();
			const setSelected = jest.fn();
			const showPopover = jest.fn();
			useRef.mockReturnValueOnce().mockReturnValueOnce().mockReturnValueOnce({current: {showPopover}});
			useState
				.mockReturnValueOnce([''])
				.mockReturnValueOnce([[]])
				.mockReturnValueOnce([false, setOpen])
				.mockReturnValueOnce([-1, setSelected])
				.mockReturnValueOnce([null]);
			const wrapper = shallow(
				<TagComboBox id="test" tags={[]} validate={jest.fn()} onChange={jest.fn()} onError={jest.fn()} />
			);
			wrapper.find('#random-id').simulate('focus');
			expect(setOpen.mock.calls).toEqual([]);
			expect(setSelected.mock.calls).toEqual([]);
			expect(showPopover.mock.calls).toEqual([]);
		});

		it('calls onChange on blur', () => {
			const setText = jest.fn();
			const setSuggestions = jest.fn();
			const setOpen = jest.fn();
			const setSelected = jest.fn();
			const setLive = jest.fn();
			const onChange = jest.fn();
			const hidePopover = jest.fn();
			useRef.mockReturnValueOnce().mockReturnValueOnce().mockReturnValueOnce({current: {hidePopover}});
			useState
				.mockReturnValueOnce(['', setText])
				.mockReturnValueOnce([[], setSuggestions])
				.mockReturnValueOnce([false, setOpen])
				.mockReturnValueOnce([-1, setSelected])
				.mockReturnValueOnce([null, setLive]);
			const wrapper = shallow(
				<TagComboBox id="test" tags={['foo', 'bar']} validate={jest.fn()} onChange={onChange} onError={jest.fn()} />
			);
			const updateSuggestions = debounce.mock.results[0].value;
			const event = {target: {value: 'baz'}};
			wrapper.find('#random-id').simulate('blur', event);
			expect(onChange.mock.calls).toEqual([[['foo', 'bar', 'baz'], event]]);
			expect(hidePopover.mock.calls).toEqual([[]]);
			expect(setText.mock.calls).toEqual([['']]);
			expect(setSuggestions.mock.calls).toEqual([[[]]]);
			expect(setOpen.mock.calls).toEqual([[false]]);
			expect(setSelected.mock.calls).toEqual([[-1]]);
			expect(setLive.mock.calls).toEqual([['baz added']]);
			expect(updateSuggestions.cancel.mock.calls).toEqual([[]]);
		});

		it('does not call onChange on blur if the input text is empty', () => {
			const onChange = jest.fn();
			const wrapper = shallow(
				<TagComboBox id="test" tags={['foo', 'bar']} validate={jest.fn()} onChange={onChange} onError={jest.fn()} />
			);
			wrapper.find('#random-id').simulate('blur', {target: {value: ''}});
			expect(onChange).not.toHaveBeenCalled();
		});

		it('calls preventDefault on mouse down', () => {
			const preventDefault = jest.fn();
			const wrapper = shallow(
				<TagComboBox id="test" tags={[]} validate={jest.fn()} onChange={jest.fn()} onError={jest.fn()} />
			);
			wrapper.find('[role="listbox"]').simulate('mousedown', {preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
		});

		it('calls onChange on mouse up if the element is found', () => {
			const setText = jest.fn();
			const setSuggestions = jest.fn();
			const setOpen = jest.fn();
			const setSelected = jest.fn();
			const setLive = jest.fn();
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			const hidePopover = jest.fn();
			const closest = jest.fn().mockReturnValue({dataset: {index: '0'}});
			useRef.mockReturnValueOnce().mockReturnValueOnce().mockReturnValueOnce({current: {hidePopover}});
			useState
				.mockReturnValueOnce(['', setText])
				.mockReturnValueOnce([['baz', 'baa'], setSuggestions])
				.mockReturnValueOnce([false, setOpen])
				.mockReturnValueOnce([0, setSelected])
				.mockReturnValueOnce([null, setLive]);
			const wrapper = shallow(
				<TagComboBox
					id="test"
					tags={['foo', 'bar']}
					validate={jest.fn()}
					renderSuggestion={jest.fn().mockReturnValue(<div />)}
					onChange={onChange}
					onError={jest.fn()}
				/>
			);
			const event = {preventDefault, target: {closest}};
			wrapper.find('[role="listbox"]').simulate('mouseup', event);
			expect(closest.mock.calls).toEqual([['[role=option]']]);
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(onChange.mock.calls).toEqual([[['foo', 'bar', 'baz'], event]]);
			expect(hidePopover.mock.calls).toEqual([[]]);
			expect(setText.mock.calls).toEqual([['']]);
			expect(setSuggestions.mock.calls).toEqual([[[]]]);
			expect(setOpen.mock.calls).toEqual([[false]]);
			expect(setSelected.mock.calls).toEqual([[-1]]);
			expect(setLive.mock.calls).toEqual([['baz added']]);
		});

		it('ignores the event on mouse up if the element is not found', () => {
			const closest = jest.fn();
			const wrapper = shallow(
				<TagComboBox id="test" tags={[]} validate={jest.fn()} onChange={jest.fn()} onError={jest.fn()} />
			);
			wrapper.find('[role="listbox"]').simulate('mouseup', {target: {closest}});
			expect(closest.mock.calls).toEqual([['[role=option]']]);
		});

		it('adds an effect which cancels call to updateSuggestions when it changes', () => {
			shallow(<TagComboBox id="test" tags={[]} validate={jest.fn()} onChange={jest.fn()} onError={jest.fn()} />);
			const updateSuggestions = debounce.mock.results[0].value;
			expect(useEffect.mock.calls[0]).toEqual([expect.any(Function), [updateSuggestions]]);
			expect(useEffect.mock.calls[0][0]()).toBe(updateSuggestions.cancel);
		});
	});
});
