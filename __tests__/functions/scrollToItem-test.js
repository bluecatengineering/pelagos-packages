import scrollToItem from '../../src/functions/scrollToItem';
import smoothScroll from '../../src/functions/smoothScroll';

jest.unmock('../../src/functions/scrollToItem');

describe('scrollToItem', () => {
	it('calls smoothScroll when elementBottom > scrollBottom', () => {
		const container = {
			clientHeight: 100,
			scrollHeight: 300,
			scrollTop: 50,
		};
		scrollToItem(container, {offsetTop: 150, offsetHeight: 50});
		expect(smoothScroll.mock.calls).toEqual([[container, 50, 50, 150]]);
	});

	it('calls smoothScroll when elementTop < scrollTop', () => {
		const container = {
			clientHeight: 100,
			scrollHeight: 300,
			scrollTop: 150,
		};
		scrollToItem(container, {offsetTop: 50, offsetHeight: 50});
		expect(smoothScroll.mock.calls).toEqual([[container, 150, -100, 150]]);
	});

	it('calls smoothScroll when elementTop < scrollTop and headerHeight is set', () => {
		const container = {
			clientHeight: 100,
			scrollHeight: 300,
			scrollTop: 50,
		};
		scrollToItem(container, {offsetTop: 50, offsetHeight: 50}, {headerHeight: 25});
		expect(smoothScroll.mock.calls).toEqual([[container, 50, -25, 150]]);
	});

	it('does not call smoothScroll when elementTop >= scrollTop && elementBottom <= scrollBottom', () => {
		const container = {
			clientHeight: 100,
			scrollHeight: 300,
			scrollTop: 0,
		};
		scrollToItem(container, {offsetTop: 50, offsetHeight: 50});
		expect(smoothScroll).not.toHaveBeenCalled();
	});

	it('calls done when elementTop >= scrollTop && elementBottom <= scrollBottom', () => {
		const container = {
			clientHeight: 100,
			scrollHeight: 300,
			scrollTop: 0,
		};
		const done = jest.fn();
		scrollToItem(container, {offsetTop: 50, offsetHeight: 50}, {done});
		expect(smoothScroll).not.toHaveBeenCalled();
		expect(done.mock.calls).toEqual([[]]);
	});

	it('does not call smoothScroll when scrollHeight <= clientHeight', () => {
		const container = {
			clientHeight: 100,
			scrollHeight: 100,
		};
		scrollToItem(container, {});
		expect(smoothScroll).not.toHaveBeenCalled();
	});

	it('calls done when scrollHeight <= clientHeight', () => {
		const container = {
			clientHeight: 100,
			scrollHeight: 100,
		};
		const done = jest.fn();
		scrollToItem(container, {}, {done});
		expect(smoothScroll).not.toHaveBeenCalled();
		expect(done.mock.calls).toEqual([[]]);
	});
});
