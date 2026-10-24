import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {shallow} from 'enzyme';

import Toast from '../../src/components/Toast';
import ToastMessage from '../../src/components/ToastMessage';
import ToastTypes from '../../src/toasts/ToastTypes';

jest.unmock('../../src/components/Toast');

const anyFunction = expect.any(Function);
const pause = jest.fn();
const finish = jest.fn();
const animate = jest.fn().mockReturnValue({pause, finish});
const getElementById = jest.fn().mockReturnValue({animate});
global.document = {getElementById};

describe('Toast', () => {
	describe('rendering', () => {
		it('renders all messages', () => {
			useState.mockReturnValueOnce([[<div key="foo" />, <div key="bar" />]]);
			const wrapper = shallow(<Toast messages={[]} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders no messages when messages is not set', () => {
			const wrapper = shallow(<Toast />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders modal backdrop when hasFatalError returns true', () => {
			const messages = [{id: 'foo', type: ToastTypes.FATAL}];
			useState.mockReturnValueOnce([[<div key="foo" />, <div key="bar" />]]);
			const wrapper = shallow(<Toast messages={messages} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('creates initial elements', () => {
			const messages = [
				{id: 'foo', type: 'a', text: 'Test 1'},
				{id: 'bar', type: 'b', text: 'Test 2'},
			];
			shallow(<Toast messages={messages} />);
			expect(useState.mock.calls).toEqual([[anyFunction]]);
			expect(useState.mock.calls[0][0]()).toMatchSnapshot();
		});

		it('adds an effect which creates initial animations', () => {
			const animationsRef = {};
			useRef.mockReturnValueOnce(animationsRef).mockReturnValueOnce({}).mockReturnValueOnce({});
			useState.mockReturnValueOnce([[{key: 'foo'}]]);
			shallow(<Toast messages={[]} />);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction]);

			useEffect.mock.calls[0][0]();
			expect(getElementById.mock.calls).toEqual([['toast-foo']]);
			expect(animate.mock.calls).toEqual([
				[
					[
						{opacity: 0, transform: 'rotateX(-90deg)'},
						{opacity: 1, transform: 'none'},
					],
					{duration: 150, fill: 'both', easing: 'ease-out'},
				],
			]);
			expect(finish.mock.calls).toEqual([[]]);
			expect(animationsRef.current).toEqual(expect.any(Object));
		});

		it('adds an effect which creates animations for new children', () => {
			const enteringRef = {current: ['foo']};
			useRef.mockReturnValueOnce({current: {}}).mockReturnValueOnce(enteringRef).mockReturnValueOnce({});
			shallow(<Toast messages={[]} />);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction]);

			useEffect.mock.calls[0][0]();
			expect(getElementById.mock.calls).toEqual([['toast-foo']]);
			expect(animate.mock.calls).toEqual([
				[
					[
						{opacity: 0, transform: 'rotateX(-90deg)'},
						{opacity: 1, transform: 'none'},
					],
					{duration: 150, fill: 'both', easing: 'ease-out'},
				],
			]);
			expect(pause.mock.calls).toEqual([]);
			expect(enteringRef.current).toBeNull();
		});

		it('adds an effect which plays animations backwards for removed children', () => {
			const reverse = jest.fn();
			const animation = {reverse};
			const animations = {foo: animation};
			const leavingRef = {current: ['foo', 'bar']};
			const setChildren = jest.fn();
			useRef.mockReturnValueOnce({current: animations}).mockReturnValueOnce({}).mockReturnValueOnce(leavingRef);
			useState.mockReturnValueOnce([[], setChildren]);
			shallow(<Toast messages={[]} />);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction]);

			useEffect.mock.calls[0][0]();
			expect(animation).toEqual({reverse, leaving: true, onfinish: anyFunction});
			expect(reverse.mock.calls).toEqual([[]]);
			expect(leavingRef.current).toBeNull();

			animation.onfinish();
			expect(animations).toEqual({});
			expect(setChildren.mock.calls).toEqual([[anyFunction]]);

			expect(setChildren.mock.calls[0][0]([{key: 'foo'}, {key: 'bar'}])).toEqual([{key: 'bar'}]);
		});

		it('adds an effect which keeps children added again before the leaving animation finishes', () => {
			const animation = {reverse: jest.fn()};
			const animations = {foo: animation};
			const messagesRef = {current: []};
			const setChildren = jest.fn();
			useRef
				.mockReturnValueOnce({current: animations})
				.mockReturnValueOnce({})
				.mockReturnValueOnce({current: ['foo']})
				.mockReturnValueOnce({})
				.mockReturnValueOnce(messagesRef);
			useState.mockReturnValueOnce([[], setChildren]);
			shallow(<Toast messages={[]} />);

			useEffect.mock.calls[0][0]();
			messagesRef.current = [{id: 'foo'}];
			animation.onfinish();
			expect(animations).toEqual({foo: animation});
			expect(setChildren.mock.calls).toEqual([]);
		});

		it('adds an effect which does not play animations backwards again for leaving children', () => {
			const reverse = jest.fn();
			const animation = {reverse, leaving: true};
			const leavingRef = {current: ['foo']};
			useRef
				.mockReturnValueOnce({current: {foo: animation}})
				.mockReturnValueOnce({})
				.mockReturnValueOnce(leavingRef);
			shallow(<Toast messages={[]} />);

			useEffect.mock.calls[0][0]();
			expect(reverse.mock.calls).toEqual([]);
			expect(leavingRef.current).toBeNull();
		});

		it('adds an effect which plays animations forwards again for children added while leaving', () => {
			const reverse = jest.fn();
			const animation = {reverse, leaving: true, onfinish: jest.fn()};
			const enteringRef = {current: ['foo']};
			useRef
				.mockReturnValueOnce({current: {foo: animation}})
				.mockReturnValueOnce(enteringRef)
				.mockReturnValueOnce({});
			shallow(<Toast messages={[]} />);

			useEffect.mock.calls[0][0]();
			expect(animation).toEqual({reverse, leaving: false, onfinish: null});
			expect(reverse.mock.calls).toEqual([[]]);
			expect(animate.mock.calls).toEqual([]);
			expect(enteringRef.current).toBeNull();
		});

		it('adds a layout effect which keeps the latest onRemove and messages', () => {
			const onRemove = jest.fn();
			const onRemoveRef = {current: null};
			const messagesRef = {current: null};
			const message = {id: 'foo'};
			const messages = [message];
			useRef
				.mockReturnValueOnce({current: {}})
				.mockReturnValueOnce({})
				.mockReturnValueOnce({})
				.mockReturnValueOnce(onRemoveRef)
				.mockReturnValueOnce(messagesRef);
			shallow(<Toast messages={messages} onRemove={onRemove} />);
			expect(useLayoutEffect.mock.calls).toEqual([[anyFunction]]);

			useLayoutEffect.mock.calls[0][0]();
			expect(onRemoveRef.current).toBe(onRemove);
			expect(messagesRef.current).toBe(messages);

			useState.mock.calls[0][0]()[0].props.onRemove(message);
			expect(onRemove.mock.calls).toEqual([[message]]);
		});

		it('ignores removals when onRemove is not set', () => {
			const message = {id: 'foo'};
			shallow(<Toast messages={[message]} />);
			expect(() => useState.mock.calls[0][0]()[0].props.onRemove(message)).not.toThrow();
		});

		it('adds an effect which finds entering and leaving children', () => {
			const messages = [{id: 'foo'}, {id: 'baz'}];
			const onRemove = jest.fn();
			const enteringRef = {};
			const leavingRef = {};
			const children = [<ToastMessage key="foo" message={{}} />, <ToastMessage key="bar" message={{}} />];
			const setChildren = jest.fn();
			useRef.mockReturnValueOnce({current: {}}).mockReturnValueOnce(enteringRef).mockReturnValueOnce(leavingRef);
			useState.mockReturnValueOnce([children, setChildren]);
			shallow(<Toast messages={messages} onRemove={onRemove} />);
			expect(useEffect.mock.calls[1]).toEqual([anyFunction, [messages, anyFunction]]);

			useEffect.mock.calls[1][0]();
			expect(setChildren.mock.calls).toEqual([[anyFunction]]);

			expect(setChildren.mock.calls[0][0](children)).toEqual([
				<ToastMessage key="foo" message={{}} />,
				<ToastMessage key="bar" message={{}} />,
				<ToastMessage key="baz" message={{id: 'baz'}} onRemove={anyFunction} />,
			]);
			expect(enteringRef).toEqual({current: ['baz']});
			expect(leavingRef).toEqual({current: ['bar']});
		});

		it('adds an effect which makes no changes when messages and children match', () => {
			const messages = [{id: 'foo'}];
			const onRemove = jest.fn();
			const enteringRef = {};
			const leavingRef = {};
			const children = [<ToastMessage key="foo" message={{}} />];
			const setChildren = jest.fn();
			useRef.mockReturnValueOnce({current: {}}).mockReturnValueOnce(enteringRef).mockReturnValueOnce(leavingRef);
			useState.mockReturnValueOnce([children, setChildren]);
			shallow(<Toast messages={messages} onRemove={onRemove} />);
			expect(useEffect.mock.calls[1]).toEqual([anyFunction, [messages, anyFunction]]);

			useEffect.mock.calls[1][0]();
			expect(setChildren.mock.calls).toEqual([[anyFunction]]);

			expect(setChildren.mock.calls[0][0](children)).toEqual([<ToastMessage key="foo" message={{}} />]);
			expect(enteringRef).toEqual({current: null});
			expect(leavingRef).toEqual({current: null});
		});

		it('adds an effect which replaces children added again while leaving', () => {
			const messages = [{id: 'foo'}, {id: 'bar'}];
			const enteringRef = {};
			const leavingRef = {};
			const children = [<ToastMessage key="foo" message={{}} />, <ToastMessage key="bar" message={{}} />];
			const setChildren = jest.fn();
			useRef
				.mockReturnValueOnce({current: {foo: {}, bar: {leaving: true}}})
				.mockReturnValueOnce(enteringRef)
				.mockReturnValueOnce(leavingRef);
			useState.mockReturnValueOnce([children, setChildren]);
			shallow(<Toast messages={messages} />);

			useEffect.mock.calls[1][0]();
			expect(setChildren.mock.calls[0][0](children)).toEqual([
				<ToastMessage key="foo" message={{}} />,
				<ToastMessage key="bar" message={{id: 'bar'}} onRemove={anyFunction} />,
			]);
			expect(enteringRef).toEqual({current: ['bar']});
			expect(leavingRef).toEqual({current: null});
		});

		it('adds an effect which accumulates entering and leaving children until they are processed', () => {
			const messages = [{id: 'foo'}, {id: 'baz'}];
			const enteringRef = {current: ['qux', 'foo']};
			const leavingRef = {current: ['foo', 'quux']};
			const children = [<ToastMessage key="foo" message={{}} />, <ToastMessage key="bar" message={{}} />];
			const setChildren = jest.fn();
			useRef.mockReturnValueOnce({current: {}}).mockReturnValueOnce(enteringRef).mockReturnValueOnce(leavingRef);
			useState.mockReturnValueOnce([children, setChildren]);
			shallow(<Toast messages={messages} />);

			useEffect.mock.calls[1][0]();
			setChildren.mock.calls[0][0](children);
			expect(enteringRef).toEqual({current: ['foo', 'baz']});
			expect(leavingRef).toEqual({current: ['quux', 'bar']});
		});
	});
});
