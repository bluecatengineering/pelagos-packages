import {useRef, useState} from 'react';
import {shallow} from 'enzyme';

import TagInput from '../../src/components/TagInput';
import useTooltip from '../../src/hooks/useTooltip';
import setLiveText from '../../src/functions/setLiveText';
import useRandomId from '../../src/hooks/useRandomId';

jest.unmock('../../src/components/TagInput');

jest.mock('lodash-es/debounce', () => jest.fn((f) => (f && (f.cancel = jest.fn()), f)));

useRandomId.mockReturnValue('random-id');

describe('TagInput', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<TagInput id="test" tags={['foo', 'bar']} validate={jest.fn()} onChange={jest.fn()} onError={jest.fn()} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useRandomId.mock.calls).toEqual([['test']]);
		});

		it('renders expected elements when error is set', () => {
			const wrapper = shallow(
				<TagInput
					id="test"
					tags={['foo', 'bar']}
					error="error"
					validate={jest.fn()}
					onChange={jest.fn()}
					onError={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when tags is empty and defaultTags is not set', () => {
			const wrapper = shallow(
				<TagInput id="test" tags={[]} validate={jest.fn()} onChange={jest.fn()} onError={jest.fn()} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when tags is empty and defaultTags is set', () => {
			const wrapper = shallow(
				<TagInput
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
	});

	describe('behaviour', () => {
		it('calls onChange when the remove button is clicked', () => {
			const onChange = jest.fn();
			const focus = jest.fn();
			const button = {dataset: {index: '0'}};
			useRef.mockReturnValue({current: {focus}});
			const wrapper = shallow(
				<TagInput id="test" tags={['foo', 'bar']} validate={jest.fn()} onChange={onChange} onError={jest.fn()} />
			);
			wrapper.simulate('click', {target: {closest: jest.fn().mockReturnValue(button)}});
			expect(onChange.mock.calls).toEqual([[['bar']]]);
			expect(focus.mock.calls).toEqual([[]]);
			expect(setLiveText.mock.calls).toEqual([['foo removed']]);
		});

		it('does not call onChange when the container is clicked but not on a remove button', () => {
			const onChange = jest.fn();
			const wrapper = shallow(
				<TagInput id="test" tags={['foo', 'bar']} validate={jest.fn()} onChange={onChange} onError={jest.fn()} />
			);
			wrapper.simulate('click', {target: {closest: jest.fn()}});
			expect(onChange).not.toHaveBeenCalled();
		});

		it('calls onChange when enter is pressed', () => {
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			const focus = jest.fn();
			useRef.mockReturnValue({current: {focus}});
			const wrapper = shallow(
				<TagInput id="test" tags={['foo', 'bar']} validate={jest.fn()} onChange={onChange} onError={jest.fn()} />
			);
			wrapper.find('#random-id').simulate('keydown', {keyCode: 13, preventDefault, target: {value: 'baz'}});
			expect(onChange.mock.calls).toEqual([[['foo', 'bar', 'baz']]]);
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(focus.mock.calls).toEqual([[]]);
			expect(setLiveText.mock.calls).toEqual([['baz added']]);
		});

		it('does not call onChange when enter is pressed and the input text is empty', () => {
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			const wrapper = shallow(
				<TagInput id="test" tags={['foo', 'bar']} validate={jest.fn()} onChange={onChange} onError={jest.fn()} />
			);
			wrapper.find('#random-id').simulate('keydown', {keyCode: 13, preventDefault, target: {value: ''}});
			expect(onChange).not.toHaveBeenCalled();
			expect(preventDefault).not.toHaveBeenCalled();
		});

		it('does not call onChange when enter is pressed and the input text is already in tags', () => {
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			const wrapper = shallow(
				<TagInput id="test" tags={['foo', 'bar']} validate={jest.fn()} onChange={onChange} onError={jest.fn()} />
			);
			wrapper.find('#random-id').simulate('keydown', {keyCode: 13, preventDefault, target: {value: 'bar'}});
			expect(onChange).not.toHaveBeenCalled();
			expect(preventDefault.mock.calls).toEqual([[]]);
		});

		it('calls onError when enter is pressed and validate returns en error', () => {
			const validate = jest.fn().mockReturnValue('error');
			const onChange = jest.fn();
			const onError = jest.fn();
			const preventDefault = jest.fn();
			const wrapper = shallow(
				<TagInput id="test" tags={['foo', 'bar']} validate={validate} onChange={onChange} onError={onError} />
			);
			wrapper.find('#random-id').simulate('keydown', {keyCode: 13, preventDefault, target: {value: 'baz'}});
			expect(onChange).not.toHaveBeenCalled();
			expect(onError.mock.calls).toEqual([['error']]);
			expect(preventDefault.mock.calls).toEqual([[]]);
		});

		it('calls onChange when backspace is pressed', () => {
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			const wrapper = shallow(
				<TagInput id="test" tags={['foo', 'bar']} validate={jest.fn()} onChange={onChange} onError={jest.fn()} />
			);
			wrapper.find('#random-id').simulate('keydown', {keyCode: 8, preventDefault, target: {value: ''}});
			expect(onChange.mock.calls).toEqual([[['foo']]]);
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(setLiveText.mock.calls).toEqual([['bar removed']]);
		});

		it('does not call onChange when backspace is pressed and the text is not empty', () => {
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			const wrapper = shallow(
				<TagInput id="test" tags={['foo', 'bar']} validate={jest.fn()} onChange={onChange} onError={jest.fn()} />
			);
			wrapper.find('#random-id').simulate('keydown', {keyCode: 8, preventDefault, target: {value: 'x'}});
			expect(onChange).not.toHaveBeenCalled();
			expect(preventDefault).not.toHaveBeenCalled();
		});

		it('does not call onChange when backspace is pressed and tags is empty', () => {
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			const wrapper = shallow(
				<TagInput id="test" tags={[]} validate={jest.fn()} onChange={onChange} onError={jest.fn()} />
			);
			wrapper.find('#random-id').simulate('keydown', {keyCode: 8, preventDefault, target: {value: ''}});
			expect(onChange).not.toHaveBeenCalled();
			expect(preventDefault.mock.calls).toEqual([[]]);
		});

		it('calls setText when the input changes', () => {
			const onError = jest.fn();
			const setText = jest.fn();
			useState.mockReturnValue(['', setText]);
			const wrapper = shallow(
				<TagInput id="test" tags={[]} validate={jest.fn()} onChange={jest.fn()} onError={onError} />
			);
			wrapper.find('#random-id').simulate('change', {target: {value: 'foo'}});
			expect(setText.mock.calls).toEqual([['foo']]);
			expect(onError.mock.calls).toEqual([[null]]);
		});

		it('calls onChange on blur', () => {
			const onChange = jest.fn();
			const wrapper = shallow(
				<TagInput id="test" tags={['foo', 'bar']} validate={jest.fn()} onChange={onChange} onError={jest.fn()} />
			);
			wrapper.find('#random-id').simulate('blur', {target: {value: 'baz'}});
			expect(onChange.mock.calls).toEqual([[['foo', 'bar', 'baz']]]);
			expect(setLiveText.mock.calls).toEqual([['baz added']]);
		});

		it('does not call onChange on blur if the input text is empty', () => {
			const onChange = jest.fn();
			const wrapper = shallow(
				<TagInput id="test" tags={['foo', 'bar']} validate={jest.fn()} onChange={onChange} onError={jest.fn()} />
			);
			wrapper.find('#random-id').simulate('blur', {target: {value: ''}});
			expect(onChange).not.toHaveBeenCalled();
		});
	});
});
