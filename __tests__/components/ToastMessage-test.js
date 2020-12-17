import {useEffect, useRef} from 'react';
import {shallow} from 'enzyme';

import ToastTypes from '../../src/ToastTypes';
import ToastMessage from '../../src/components/ToastMessage';

jest.unmock('../../src/components/ToastMessage');
jest.unmock('../../src/strings');

const anyFunction = expect.any(Function);

describe('ToastMessage', () => {
	describe('rendering', () => {
		it('renders close button if type is error', () => {
			const message = {
				id: '0',
				type: ToastTypes.ERROR,
				text: 'This is a test',
			};
			const wrapper = shallow(<ToastMessage message={message} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders action button if type is action', () => {
			const message = {
				id: '0',
				type: ToastTypes.ACTION,
				text: 'This is a test',
				actionText: 'Action',
			};
			const wrapper = shallow(<ToastMessage message={message} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('does not render close button if type is fatal', () => {
			const message = {
				id: '0',
				type: ToastTypes.FATAL,
				text: 'This is a test',
			};
			const wrapper = shallow(<ToastMessage message={message} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onClick and onRemove when action button is clicked', () => {
			const onClick = jest.fn();
			const onRemove = jest.fn();
			const message = {
				type: ToastTypes.ACTION,
				text: 'This is a test',
				onClick,
			};
			const wrapper = shallow(<ToastMessage message={message} onRemove={onRemove} />);
			wrapper.find('Button').simulate('click');
			expect(onClick.mock.calls).toEqual([[]]);
			expect(onRemove.mock.calls).toEqual([[message]]);
		});

		it('calls onRemove when remove button is clicked', () => {
			const onRemove = jest.fn();
			const message = {
				type: ToastTypes.ERROR,
				text: 'This is a test',
			};
			const wrapper = shallow(<ToastMessage message={message} onRemove={onRemove} />);
			wrapper.find('[role="button"]').simulate('click');
			expect(onRemove.mock.calls).toEqual([[message]]);
		});

		it('adds an effect which starts an animation', () => {
			const play = jest.fn().mockReturnValue(true);
			const pause = jest.fn().mockReturnValue(true);
			const animation = {play, pause};
			const onRemove = jest.fn();
			const animate = jest.fn().mockReturnValue(animation);
			const addEventListener = jest.fn();
			const message = {
				type: ToastTypes.ERROR,
				text: 'This is a test',
			};
			const current = {animate, parentNode: {addEventListener}};
			useRef.mockReturnValue({current});
			shallow(<ToastMessage message={message} onRemove={onRemove} />);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, [message, onRemove]]);

			const remove = useEffect.mock.calls[0][0]();
			expect(animate.mock.calls).toEqual([[[{width: '100%'}, {width: '0'}], 8000]]);
			expect(addEventListener.mock.calls).toEqual([
				['mouseenter', anyFunction],
				['mouseleave', anyFunction],
			]);

			expect(addEventListener.mock.calls[0][1]()).toBe(true);
			expect(addEventListener.mock.calls[1][1]()).toBe(true);
			animation.onfinish();
			expect(addEventListener.mock.calls[0][1]()).toBeNull();
			expect(addEventListener.mock.calls[1][1]()).toBeNull();
			expect(play.mock.calls).toEqual([[]]);
			expect(pause.mock.calls).toEqual([[]]);
			expect(onRemove.mock.calls).toEqual([[message]]);

			expect(remove()).toBeNull();
		});

		it('adds an effect which starts an animation when type is success', () => {
			const cancel = jest.fn().mockReturnValue(true);
			const animation = {cancel};
			const onRemove = jest.fn();
			const animate = jest.fn().mockReturnValue(animation);
			const addEventListener = jest.fn();
			const message = {
				type: ToastTypes.SUCCESS,
				text: 'This is a test',
			};
			const current = {animate, parentNode: {addEventListener}};
			useRef.mockReturnValue({current});
			shallow(<ToastMessage message={message} onRemove={onRemove} />);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, [message, onRemove]]);

			const remove = useEffect.mock.calls[0][0]();
			expect(animate.mock.calls).toEqual([[[{width: '100%'}, {width: '0'}], 3000]]);

			expect(remove()).toBe(true);
			expect(cancel.mock.calls).toEqual([[]]);
		});

		it('adds an effect which does not start an animation when not needed', () => {
			const onRemove = jest.fn();
			const message = {
				type: ToastTypes.FATAL,
				text: 'This is a test',
			};
			useRef.mockReturnValue({});
			shallow(<ToastMessage message={message} onRemove={onRemove} />);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, [message, onRemove]]);

			expect(useEffect.mock.calls[0][0]()).toBeUndefined();
		});
	});
});
