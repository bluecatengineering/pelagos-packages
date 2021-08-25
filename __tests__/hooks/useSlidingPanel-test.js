import {useEffect, useRef} from 'react';

import useSlidingPanel from '../../src/hooks/useSlidingPanel';

jest.unmock('../../src/hooks/useSlidingPanel');

global.document = {
	getElementById: jest.fn(),
};

describe('useSlidingPanel', () => {
	it('adds an animation on mount', () => {
		const animate = jest.fn();
		const element = {animate};
		document.getElementById.mockReturnValue(element);

		useSlidingPanel('test');

		expect(useEffect.mock.calls).toEqual([[expect.any(Function), ['test']]]);
		useEffect.mock.calls[0][0]();
		expect(document.getElementById.mock.calls).toEqual([['test']]);
		expect(animate.mock.calls).toEqual([
			[
				[{transform: 'translateX(100%)'}, {transform: 'translateX(0)'}],
				{duration: 250, fill: 'both', easing: 'ease-out'},
			],
		]);
	});

	it('calls onClose when the details panel is closed', () => {
		const onClose = jest.fn();
		const reverse = jest.fn();
		const current = {reverse};

		useRef.mockReturnValue({current});
		useSlidingPanel('test', onClose)();

		expect(reverse.mock.calls).toEqual([[]]);
		expect(current).toEqual({reverse, onfinish: onClose});
	});
});
