import {useEffect, useRef} from 'react';
import reorder from '@bluecateng/smooth-reorder';

import useReorder from '../../src/hooks/useReorder';
import setLiveText from '../../src/functions/setLiveText';

jest.unmock('../../src/hooks/useReorder');

const anyFunction = expect.any(Function);

describe('useReorder', () => {
	it('adds a reorder handler', () => {
		const selector = '.Test';
		const handleSelector = '.Test__handle';
		const container = {};
		const ref = {current: container};
		const setAttribute = jest.fn();
		const removeAttribute = jest.fn();
		const list = ['foo', 'bar'];
		const getElementName = (element) => list[element.dataset.index];
		const updateList = jest.fn();

		useRef.mockReturnValueOnce(ref);

		expect(useReorder(selector, handleSelector, list.length, getElementName, updateList)).toBe(ref);
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
		const element1 = {dataset: {index: '0'}, previousSibling: {dataset: {index: '1'}}, setAttribute, removeAttribute};
		const element2 = {dataset: {index: '1'}, removeAttribute};
		const element3 = {dataset: {index: '0'}, removeAttribute};
		onStart(element1, 0);
		onMove(element1, 1);
		onFinish(element1);
		onFinish(element2);
		onFinish(element3);
		onCancel(element1);
		expect(setLiveText.mock.calls).toEqual([
			[
				'foo grabbed. Current position in list: 1 of 2. Press up or down arrow keys to change position, space bar to drop, Escape key to cancel.',
			],
			['foo. Current position in list: 2 of 2.'],
			['foo dropped. Final position in list: 2 of 2.'],
			['bar dropped. Final position in list: 1 of 2.'],
			['foo dropped. Final position in list: 1 of 2.'],
			['foo reorder cancelled.'],
		]);
		expect(updateList.mock.calls).toEqual([
			[0, 1],
			[1, 0],
		]);
		expect(setAttribute.mock.calls).toEqual([['aria-hidden', 'true']]);
		jest.runOnlyPendingTimers();
		expect(removeAttribute.mock.calls).toEqual([['aria-hidden'], ['aria-hidden'], ['aria-hidden'], ['aria-hidden']]);
	});
});
