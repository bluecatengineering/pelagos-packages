import React from 'react';
import {shallow} from 'enzyme';

import ToastTypes from '../../src/ToastTypes';
import ToastMessage from '../../src/components/ToastMessage';

jest.unmock('../../src/components/ToastMessage');

describe('ToastMessage', () => {
	describe('rendering', () => {
		it('renders close button on error', () => {
			const message = {
				type: ToastTypes.ERROR,
				text: 'This is a test',
			};
			const wrapper = shallow(<ToastMessage message={message} closeLabel="Dismiss" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('does not render button on application error', () => {
			const message = {
				type: ToastTypes.FATAL,
				text: 'This is a test',
			};
			const wrapper = shallow(<ToastMessage message={message} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onClick and onRemove when clicked', () => {
			const onClick = jest.fn();
			const onRemove = jest.fn();
			const message = {
				type: ToastTypes.ERROR,
				text: 'This is a test',
				onClick,
			};
			const wrapper = shallow(<ToastMessage message={message} onRemove={onRemove} />);
			wrapper.simulate('click');
			expect(onClick.mock.calls).toEqual([[]]);
			expect(onRemove.mock.calls).toEqual([[message]]);
		});

		it('ignores onClick when clicked if not set', () => {
			const onRemove = jest.fn();
			const message = {
				type: ToastTypes.ERROR,
				text: 'This is a test',
			};
			const wrapper = shallow(<ToastMessage message={message} onRemove={onRemove} />);
			wrapper.simulate('click');
			expect(onRemove.mock.calls).toEqual([[message]]);
		});

		it("doesn't call onRemove when clicked if the type is application error", () => {
			const onRemove = jest.fn();
			const message = {
				type: ToastTypes.FATAL,
				text: 'This is a test',
			};
			const wrapper = shallow(<ToastMessage message={message} onRemove={onRemove} />);
			wrapper.simulate('click');
			expect(onRemove).not.toHaveBeenCalled();
		});
	});
});
