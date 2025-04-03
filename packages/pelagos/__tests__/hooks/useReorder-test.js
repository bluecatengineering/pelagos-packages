import {useEffect, useRef} from 'react';
import reorder from '@bluecateng/smooth-reorder';

import useReorder from '../../src/hooks/useReorder';

jest.unmock('../../src/hooks/useReorder');

const anyFunction = expect.any(Function);

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

		useRef.mockReturnValueOnce(containerRef).mockReturnValueOnce(liveRef);

		expect(useReorder(selector, handleSelector, list.length, getElementName, updateList)).toEqual([
			containerRef,
			liveRef,
		]);
		expect(useEffect.mock.calls[0]).toEqual([
			expect.any(Function),
			[selector, handleSelector, getElementName, updateList, list.length],
		]);
		useEffect.mock.calls[0][0](container);
		expect(reorder.mock.calls).toEqual([
			[
				container,
				{
					selector,
					focusSelector: selector,
					handleSelector,
					onStart: anyFunction,
					onMove: anyFunction,
					onFinish: anyFunction,
					onCancel: anyFunction,
				},
			],
		]);

		const {onStart, onMove, onFinish, onCancel} = reorder.mock.calls[0][1];
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
		onMove(element1, 1);
		jest.runOnlyPendingTimers();
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

		useRef.mockReturnValueOnce(containerRef).mockReturnValueOnce(liveRef);

		expect(useReorder(selector, handleObject, list.length, getElementName, updateList)).toEqual([
			containerRef,
			liveRef,
		]);
		expect(useEffect.mock.calls[0]).toEqual([
			expect.any(Function),
			[selector, handleObject, getElementName, updateList, list.length],
		]);
		useEffect.mock.calls[0][0](container);
		expect(reorder.mock.calls).toEqual([
			[
				container,
				{
					selector,
					focusSelector,
					handleSelector,
					onStart: anyFunction,
					onMove: anyFunction,
					onFinish: anyFunction,
					onCancel: anyFunction,
				},
			],
		]);
	});
});
