import scrollIntoView from '../../src/functions/scrollIntoView';
import smoothScroll from '../../src/functions/smoothScroll';

jest.unmock('../../src/functions/scrollIntoView');

global.document = {};
global.getComputedStyle = () => ({overflowY: 'scroll'});
global.CustomEvent = jest.fn();

describe('scrollIntoView', () => {
	it('scrolls the element if necessary', () => {
		const dispatchEvent = jest.fn();
		const parentNode = {
			clientHeight: 10,
			scrollHeight: 30,
			scrollTop: 0,
			dispatchEvent,
			getBoundingClientRect() {
				return {top: 0, bottom: 10};
			},
		};
		const element = {
			parentNode,
			getBoundingClientRect() {
				return {top: 10, bottom: 15};
			},
		};
		scrollIntoView(element);
		expect(smoothScroll).not.toHaveBeenCalled();
		expect(parentNode.scrollTop).toBe(10);
		expect(CustomEvent.mock.calls).toEqual([['scroll']]);
		expect(dispatchEvent.mock.calls).toEqual([[CustomEvent.mock.instances[0]]]);
	});

	it('scrolls backwards', () => {
		const parentNode = {
			clientHeight: 10,
			scrollHeight: 30,
			scrollTop: 20,
			dispatchEvent: jest.fn(),
			getBoundingClientRect() {
				return {top: 0, bottom: 10};
			},
		};
		const element = {
			parentNode,
			getBoundingClientRect() {
				return {top: -10, bottom: -5};
			},
		};
		scrollIntoView(element);
		expect(smoothScroll).not.toHaveBeenCalled();
		expect(parentNode.scrollTop).toBe(10);
	});

	it('scrolls up to the maximum top', () => {
		const parentNode = {
			clientHeight: 10,
			scrollHeight: 30,
			scrollTop: 0,
			dispatchEvent: jest.fn(),
			getBoundingClientRect() {
				return {top: 0, bottom: 10};
			},
		};
		const element = {
			parentNode,
			getBoundingClientRect() {
				return {top: 25, bottom: 30};
			},
		};
		scrollIntoView(element);
		expect(smoothScroll).not.toHaveBeenCalled();
		expect(parentNode.scrollTop).toBe(20);
	});

	it('calls smoothScroll when smooth is true', () => {
		const parentNode = {
			clientHeight: 10,
			scrollHeight: 30,
			scrollTop: 0,
			getBoundingClientRect() {
				return {top: 0, bottom: 10};
			},
		};
		const element = {
			parentNode,
			getBoundingClientRect() {
				return {top: 10, bottom: 15};
			},
		};
		const done = jest.fn();
		scrollIntoView(element, {smooth: true, done});
		expect(smoothScroll.mock.calls).toEqual([[parentNode, 0, 10, 150, done]]);
	});

	it('calls smoothScroll with duration when smooth is true and duration is set', () => {
		const parentNode = {
			clientHeight: 10,
			scrollHeight: 30,
			scrollTop: 0,
			getBoundingClientRect() {
				return {top: 0, bottom: 10};
			},
		};
		const element = {
			parentNode,
			getBoundingClientRect() {
				return {top: 10, bottom: 15};
			},
		};
		scrollIntoView(element, {smooth: true, duration: 150});
		expect(smoothScroll.mock.calls).toEqual([[parentNode, 0, 10, 150]]);
	});

	it('scrolls the element if necessary when alignBottom is true', () => {
		const parentNode = {
			clientHeight: 10,
			scrollHeight: 30,
			scrollTop: 0,
			dispatchEvent: jest.fn(),
			getBoundingClientRect() {
				return {top: 0, bottom: 10};
			},
		};
		const element = {
			parentNode,
			getBoundingClientRect() {
				return {top: 10, bottom: 15};
			},
		};
		scrollIntoView(element, {alignBottom: true});
		expect(smoothScroll).not.toHaveBeenCalled();
		expect(parentNode.scrollTop).toBe(5);
	});

	it('scrolls backwards when alignBottom is true', () => {
		const parentNode = {
			clientHeight: 10,
			scrollHeight: 30,
			scrollTop: 20,
			dispatchEvent: jest.fn(),
			getBoundingClientRect() {
				return {top: 0, bottom: 10};
			},
		};
		const element = {
			parentNode,
			getBoundingClientRect() {
				return {top: -10, bottom: -5};
			},
		};
		scrollIntoView(element, {alignBottom: true});
		expect(smoothScroll).not.toHaveBeenCalled();
		expect(parentNode.scrollTop).toBe(5);
	});

	it('scrolls down to 0 when alignBottom is true', () => {
		const parentNode = {
			clientHeight: 10,
			scrollHeight: 30,
			scrollTop: 20,
			dispatchEvent: jest.fn(),
			getBoundingClientRect() {
				return {top: 0, bottom: 10};
			},
		};
		const element = {
			parentNode,
			getBoundingClientRect() {
				return {top: -20, bottom: -15};
			},
		};
		scrollIntoView(element, {alignBottom: true});
		expect(smoothScroll).not.toHaveBeenCalled();
		expect(parentNode.scrollTop).toBe(0);
	});

	it('calls smoothScroll when smooth is true and alignBottom is true', () => {
		const parentNode = {
			clientHeight: 10,
			scrollHeight: 30,
			scrollTop: 0,
			getBoundingClientRect() {
				return {top: 0, bottom: 10};
			},
		};
		const element = {
			parentNode,
			getBoundingClientRect() {
				return {top: 10, bottom: 15};
			},
		};
		scrollIntoView(element, {smooth: true, alignBottom: true});
		expect(smoothScroll.mock.calls).toEqual([[parentNode, 0, 5, 150]]);
	});

	it('scrolls the parent that can be scrolled', () => {
		const parentNode = {
			clientHeight: 10,
			scrollHeight: 30,
			scrollTop: 0,
			dispatchEvent: jest.fn(),
			getBoundingClientRect() {
				return {top: 0, bottom: 10};
			},
		};
		const intermediateParent = {
			parentNode,
			clientHeight: 10,
			scrollHeight: 10,
			scrollTop: 0,
		};
		const element = {
			parentNode: intermediateParent,
			getBoundingClientRect() {
				return {top: 10, bottom: 15};
			},
		};
		scrollIntoView(element);
		expect(intermediateParent.scrollTop).toBe(0);
		expect(parentNode.scrollTop).toBe(10);
	});

	it('does not scroll the element if not necessary', () => {
		const parentNode = {
			clientHeight: 10,
			scrollHeight: 30,
			scrollTop: 0,
			getBoundingClientRect() {
				return {top: 0, bottom: 10};
			},
		};
		const element = {
			parentNode,
			getBoundingClientRect() {
				return {top: 0, bottom: 5};
			},
		};
		scrollIntoView(element);
		expect(smoothScroll).not.toHaveBeenCalled();
		expect(parentNode.scrollTop).toBe(0);
	});

	it('calls done on scroll', () => {
		const dispatchEvent = jest.fn();
		const parentNode = {
			clientHeight: 10,
			scrollHeight: 30,
			scrollTop: 0,
			dispatchEvent,
			getBoundingClientRect() {
				return {top: 0, bottom: 10};
			},
		};
		const element = {
			parentNode,
			getBoundingClientRect() {
				return {top: 10, bottom: 15};
			},
		};
		const done = jest.fn();
		scrollIntoView(element, {done});
		expect(done.mock.calls).toEqual([[]]);
	});

	it('calls done if scroll is not necessary', () => {
		const parentNode = {
			clientHeight: 10,
			scrollHeight: 30,
			scrollTop: 0,
			getBoundingClientRect() {
				return {top: 0, bottom: 10};
			},
		};
		const element = {
			parentNode,
			getBoundingClientRect() {
				return {top: 0, bottom: 5};
			},
		};
		const done = jest.fn();
		scrollIntoView(element, {done});
		expect(smoothScroll).not.toHaveBeenCalled();
		expect(parentNode.scrollTop).toBe(0);
		expect(done.mock.calls).toEqual([[]]);
	});
});
