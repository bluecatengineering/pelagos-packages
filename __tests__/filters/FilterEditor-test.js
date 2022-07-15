import {useEffect, useRef} from 'react';
import {shallow} from 'enzyme';
import {createFocusTrap} from 'focus-trap';

import FilterEditor from '../../src/filters/FilterEditor';

jest.unmock('../../src/filters/FilterEditor');

const anyFunction = expect.any(Function);

describe('FilterEditor', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const getLabel = jest.fn().mockReturnValue('Test Label');
			const getEditor = jest.fn().mockReturnValue(<div id="editor" />);
			const wrapper = shallow(<FilterEditor name="test" value="foo" getLabel={getLabel} getEditor={getEditor} />);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(getLabel.mock.calls).toEqual([['test']]);
			expect(getEditor.mock.calls).toEqual([['test', 'foo', anyFunction, expect.any(Object)]]);
		});
	});

	describe('behaviour', () => {
		it('adds an effect which creates a focus trap', () => {
			const current = {};
			const onClose = jest.fn();
			const activate = jest.fn();
			const deactivate = jest.fn();
			const closest = jest.fn().mockReturnValue({});
			useRef.mockReturnValueOnce({current});
			createFocusTrap.mockReturnValue({activate, deactivate});
			shallow(<FilterEditor name="test" getLabel={jest.fn()} getEditor={jest.fn()} onClose={onClose} />);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, [onClose]]);
			expect(useEffect.mock.calls[0][0]()).toBe(deactivate);
			expect(activate.mock.calls).toEqual([[]]);
			expect(createFocusTrap.mock.calls).toEqual([
				[current, {clickOutsideDeactivates: anyFunction, onDeactivate: onClose}],
			]);
			const {clickOutsideDeactivates} = createFocusTrap.mock.calls[0][1];
			expect(clickOutsideDeactivates({target: {closest}})).toBe(false);
			expect(closest.mock.calls).toEqual([['[role="listbox"]']]);
		});

		it('calls onSave when the save button is clicked', () => {
			const onSave = jest.fn();
			const wrapper = shallow(
				<FilterEditor name="test" value="foo" getLabel={jest.fn()} getEditor={jest.fn()} onSave={onSave} />
			);
			wrapper.find('Button').simulate('click');
			expect(onSave.mock.calls).toEqual([['foo']]);
		});

		it('does not call onSave when the save button is clicked and validateSave returns false', () => {
			useRef.mockReturnValueOnce(null).mockReturnValueOnce({current: () => false});
			const onSave = jest.fn();
			const wrapper = shallow(<FilterEditor name="test" getLabel={jest.fn()} getEditor={jest.fn()} onSave={onSave} />);
			wrapper.find('Button').simulate('click');
			expect(onSave).not.toHaveBeenCalled();
		});
	});
});
