import {useRef, useState} from 'react';
import {shallow} from 'enzyme';

import TagInput from '../../src/components/TagInput';
import useTooltip from '../../src/hooks/useTooltip';
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

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<TagInput
					id="test"
					className="TestClass"
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

		it('renders expected elements when disabled', () => {
			const wrapper = shallow(
				<TagInput
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
				<TagInput
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
			const onChange = jest.fn();
			const focus = jest.fn();
			const button = {dataset: {index: '0'}};
			const live = {};
			useRef.mockReturnValueOnce({current: {focus}}).mockReturnValueOnce({current: live});
			const wrapper = shallow(
				<TagInput id="test" tags={['foo', 'bar']} validate={jest.fn()} onChange={onChange} onError={jest.fn()} />
			);
			const event = {target: {closest: jest.fn().mockReturnValue(button)}};
			wrapper.find('Tag').at(0).prop('onRemove')(event);
			expect(onChange.mock.calls).toEqual([[['bar'], event]]);
			expect(focus.mock.calls).toEqual([[]]);
			expect(live.textContent).toBe('foo removed');
		});

		it('calls onChange when enter is pressed', () => {
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			const focus = jest.fn();
			const live = {};
			useRef.mockReturnValueOnce({current: {focus}}).mockReturnValueOnce({current: live});
			const wrapper = shallow(
				<TagInput id="test" tags={['foo', 'bar']} validate={jest.fn()} onChange={onChange} onError={jest.fn()} />
			);
			const event = {keyCode: 13, preventDefault, target: {value: 'baz'}};
			wrapper.find('#random-id').simulate('keydown', event);
			expect(onChange.mock.calls).toEqual([[['foo', 'bar', 'baz'], event]]);
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(focus.mock.calls).toEqual([[]]);
			expect(live.textContent).toBe('baz added');
		});

		it('calls onChange when enter is pressed with a transform function', () => {
			const onChange = jest.fn();
			const transform = jest.fn().mockReturnValue('transform');
			const validate = jest.fn();
			const preventDefault = jest.fn();
			const focus = jest.fn();
			const live = {};
			useRef.mockReturnValueOnce({current: {focus}}).mockReturnValueOnce({current: live});
			const wrapper = shallow(
				<TagInput
					id="test"
					tags={['foo', 'bar']}
					validate={validate}
					transform={transform}
					onChange={onChange}
					onError={jest.fn()}
				/>
			);
			const event = {keyCode: 13, preventDefault, target: {value: 'baz'}};
			wrapper.find('#random-id').simulate('keydown', event);
			expect(transform.mock.calls).toEqual([['baz']]);
			expect(validate.mock.calls).toEqual([['transform']]);
			expect(onChange.mock.calls).toEqual([[['foo', 'bar', 'transform'], event]]);
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(focus.mock.calls).toEqual([[]]);
			expect(live.textContent).toBe('transform added');
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
			const focus = jest.fn();
			useRef.mockReturnValueOnce({current: {focus}}).mockReturnValueOnce({});
			const wrapper = shallow(
				<TagInput id="test" tags={['foo', 'bar']} validate={jest.fn()} onChange={onChange} onError={jest.fn()} />
			);
			wrapper.find('#random-id').simulate('keydown', {keyCode: 13, preventDefault, target: {value: 'bar'}});
			expect(onChange).not.toHaveBeenCalled();
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls onError when enter is pressed and validate returns en error', () => {
			const validate = jest.fn().mockReturnValue('error');
			const onChange = jest.fn();
			const onError = jest.fn();
			const preventDefault = jest.fn();
			const focus = jest.fn();
			useRef.mockReturnValueOnce({current: {focus}}).mockReturnValueOnce({});
			const wrapper = shallow(
				<TagInput id="test" tags={['foo', 'bar']} validate={validate} onChange={onChange} onError={onError} />
			);
			const event = {keyCode: 13, preventDefault, target: {value: 'baz'}};
			wrapper.find('#random-id').simulate('keydown', event);
			expect(onChange).not.toHaveBeenCalled();
			expect(onError.mock.calls).toEqual([['error', event]]);
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls onChange when backspace is pressed', () => {
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			const live = {};
			useRef.mockReturnValueOnce({}).mockReturnValueOnce({current: live});
			const wrapper = shallow(
				<TagInput id="test" tags={['foo', 'bar']} validate={jest.fn()} onChange={onChange} onError={jest.fn()} />
			);
			const event = {keyCode: 8, preventDefault, target: {value: ''}};
			wrapper.find('#random-id').simulate('keydown', event);
			expect(onChange.mock.calls).toEqual([[['foo'], event]]);
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(live.textContent).toBe('bar removed');
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
			const event = {target: {value: 'foo'}};
			wrapper.find('#random-id').simulate('change', event);
			expect(setText.mock.calls).toEqual([['foo']]);
			expect(onError.mock.calls).toEqual([[null, event]]);
		});

		it('calls onChange on blur', () => {
			const onChange = jest.fn();
			const live = {};
			useRef.mockReturnValueOnce({}).mockReturnValueOnce({current: live});
			const wrapper = shallow(
				<TagInput id="test" tags={['foo', 'bar']} validate={jest.fn()} onChange={onChange} onError={jest.fn()} />
			);
			const event = {target: {value: 'baz'}};
			wrapper.find('#random-id').simulate('blur', event);
			expect(onChange.mock.calls).toEqual([[['foo', 'bar', 'baz'], event]]);
			expect(live.textContent).toBe('baz added');
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
