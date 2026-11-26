import {useEffect, useRef, useState} from 'react';
import {shallow} from 'enzyme';

import InlineNotification from '../../src/components/InlineNotification';
import useRandomId from '../../src/hooks/useRandomId';
import addResizeObserver from '../../src/functions/addResizeObserver';
import getNextFocusTarget from '../../src/functions/getNextFocusTarget';

jest.unmock('../../src/components/InlineNotification');

useRandomId.mockReturnValue('random-id');

describe('InlineNotification', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<InlineNotification type="info" text="Test of notification" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when title is set', () => {
			const wrapper = shallow(<InlineNotification type="info" title="Test title" text="Test of notification" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(<InlineNotification className="TestClass" type="info" text="Test of notification" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when onClose is set', () => {
			const wrapper = shallow(<InlineNotification type="info" text="Test of notification" onClose={jest.fn()} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when actionText is set', () => {
			const wrapper = shallow(
				<InlineNotification type="error" text="Test of notification" actionText="Retry" onAction={jest.fn()} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when actionText, title, and onClose are set', () => {
			const wrapper = shallow(
				<InlineNotification
					type="error"
					title="Test title"
					text="Test of notification"
					actionText="Retry"
					onAction={jest.fn()}
					onClose={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when narrow', () => {
			useState.mockReturnValueOnce([true]);
			const wrapper = shallow(
				<InlineNotification type="error" text="Test of notification" actionText="Retry" onAction={jest.fn()} />
			);
			expect(wrapper.prop('className')).toBe('InlineNotification InlineNotification--error InlineNotification--narrow');
		});

		it('renders the alert role when type is error', () => {
			const wrapper = shallow(<InlineNotification type="error" text="Test of notification" />);
			expect(wrapper.prop('role')).toBe('alert');
		});

		it('renders the role and aria attributes passed by the consumer', () => {
			const wrapper = shallow(
				<InlineNotification type="error" text="Test of notification" role="status" aria-labelledby="other" />
			);
			expect(wrapper.prop('role')).toBe('status');
			expect(wrapper.prop('aria-labelledby')).toBe('other');
		});
	});

	describe('behaviour', () => {
		it('calls onAction when the action button is clicked', () => {
			const onAction = jest.fn();
			const wrapper = shallow(
				<InlineNotification type="error" text="Test of notification" actionText="Retry" onAction={onAction} />
			);
			wrapper.find('Button').simulate('click');
			expect(onAction.mock.calls).toEqual([[]]);
		});

		it('moves focus to the next focus target and calls onClose when the close button is clicked', () => {
			const element = {};
			const focus = jest.fn();
			const onClose = jest.fn(() => expect(focus.mock.calls).toEqual([[]]));
			useRef.mockReturnValueOnce({current: element});
			getNextFocusTarget.mockReturnValueOnce({focus});
			const wrapper = shallow(<InlineNotification type="info" text="Test of notification" onClose={onClose} />);
			wrapper.find('button').simulate('click');
			expect(getNextFocusTarget.mock.calls).toEqual([[element]]);
			expect(onClose.mock.calls).toEqual([[]]);
		});

		it('calls onClose when the close button is clicked and there is no focus target', () => {
			const onClose = jest.fn();
			const wrapper = shallow(<InlineNotification type="info" text="Test of notification" onClose={onClose} />);
			wrapper.find('button').simulate('click');
			expect(onClose.mock.calls).toEqual([[]]);
		});

		it('adds an effect which sets narrow when the notification is narrower than 480px', () => {
			const setNarrow = jest.fn();
			const element = {offsetWidth: 479};
			const remove = jest.fn();
			useRef.mockReturnValueOnce({current: element});
			useState.mockReturnValueOnce([false, setNarrow]);
			addResizeObserver.mockReturnValueOnce(remove);
			shallow(<InlineNotification type="info" text="Test of notification" />);
			expect(useEffect.mock.calls).toEqual([[expect.any(Function), []]]);

			expect(useEffect.mock.calls[0][0]()).toBe(remove);
			expect(addResizeObserver.mock.calls).toEqual([[element, expect.any(Function)]]);

			addResizeObserver.mock.calls[0][1]();
			element.offsetWidth = 480;
			addResizeObserver.mock.calls[0][1]();
			expect(setNarrow.mock.calls).toEqual([[true], [false]]);
		});
	});
});
