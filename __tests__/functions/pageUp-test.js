import {smoothScroll} from '@bluecat/helpers';

import pageUp from '../../src/functions/pageUp';

jest.unmock('../../src/functions/pageUp');

describe('pageUp', () => {
	it('returns 0 if scrollTop is 0', () => {
		expect(pageUp({scrollTop: 0})).toBe(0);
	});

	it('returns the amount to scroll', () => {
		const element = {
			clientHeight: 50,
			scrollTop: 75,
			children: [{offsetHeight: 25}, {}, {}],
		};
		expect(pageUp(element, 3)).toBe(1);
		expect(smoothScroll.mock.calls).toEqual([[element, 75, -50, 150]]);
	});

	it('returns 0 if the amount to scroll is more than a page', () => {
		const element = {
			clientHeight: 50,
			scrollTop: 25,
			children: [{offsetHeight: 25}, {}, {}],
		};
		expect(pageUp(element, 2)).toBe(0);
		expect(smoothScroll.mock.calls).toEqual([[element, 25, -25, 150]]);
	});
});
