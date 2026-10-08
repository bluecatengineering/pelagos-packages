import {useEffect, useRef} from 'react';
import reorder from '@bluecateng/smooth-reorder';

import useReorder from '../../src/hooks/useReorder';

jest.unmock('../../src/hooks/useReorder');

const anyFunction = expect.any(Function);

// simulates one render of the hook, returns the bind effect and the unmount effect
const renderHook = ({containerRef, liveRef = {current: {}}, latestRef = {}, boundRef = {current: null}}, ...args) => {
	useEffect.mockClear();
	useRef
		.mockReturnValueOnce(containerRef)
		.mockReturnValueOnce(liveRef)
		.mockReturnValueOnce(latestRef)
		.mockReturnValueOnce(boundRef);
	// eslint-disable-next-line react-hooks/rules-of-hooks -- hooks are mocked, this simulates a render
	useReorder(...args);
	return {bind: useEffect.mock.calls[0][0], unmount: useEffect.mock.calls[1][0]};
};

describe('useReorder', () => {
	it('adds a reorder handler', () => {
		const selector = '.Test';
		const handleSelector = '.Test__handle';
		const container = {};
		const containerRef = {current: container};
		const live = {};
		const liveRef = {current: live};
		const getAttribute = jest.fn().mockReturnValue('attribute-value');
		const setAttribute = jest.fn();
		const removeAttribute = jest.fn();
		const list = ['foo', 'bar'];
		const getElementName = (element) => list[element.dataset.index];
		const updateList = jest.fn();

		useRef
			.mockReturnValueOnce(containerRef)
			.mockReturnValueOnce(liveRef)
			.mockReturnValueOnce({})
			.mockReturnValueOnce({current: null});

		expect(useReorder(selector, handleSelector, list.length, getElementName, updateList)).toEqual([
			containerRef,
			liveRef,
		]);
		expect(useEffect.mock.calls[0]).toEqual([expect.any(Function)]);
		expect(useEffect.mock.calls[1]).toEqual([expect.any(Function), []]);
		useEffect.mock.calls[0][0]();
		expect(reorder.mock.calls).toEqual([
			[
				container,
				{
					selector,
					focusSelector: selector,
					handleSelector,
					onStart: anyFunction,
					onMoveEnd: anyFunction,
					onFinish: anyFunction,
					onCancel: anyFunction,
				},
			],
		]);

		const {onStart, onMoveEnd, onFinish, onCancel} = reorder.mock.calls[0][1];
		const element1 = {
			dataset: {index: '0'},
			previousSibling: {dataset: {index: '1'}},
			getAttribute,
			setAttribute,
			removeAttribute,
		};
		const element2 = {dataset: {index: '1'}, setAttribute, removeAttribute};
		const element3 = {dataset: {index: '0'}, setAttribute, removeAttribute};
		onStart(element1, 0);
		expect(live.textContent).toBe(
			'foo grabbed. Current position in list: 1 of 2. Press up or down arrow keys to change position, space bar to drop, Escape key to cancel.'
		);
		onMoveEnd(element1, 1);
		expect(live.textContent).toBe('foo. Current position in list: 2 of 2.');
		onFinish(element1);
		expect(live.textContent).toBe('foo dropped. Final position in list: 2 of 2.');
		onFinish(element2);
		expect(live.textContent).toBe('bar dropped. Final position in list: 1 of 2.');
		onFinish(element3);
		expect(live.textContent).toBe('foo dropped. Final position in list: 1 of 2.');
		onStart(element1, 0);
		onCancel(element1);
		onCancel(element1);
		expect(live.textContent).toBe('foo reorder cancelled.');
		expect(updateList.mock.calls).toEqual([
			[0, 1],
			[1, 0],
		]);
		expect(setAttribute.mock.calls).toEqual([
			['aria-hidden', 'true'],
			['aria-describedby', 'attribute-value'],
			['aria-hidden', 'true'],
			['aria-describedby', 'attribute-value'],
		]);
		jest.runOnlyPendingTimers();
		expect(removeAttribute.mock.calls).toEqual([
			['aria-describedby'],
			['aria-describedby'],
			['aria-hidden'],
			['aria-hidden'],
			['aria-hidden'],
			['aria-hidden'],
			['aria-hidden'],
		]);
	});

	it('uses the latest values in callbacks', () => {
		const container = {};
		const live = {};
		const latestRef = {};
		const getElementName = jest.fn().mockReturnValue('foo');
		const updateList1 = jest.fn();
		const updateList2 = jest.fn();
		const element = {
			dataset: {index: '0'},
			previousSibling: {dataset: {index: '2'}},
			setAttribute: jest.fn(),
			removeAttribute: jest.fn(),
		};

		const containerRef = {current: container};
		const liveRef = {current: live};
		const boundRef = {current: null};
		renderHook(
			{containerRef, liveRef, latestRef, boundRef},
			'.Test',
			'.Test__handle',
			3,
			getElementName,
			updateList1
		).bind();
		const {onMoveEnd, onFinish} = reorder.mock.calls[0][1];

		// rerender after an item is removed
		renderHook({containerRef, liveRef, latestRef, boundRef}, '.Test', '.Test__handle', 2, getElementName, updateList2);

		onMoveEnd(element, 1);
		expect(live.textContent).toBe('foo. Current position in list: 2 of 2.');
		onFinish(element);
		expect(updateList1.mock.calls).toEqual([]);
		expect(updateList2.mock.calls).toEqual([[0, 2]]);
	});

	it('adds a reorder handler when handleSelector is an object', () => {
		const selector = '.Test';
		const handleSelector = '.Test__handle';
		const focusSelector = '.Test__focus';
		const container = {};
		const containerRef = {current: container};
		const live = {};
		const liveRef = {current: live};
		const list = ['foo', 'bar'];
		const getElementName = (element) => list[element.dataset.index];
		const updateList = jest.fn();
		const handleObject = {handle: handleSelector, focus: focusSelector};

		useRef
			.mockReturnValueOnce(containerRef)
			.mockReturnValueOnce(liveRef)
			.mockReturnValueOnce({})
			.mockReturnValueOnce({current: null});

		expect(useReorder(selector, handleObject, list.length, getElementName, updateList)).toEqual([
			containerRef,
			liveRef,
		]);
		useEffect.mock.calls[0][0]();
		expect(reorder.mock.calls).toEqual([
			[
				container,
				{
					selector,
					focusSelector,
					handleSelector,
					onStart: anyFunction,
					onMoveEnd: anyFunction,
					onFinish: anyFunction,
					onCancel: anyFunction,
				},
			],
		]);
	});

	describe('binding', () => {
		const getElementName = () => 'foo';
		const onChange = () => {};

		it('does not bind again when nothing changed', () => {
			const container = {};
			const refs = {containerRef: {current: container}, boundRef: {current: null}};
			const dispose = jest.fn();
			reorder.mockReturnValue(dispose);

			renderHook(refs, '.Test', '.Test__handle', 2, getElementName, onChange).bind();
			renderHook(refs, '.Test', '.Test__handle', 3, getElementName, onChange).bind();
			renderHook(refs, '.Test', {handle: '.Test__handle', focus: '.Test'}, 3, getElementName, onChange).bind();

			expect(reorder.mock.calls.length).toBe(1);
			expect(dispose).not.toHaveBeenCalled();
		});

		it('binds again when the container element is replaced', () => {
			const container1 = {};
			const container2 = {};
			const refs = {containerRef: {current: container1}, boundRef: {current: null}};
			const dispose1 = jest.fn();
			const dispose2 = jest.fn();
			reorder.mockReturnValueOnce(dispose1).mockReturnValueOnce(dispose2);

			renderHook(refs, '.Test', '.Test__handle', 0, getElementName, onChange).bind();
			refs.containerRef.current = container2;
			renderHook(refs, '.Test', '.Test__handle', 1, getElementName, onChange).bind();

			expect(reorder.mock.calls.map(([element]) => element)).toEqual([container1, container2]);
			expect(dispose1.mock.calls.length).toBe(1);
			expect(dispose2).not.toHaveBeenCalled();
		});

		it.each([
			['selector', '.Other', '.Test__handle'],
			['handle', '.Test', '.Other__handle'],
			['focus', '.Test', {handle: '.Test__handle', focus: '.Other__focus'}],
		])('binds again when the %s changes', (name, selector, handleSelector) => {
			const refs = {containerRef: {current: {}}, boundRef: {current: null}};
			const dispose = jest.fn();
			reorder.mockReturnValue(dispose);

			renderHook(refs, '.Test', '.Test__handle', 2, getElementName, onChange).bind();
			renderHook(refs, selector, handleSelector, 2, getElementName, onChange).bind();

			expect(reorder.mock.calls.length).toBe(2);
			expect(dispose.mock.calls.length).toBe(1);
		});

		it('does not bind when there is no container element', () => {
			const refs = {containerRef: {current: null}, boundRef: {current: null}};

			renderHook(refs, '.Test', '.Test__handle', 2, getElementName, onChange).bind();

			expect(reorder).not.toHaveBeenCalled();
			expect(refs.boundRef.current).toBeNull();
		});

		it('unbinds when the container element is removed', () => {
			const refs = {containerRef: {current: {}}, boundRef: {current: null}};
			const dispose = jest.fn();
			reorder.mockReturnValue(dispose);

			renderHook(refs, '.Test', '.Test__handle', 2, getElementName, onChange).bind();
			refs.containerRef.current = null;
			renderHook(refs, '.Test', '.Test__handle', 2, getElementName, onChange).bind();

			expect(dispose.mock.calls.length).toBe(1);
			expect(refs.boundRef.current).toBeNull();
		});

		it('unbinds on unmount', () => {
			const refs = {containerRef: {current: {}}, boundRef: {current: null}};
			const dispose = jest.fn();
			reorder.mockReturnValue(dispose);

			const {bind, unmount} = renderHook(refs, '.Test', '.Test__handle', 2, getElementName, onChange);
			bind();
			unmount()();

			expect(dispose.mock.calls.length).toBe(1);
			expect(refs.boundRef.current).toBeNull();
		});

		it('does nothing on unmount when not bound', () => {
			const refs = {containerRef: {current: null}, boundRef: {current: null}};

			const {unmount} = renderHook(refs, '.Test', '.Test__handle', 2, getElementName, onChange);

			expect(() => unmount()()).not.toThrow();
		});
	});
});
