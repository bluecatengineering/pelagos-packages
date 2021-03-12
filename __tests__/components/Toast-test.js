import {useEffect, useRef, useState} from 'react';
import {shallow} from 'enzyme';

import Toast from '../../src/components/Toast';
import ToastMessage from '../../src/components/ToastMessage';
import {hasFatalError} from '../../src/toasts/ToastFunctions';

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

		it('renders modal backdrop when hasFatalError returns true', () => {
			const messages = [{id: 'foo'}];
			hasFatalError.mockReturnValue(true);
			useState.mockReturnValueOnce([[<div key="foo" />, <div key="bar" />]]);
			const wrapper = shallow(<Toast messages={messages} />);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(hasFatalError.mock.calls).toEqual([[messages]]);
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
			shallow(<Toast />);
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
			shallow(<Toast />);
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
			shallow(<Toast />);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction]);

			useEffect.mock.calls[0][0]();
			expect(animation).toEqual({reverse, onfinish: anyFunction});
			expect(reverse.mock.calls).toEqual([[]]);
			expect(leavingRef.current).toBeNull();

			animation.onfinish();
			expect(animations).toEqual({});
			expect(setChildren.mock.calls).toEqual([[anyFunction]]);

			expect(setChildren.mock.calls[0][0]([{key: 'foo'}, {key: 'bar'}])).toEqual([{key: 'bar'}]);
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
			expect(useEffect.mock.calls[1]).toEqual([anyFunction, [messages, onRemove]]);

			useEffect.mock.calls[1][0]();
			expect(setChildren.mock.calls).toEqual([[anyFunction]]);

			expect(setChildren.mock.calls[0][0](children)).toEqual([
				<ToastMessage key="foo" message={{}} />,
				<ToastMessage key="bar" message={{}} />,
				<ToastMessage key="baz" message={{id: 'baz'}} onRemove={onRemove} />,
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
			expect(useEffect.mock.calls[1]).toEqual([anyFunction, [messages, onRemove]]);

			useEffect.mock.calls[1][0]();
			expect(setChildren.mock.calls).toEqual([[anyFunction]]);

			expect(setChildren.mock.calls[0][0](children)).toEqual([<ToastMessage key="foo" message={{}} />]);
			expect(enteringRef).toEqual({});
			expect(leavingRef).toEqual({});
		});
	});
});
