import {smoothScroll} from '@bluecat/helpers';

import pageDown from '../../src/functions/pageDown';

jest.unmock('../../src/functions/pageDown');

describe('pageDown', () => {
	it('returns the last index when scrollTop reached the maximum value', () => {
		const element = {
			clientHeight: 50,
			scrollTop: 50,
			scrollHeight: 100,
			children: [{offsetHeight: 25}, {}, {}, {}],
		};
		expect(pageDown(element, 2)).toBe(3);
		expect(smoothScroll).not.toHaveBeenCalled();
	});

	it('returns the amount to scroll', () => {
		const element = {
			clientHeight: 50,
			scrollTop: 0,
			scrollHeight: 100,
			children: [{offsetHeight: 25}, {}, {}, {}],
		};
		expect(pageDown(element, 0)).toBe(2);
		expect(smoothScroll.mock.calls).toEqual([[element, 0, 50, 150]]);
	});

	it('returns the last index when the amount to scroll exceeds the element height', () => {
		const element = {
			clientHeight: 50,
			scrollTop: 25,
			scrollHeight: 100,
			children: [{offsetHeight: 25}, {}, {}, {}],
		};
		expect(pageDown(element, 2)).toBe(3);
		expect(smoothScroll.mock.calls).toEqual([[element, 25, 25, 150]]);
	});
});
