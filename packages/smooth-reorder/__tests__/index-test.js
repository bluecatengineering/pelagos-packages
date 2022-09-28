import spring from '@bluecateng/nano-spring';

import reorder from '../src';

jest.unmock('../src');

const anyFunction = expect.any(Function);

const preventDefault = jest.fn();
const stopPropagation = jest.fn();

const createContainer = (r, scrollWidth, scrollHeight) => ({
	style: {overflowY: 'auto', overflowX: 'auto'},
	scrollTop: 0,
	scrollLeft: 0,
	scrollWidth: scrollWidth || r.width,
	scrollHeight: scrollHeight || r.height,
	getBoundingClientRect: () => r,
	addEventListener: jest.fn(),
	removeEventListener: jest.fn(),
	setPointerCapture: jest.fn(),
	releasePointerCapture: jest.fn(),
});

const createChild = (r) => ({
	className: 'draggable',
	style: {},
	getBoundingClientRect: () => r,
	closest: jest.fn().mockReturnThis(),
	focus: jest.fn(),
	cloneNode: jest.fn().mockReturnValue({style: {}, classList: {add: jest.fn()}, focus: jest.fn()}),
	classList: {add: jest.fn(), remove: jest.fn()},
});

global.getComputedStyle = (element) => element.style;
global.requestAnimationFrame = jest.fn().mockReturnValue(1);
global.cancelAnimationFrame = jest.fn();
global.document = {
	addEventListener: jest.fn(),
	removeEventListener: jest.fn(),
	body: {appendChild: jest.fn(), removeChild: jest.fn(), getBoundingClientRect: () => ({})},
};

describe('reorder', () => {
	describe('pointer', () => {
		it('moves element down', () => {
			const onFinish = jest.fn();
			const container = createContainer({left: 0, right: 20, top: 0, bottom: 20, width: 20, height: 20});
			const c0 = createChild({left: 0, right: 20, top: 0, bottom: 10, width: 20, height: 10});
			const c1 = createChild({left: 0, right: 20, top: 10, bottom: 20});
			c1.insertAdjacentElement = jest.fn(() => (c0.nextSibling = null));
			c0.nextSibling = c1;
			reorder(container, {onFinish});
			expect(container.addEventListener.mock.calls).toEqual([
				['pointerdown', anyFunction],
				['pointerup', anyFunction],
				['lostpointercapture', anyFunction],
				['keydown', anyFunction],
			]);

			const pointerdown = container.addEventListener.mock.calls[0][1];
			const pointerup = container.addEventListener.mock.calls[1][1];
			const lostpointercapture = container.addEventListener.mock.calls[2][1];

			pointerdown({button: 0, clientX: 10, clientY: 5, pointerId: 1, target: c0, preventDefault});
			expect(c0.closest.mock.calls).toEqual([['.draggable'], ['.draggable']]);
			expect(container.setPointerCapture.mock.calls).toEqual([[1]]);
			expect(container.addEventListener.mock.calls[4]).toEqual(['pointermove', anyFunction, true]);
			expect(c0.focus.mock.calls).toEqual([[]]);

			const clone = c0.cloneNode.mock.results[0].value;
			expect(clone.style).toEqual({width: '20px', height: '10px'});

			const pointermove = container.addEventListener.mock.calls[4][1];

			pointermove({clientX: 10, clientY: 10, preventDefault});
			expect(c0.classList.add.mock.calls).toEqual([['placeholder']]);
			expect(clone.classList.add.mock.calls).toEqual([['dragging'], ['clone']]);
			expect(clone.style.transform).toBe('translate(0px,5px)');
			expect(clone.focus.mock.calls).toEqual([[]]);

			pointermove({clientX: 10, clientY: 20, preventDefault});
			pointermove({clientX: 10, clientY: 20, preventDefault});
			expect(c0.style.transform).toBeUndefined();
			expect(c1.style.transform).toBe('translate(0px,-10px)');
			expect(clone.style.transform).toBe('translate(0px,15px)');

			jest.runOnlyPendingTimers();
			expect(c0.style.transform).toBeUndefined();
			expect(c1.style.transform).toBe('');
			expect(c1.insertAdjacentElement.mock.calls).toEqual([['afterend', c0]]);

			pointerup({pointerId: 1, preventDefault});
			expect(container.releasePointerCapture.mock.calls).toEqual([[1]]);

			lostpointercapture();
			expect(spring.mock.calls).toEqual([[250, 30, anyFunction, anyFunction]]);
			spring.mock.calls[0][2](0.5);
			expect(clone.style.transform).toBe('translate(0px,7.5px)');

			spring.mock.calls[0][3]();
			expect(c0.classList.remove.mock.calls).toEqual([['placeholder']]);
			expect(onFinish.mock.calls).toEqual([[c0]]);

			expect(preventDefault.mock.calls).toEqual([[], [], [], [], []]);
		});

		it('moves element up', () => {
			const onFinish = jest.fn();
			const container = createContainer({left: 0, right: 20, top: 0, bottom: 20, width: 20, height: 20});
			const c0 = createChild({left: 0, right: 20, top: 0, bottom: 10});
			c0.insertAdjacentElement = jest.fn(() => (c1.previousSibling = null));
			const c1 = createChild({left: 0, right: 20, top: 10, bottom: 20, width: 20, height: 10});
			c1.previousSibling = c0;
			reorder(container, {onFinish});
			expect(container.addEventListener.mock.calls).toEqual([
				['pointerdown', anyFunction],
				['pointerup', anyFunction],
				['lostpointercapture', anyFunction],
				['keydown', anyFunction],
			]);

			const pointerdown = container.addEventListener.mock.calls[0][1];
			const pointerup = container.addEventListener.mock.calls[1][1];
			const lostpointercapture = container.addEventListener.mock.calls[2][1];

			pointerdown({button: 0, clientX: 10, clientY: 15, pointerId: 1, target: c1, preventDefault});
			expect(c1.closest.mock.calls).toEqual([['.draggable'], ['.draggable']]);
			expect(container.setPointerCapture.mock.calls).toEqual([[1]]);
			expect(container.addEventListener.mock.calls[4]).toEqual(['pointermove', anyFunction, true]);
			expect(c1.focus.mock.calls).toEqual([[]]);

			const clone = c1.cloneNode.mock.results[0].value;
			expect(clone.style).toEqual({width: '20px', height: '10px'});

			const pointermove = container.addEventListener.mock.calls[4][1];

			pointermove({clientX: 10, clientY: 10, preventDefault});
			expect(c1.classList.add.mock.calls).toEqual([['placeholder']]);
			expect(clone.classList.add.mock.calls).toEqual([['dragging'], ['clone']]);
			expect(clone.style.transform).toBe('translate(0px,5px)');
			expect(clone.focus.mock.calls).toEqual([[]]);

			pointermove({clientX: 10, clientY: 5, preventDefault});
			pointermove({clientX: 10, clientY: 0, preventDefault});
			expect(c1.style.transform).toBeUndefined();
			expect(c0.style.transform).toBe('translate(0px,10px)');
			expect(clone.style.transform).toBe('translate(0px,-5px)');

			jest.runOnlyPendingTimers();
			expect(c1.style.transform).toBeUndefined();
			expect(c0.style.transform).toBe('');
			expect(c0.insertAdjacentElement.mock.calls).toEqual([['beforebegin', c1]]);

			pointerup({pointerId: 1, preventDefault});
			expect(container.releasePointerCapture.mock.calls).toEqual([[1]]);

			lostpointercapture();
			expect(spring.mock.calls).toEqual([[250, 30, anyFunction, anyFunction]]);
			spring.mock.calls[0][2](0.5);
			expect(clone.style.transform).toBe('translate(0px,2.5px)');

			spring.mock.calls[0][3]();
			expect(c1.className).toBe('draggable');
			expect(onFinish.mock.calls).toEqual([[c1]]);

			expect(preventDefault.mock.calls).toEqual([[], [], [], [], []]);
		});

		it('moves element right', () => {
			const onFinish = jest.fn();
			const container = createContainer({left: 0, right: 40, top: 0, bottom: 10, width: 40, height: 10});
			const c0 = createChild({left: 0, right: 20, top: 0, bottom: 10, width: 20, height: 10});
			const c1 = createChild({left: 20, right: 40, top: 0, bottom: 10});
			c1.insertAdjacentElement = jest.fn(() => (c0.nextSibling = null));
			c0.nextSibling = c1;
			reorder(container, {horizontal: true, onFinish});
			expect(container.addEventListener.mock.calls).toEqual([
				['pointerdown', anyFunction],
				['pointerup', anyFunction],
				['lostpointercapture', anyFunction],
				['keydown', anyFunction],
			]);

			const pointerdown = container.addEventListener.mock.calls[0][1];
			const pointerup = container.addEventListener.mock.calls[1][1];
			const lostpointercapture = container.addEventListener.mock.calls[2][1];

			pointerdown({button: 0, clientX: 10, clientY: 5, pointerId: 1, target: c0, preventDefault});
			expect(c0.closest.mock.calls).toEqual([['.draggable'], ['.draggable']]);
			expect(container.setPointerCapture.mock.calls).toEqual([[1]]);
			expect(container.addEventListener.mock.calls[4]).toEqual(['pointermove', anyFunction, true]);
			expect(c0.focus.mock.calls).toEqual([[]]);

			const clone = c0.cloneNode.mock.results[0].value;
			expect(clone.style).toEqual({width: '20px', height: '10px'});

			const pointermove = container.addEventListener.mock.calls[4][1];

			pointermove({clientX: 20, clientY: 5, preventDefault});
			expect(c0.classList.add.mock.calls).toEqual([['placeholder']]);
			expect(clone.classList.add.mock.calls).toEqual([['dragging'], ['clone']]);
			expect(clone.style.transform).toBe('translate(10px,0px)');
			expect(clone.focus.mock.calls).toEqual([[]]);

			pointermove({clientX: 40, clientY: 5, preventDefault});
			pointermove({clientX: 40, clientY: 5, preventDefault});
			expect(c0.style.transform).toBeUndefined();
			expect(c1.style.transform).toBe('translate(-20px,0px)');
			expect(clone.style.transform).toBe('translate(30px,0px)');

			jest.runOnlyPendingTimers();
			expect(c0.style.transform).toBeUndefined();
			expect(c1.style.transform).toBe('');
			expect(c1.insertAdjacentElement.mock.calls).toEqual([['afterend', c0]]);

			pointerup({pointerId: 1, preventDefault});
			expect(container.releasePointerCapture.mock.calls).toEqual([[1]]);

			lostpointercapture();
			expect(spring.mock.calls).toEqual([[250, 30, anyFunction, anyFunction]]);
			spring.mock.calls[0][2](0.5);
			expect(clone.style.transform).toBe('translate(15px,0px)');

			spring.mock.calls[0][3]();
			expect(c0.className).toBe('draggable');
			expect(onFinish.mock.calls).toEqual([[c0]]);

			expect(preventDefault.mock.calls).toEqual([[], [], [], [], []]);
		});

		it('moves element left', () => {
			const onFinish = jest.fn();
			const container = createContainer({left: 0, right: 40, top: 0, bottom: 10, width: 40, height: 10});
			const c0 = createChild({left: 0, right: 20, top: 0, bottom: 10});
			c0.insertAdjacentElement = jest.fn(() => (c1.previousSibling = null));
			const c1 = createChild({left: 20, right: 40, top: 0, bottom: 10, width: 20, height: 10});
			c1.previousSibling = c0;
			reorder(container, {horizontal: true, onFinish});
			expect(container.addEventListener.mock.calls).toEqual([
				['pointerdown', anyFunction],
				['pointerup', anyFunction],
				['lostpointercapture', anyFunction],
				['keydown', anyFunction],
			]);

			const pointerdown = container.addEventListener.mock.calls[0][1];
			const pointerup = container.addEventListener.mock.calls[1][1];
			const lostpointercapture = container.addEventListener.mock.calls[2][1];

			pointerdown({button: 0, clientX: 30, clientY: 5, pointerId: 1, target: c1, preventDefault});
			expect(c1.closest.mock.calls).toEqual([['.draggable'], ['.draggable']]);
			expect(container.setPointerCapture.mock.calls).toEqual([[1]]);
			expect(container.addEventListener.mock.calls[4]).toEqual(['pointermove', anyFunction, true]);
			expect(c1.focus.mock.calls).toEqual([[]]);

			const clone = c1.cloneNode.mock.results[0].value;
			expect(clone.style).toEqual({width: '20px', height: '10px'});

			const pointermove = container.addEventListener.mock.calls[4][1];

			pointermove({clientX: 20, clientY: 5, preventDefault});
			expect(c1.classList.add.mock.calls).toEqual([['placeholder']]);
			expect(clone.classList.add.mock.calls).toEqual([['dragging'], ['clone']]);
			expect(clone.style.transform).toBe('translate(10px,0px)');
			expect(clone.focus.mock.calls).toEqual([[]]);

			pointermove({clientX: 10, clientY: 5, preventDefault});
			pointermove({clientX: 0, clientY: 5, preventDefault});
			expect(c1.style.transform).toBeUndefined();
			expect(c0.style.transform).toBe('translate(20px,0px)');
			expect(clone.style.transform).toBe('translate(-10px,0px)');

			jest.runOnlyPendingTimers();
			expect(c1.style.transform).toBeUndefined();
			expect(c0.style.transform).toBe('');
			expect(c0.insertAdjacentElement.mock.calls).toEqual([['beforebegin', c1]]);

			pointerup({pointerId: 1, preventDefault});
			expect(container.releasePointerCapture.mock.calls).toEqual([[1]]);

			lostpointercapture();
			expect(spring.mock.calls).toEqual([[250, 30, anyFunction, anyFunction]]);
			spring.mock.calls[0][2](0.5);
			expect(clone.style.transform).toBe('translate(5px,0px)');

			spring.mock.calls[0][3]();
			expect(c1.className).toBe('draggable');
			expect(onFinish.mock.calls).toEqual([[c1]]);

			expect(preventDefault.mock.calls).toEqual([[], [], [], [], []]);
		});

		it('scrolls container down', () => {
			const container = createContainer({left: 0, right: 20, top: 0, bottom: 10, width: 20, height: 10}, 20, 20);
			const c0 = createChild({left: 0, right: 20, top: 0, bottom: 10, width: 20, height: 10});
			const c1 = createChild({left: 0, right: 20, top: 10, bottom: 20});
			c1.insertAdjacentElement = jest.fn(() => (c0.nextSibling = null));
			c0.nextSibling = c1;
			reorder(container, {});
			expect(container.addEventListener.mock.calls).toEqual([
				['pointerdown', anyFunction],
				['pointerup', anyFunction],
				['lostpointercapture', anyFunction],
				['keydown', anyFunction],
			]);

			const pointerdown = container.addEventListener.mock.calls[0][1];

			pointerdown({button: 0, clientX: 10, clientY: 5, pointerId: 1, target: c0, preventDefault});
			expect(c0.closest.mock.calls).toEqual([['.draggable'], ['.draggable']]);
			expect(container.setPointerCapture.mock.calls).toEqual([[1]]);
			expect(container.addEventListener.mock.calls[4]).toEqual(['pointermove', anyFunction, true]);

			const pointermove = container.addEventListener.mock.calls[4][1];

			pointermove({clientX: 10, clientY: 10, preventDefault});
			expect(c0.classList.add.mock.calls).toEqual([['placeholder']]);

			pointermove({clientX: 10, clientY: 15, preventDefault});
			expect(c1.style.transform).toBe('translate(0px,-10px)');
			expect(container.scrollTop).toBe(10);
			expect(requestAnimationFrame.mock.calls).toEqual([[anyFunction]]);

			jest.runOnlyPendingTimers();
			expect(c1.insertAdjacentElement.mock.calls).toEqual([
				['afterend', c0],
				['afterend', c0],
			]);
		});

		it('scrolls container up', () => {
			const container = createContainer({left: 0, right: 20, top: 0, bottom: 10, width: 20, height: 10}, 20, 20);
			container.scrollTop = 10;
			const c0 = createChild({left: 0, right: 20, top: -10, bottom: 0});
			c0.insertAdjacentElement = jest.fn(() => (c1.previousSibling = null));
			const c1 = createChild({left: 0, right: 20, top: 0, bottom: 10, width: 20, height: 10});
			c1.previousSibling = c0;
			reorder(container, {});
			expect(container.addEventListener.mock.calls).toEqual([
				['pointerdown', anyFunction],
				['pointerup', anyFunction],
				['lostpointercapture', anyFunction],
				['keydown', anyFunction],
			]);

			const pointerdown = container.addEventListener.mock.calls[0][1];

			pointerdown({button: 0, clientX: 10, clientY: 5, pointerId: 1, target: c1, preventDefault});
			expect(c1.closest.mock.calls).toEqual([['.draggable'], ['.draggable']]);
			expect(container.setPointerCapture.mock.calls).toEqual([[1]]);
			expect(container.addEventListener.mock.calls[4]).toEqual(['pointermove', anyFunction, true]);

			const pointermove = container.addEventListener.mock.calls[4][1];

			pointermove({clientX: 10, clientY: 0, preventDefault});
			expect(c1.classList.add.mock.calls).toEqual([['placeholder']]);

			pointermove({clientX: 10, clientY: -5, preventDefault});
			pointermove({clientX: 10, clientY: -5, preventDefault});
			expect(c0.style.transform).toBe('translate(0px,10px)');
			expect(container.scrollTop).toBe(0);
			expect(cancelAnimationFrame.mock.calls).toEqual([[1]]);

			jest.runOnlyPendingTimers();
			expect(c0.insertAdjacentElement.mock.calls).toEqual([
				['beforebegin', c1],
				['beforebegin', c1],
			]);
		});

		it('scrolls container right', () => {
			const container = createContainer({left: 0, right: 20, top: 0, bottom: 10, width: 20, height: 10}, 40, 10);
			const c0 = createChild({left: 0, right: 20, top: 0, bottom: 10, width: 20, height: 10});
			const c1 = createChild({left: 20, right: 40, top: 0, bottom: 10});
			c1.insertAdjacentElement = jest.fn(() => (c0.nextSibling = null));
			c0.nextSibling = c1;
			reorder(container, {horizontal: true});
			expect(container.addEventListener.mock.calls).toEqual([
				['pointerdown', anyFunction],
				['pointerup', anyFunction],
				['lostpointercapture', anyFunction],
				['keydown', anyFunction],
			]);

			const pointerdown = container.addEventListener.mock.calls[0][1];

			pointerdown({button: 0, clientX: 10, clientY: 5, pointerId: 1, target: c0, preventDefault});
			expect(c0.closest.mock.calls).toEqual([['.draggable'], ['.draggable']]);
			expect(container.setPointerCapture.mock.calls).toEqual([[1]]);
			expect(container.addEventListener.mock.calls[4]).toEqual(['pointermove', anyFunction, true]);

			const pointermove = container.addEventListener.mock.calls[4][1];

			pointermove({clientX: 20, clientY: 5, preventDefault});
			expect(c0.classList.add.mock.calls).toEqual([['placeholder']]);

			pointermove({clientX: 30, clientY: 5, preventDefault});
			expect(c1.style.transform).toBe('translate(-20px,0px)');
			expect(container.scrollLeft).toBe(20);
			expect(requestAnimationFrame.mock.calls).toEqual([[anyFunction]]);

			jest.runOnlyPendingTimers();
			expect(c1.insertAdjacentElement.mock.calls).toEqual([
				['afterend', c0],
				['afterend', c0],
			]);
		});

		it('scrolls container left', () => {
			const container = createContainer({left: 0, right: 20, top: 0, bottom: 10, width: 20, height: 10}, 40, 10);
			container.scrollLeft = 20;
			const c0 = createChild({left: -20, right: 0, top: 0, bottom: 10});
			c0.insertAdjacentElement = jest.fn(() => (c1.previousSibling = null));
			const c1 = createChild({left: 0, right: 20, top: 0, bottom: 10, width: 20, height: 10});
			c1.previousSibling = c0;
			reorder(container, {horizontal: true});
			expect(container.addEventListener.mock.calls).toEqual([
				['pointerdown', anyFunction],
				['pointerup', anyFunction],
				['lostpointercapture', anyFunction],
				['keydown', anyFunction],
			]);

			const pointerdown = container.addEventListener.mock.calls[0][1];

			pointerdown({button: 0, clientX: 10, clientY: 5, pointerId: 1, target: c1, preventDefault});
			expect(c1.closest.mock.calls).toEqual([['.draggable'], ['.draggable']]);
			expect(container.setPointerCapture.mock.calls).toEqual([[1]]);
			expect(container.addEventListener.mock.calls[4]).toEqual(['pointermove', anyFunction, true]);

			const pointermove = container.addEventListener.mock.calls[4][1];

			pointermove({clientX: 0, clientY: 5, preventDefault});
			expect(c1.classList.add.mock.calls).toEqual([['placeholder']]);

			pointermove({clientX: -10, clientY: 5, preventDefault});
			expect(c0.style.transform).toBe('translate(20px,0px)');
			expect(container.scrollLeft).toBe(0);

			jest.runOnlyPendingTimers();
			expect(c0.insertAdjacentElement.mock.calls).toEqual([
				['beforebegin', c1],
				['beforebegin', c1],
			]);
		});

		it('sets focus on alternate element if focusSelector is specified', () => {
			const container = createContainer({});
			const c0 = createChild({left: 0, right: 20, top: 0, bottom: 10});
			const f = {className: 'focus', tabIndex: 0, focus: jest.fn()};
			c0.querySelector = jest.fn().mockReturnValue(f);
			reorder(container, {focusSelector: '.focus'});
			expect(container.addEventListener.mock.calls).toEqual([
				['pointerdown', anyFunction],
				['pointerup', anyFunction],
				['lostpointercapture', anyFunction],
				['keydown', anyFunction],
			]);

			const pointerdown = container.addEventListener.mock.calls[0][1];

			pointerdown({button: 0, clientX: 0, clientY: 0, pointerId: 1, target: c0, preventDefault});
			expect(c0.closest.mock.calls).toEqual([['.draggable'], ['.draggable']]);
			expect(c0.querySelector.mock.calls).toEqual([['.focus']]);
			expect(container.setPointerCapture.mock.calls).toEqual([[1]]);
			expect(f.focus.mock.calls).toEqual([[]]);
		});

		it('ignores pointerdown if no draggable is found', () => {
			const container = createContainer({});
			const target = {closest: jest.fn()};
			reorder(container, {});
			expect(container.addEventListener.mock.calls).toEqual([
				['pointerdown', anyFunction],
				['pointerup', anyFunction],
				['lostpointercapture', anyFunction],
				['keydown', anyFunction],
			]);

			const pointerdown = container.addEventListener.mock.calls[0][1];

			pointerdown({button: 0, clientX: 0, clientY: 0, pointerId: 1, target});
			expect(target.closest.mock.calls).toEqual([['.draggable']]);
			expect(container.setPointerCapture.mock.calls).toEqual([]);
		});

		it('ignores pointerdown if the button is not 0', () => {
			const container = createContainer({});
			const target = {closest: jest.fn()};
			reorder(container, {});
			expect(container.addEventListener.mock.calls).toEqual([
				['pointerdown', anyFunction],
				['pointerup', anyFunction],
				['lostpointercapture', anyFunction],
				['keydown', anyFunction],
			]);

			const pointerdown = container.addEventListener.mock.calls[0][1];

			pointerdown({button: 1, clientX: 0, clientY: 0, pointerId: 1, target});
			expect(target.closest.mock.calls).toEqual([]);
			expect(container.setPointerCapture.mock.calls).toEqual([]);
		});

		it('does not reorder if the pointer does not move', () => {
			const container = createContainer({});
			const c0 = createChild({left: 0, right: 20, top: 0, bottom: 10});
			reorder(container, {});
			expect(container.addEventListener.mock.calls).toEqual([
				['pointerdown', anyFunction],
				['pointerup', anyFunction],
				['lostpointercapture', anyFunction],
				['keydown', anyFunction],
			]);

			const pointerdown = container.addEventListener.mock.calls[0][1];
			const pointerup = container.addEventListener.mock.calls[1][1];
			const lostpointercapture = container.addEventListener.mock.calls[2][1];

			pointerdown({button: 0, clientX: 0, clientY: 0, pointerId: 1, target: c0, preventDefault});
			expect(container.setPointerCapture.mock.calls).toEqual([[1]]);
			expect(container.addEventListener.mock.calls[4]).toEqual(['pointermove', anyFunction, true]);

			const pointermove = container.addEventListener.mock.calls[4][1];

			pointermove({clientX: 1, clientY: 1, preventDefault});
			pointerup({pointerId: 1, preventDefault});
			expect(container.releasePointerCapture.mock.calls).toEqual([[1]]);

			lostpointercapture();
			expect(spring.mock.calls).toEqual([]);
		});
	});

	describe('keyboard', () => {
		it('moves element down', () => {
			const onStart = jest.fn();
			const onMove = jest.fn();
			const onFinish = jest.fn();
			const container = createContainer({});
			const c0 = createChild({left: 0, right: 20, top: 0, bottom: 10});
			c0.matches = jest.fn().mockReturnValue(true);
			c0.parentNode = container;
			const c1 = createChild({left: 0, right: 20, top: 10, bottom: 20});
			c1.insertAdjacentElement = jest.fn(() => (c0.nextSibling = null));
			container.childNodes = [c0, c1];
			c0.nextSibling = c1;
			reorder(container, {onStart, onMove, onFinish});
			expect(container.addEventListener.mock.calls[3]).toEqual(['keydown', anyFunction]);

			const keydown = container.addEventListener.mock.calls[3][1];

			keydown({keyCode: 32, target: c0, preventDefault});
			expect(c0.matches.mock.calls).toEqual([['.draggable']]);
			expect(c0.classList.add.mock.calls).toEqual([['dragging']]);
			expect(onStart.mock.calls).toEqual([[c0, 0]]);
			expect(document.addEventListener.mock.calls).toEqual([['keydown', anyFunction, true]]);

			const documentKeyDown = document.addEventListener.mock.calls[0][1];

			documentKeyDown({keyCode: 40, preventDefault, stopPropagation});
			expect(c0.style.transform).toBe('translate(0px,10px)');
			expect(c1.style.transform).toBe('translate(0px,-10px)');

			jest.runOnlyPendingTimers();
			expect(c0.style.transform).toBe('');
			expect(c1.style.transform).toBe('');
			expect(c1.insertAdjacentElement.mock.calls).toEqual([['afterend', c0]]);

			// try moving past last
			documentKeyDown({keyCode: 40, preventDefault, stopPropagation});
			expect(c1.insertAdjacentElement.mock.calls).toEqual([['afterend', c0]]);

			documentKeyDown({keyCode: 32, preventDefault, stopPropagation});
			expect(c0.classList.remove.mock.calls).toEqual([['dragging']]);
			expect(onMove.mock.calls).toEqual([[c0, 1]]);
			expect(onFinish.mock.calls).toEqual([[c0]]);
		});

		it('moves element up', () => {
			const onStart = jest.fn();
			const onMove = jest.fn();
			const onFinish = jest.fn();
			const container = createContainer({});
			const c0 = createChild({left: 0, right: 20, top: 0, bottom: 10});
			c0.insertAdjacentElement = jest.fn(() => (c1.previousSibling = null));
			const c1 = createChild({left: 0, right: 20, top: 10, bottom: 20});
			c1.matches = jest.fn().mockReturnValue(true);
			c1.parentNode = container;
			container.childNodes = [c0, c1];
			c1.previousSibling = c0;
			reorder(container, {onStart, onMove, onFinish});
			expect(container.addEventListener.mock.calls[3]).toEqual(['keydown', anyFunction]);

			const keydown = container.addEventListener.mock.calls[3][1];

			keydown({keyCode: 32, target: c1, preventDefault});
			expect(c1.matches.mock.calls).toEqual([['.draggable']]);
			expect(c1.classList.add.mock.calls).toEqual([['dragging']]);
			expect(onStart.mock.calls).toEqual([[c1, 1]]);
			expect(document.addEventListener.mock.calls).toEqual([['keydown', anyFunction, true]]);

			const documentKeyDown = document.addEventListener.mock.calls[0][1];

			documentKeyDown({keyCode: 38, preventDefault, stopPropagation});
			expect(c0.style.transform).toBe('translate(0px,10px)');
			expect(c1.style.transform).toBe('translate(0px,-10px)');

			jest.runOnlyPendingTimers();
			expect(c0.style.transform).toBe('');
			expect(c1.style.transform).toBe('');
			expect(c0.insertAdjacentElement.mock.calls).toEqual([['beforebegin', c1]]);

			// try moving before first
			documentKeyDown({keyCode: 38, preventDefault, stopPropagation});
			expect(c0.insertAdjacentElement.mock.calls).toEqual([['beforebegin', c1]]);

			documentKeyDown({keyCode: 32, preventDefault, stopPropagation});
			expect(c1.classList.remove.mock.calls).toEqual([['dragging']]);
			expect(onMove.mock.calls).toEqual([[c1, 0]]);
			expect(onFinish.mock.calls).toEqual([[c1]]);
		});

		it('moves element right', () => {
			const onStart = jest.fn();
			const onMove = jest.fn();
			const onFinish = jest.fn();
			const container = createContainer({});
			const c0 = createChild({left: 0, right: 20, top: 0, bottom: 10});
			c0.matches = jest.fn().mockReturnValue(true);
			c0.parentNode = container;
			const c1 = createChild({left: 20, right: 40, top: 0, bottom: 10});
			c1.insertAdjacentElement = jest.fn(() => (c0.nextSibling = null));
			container.childNodes = [c0, c1];
			c0.nextSibling = c1;
			reorder(container, {horizontal: true, onStart, onMove, onFinish});
			expect(container.addEventListener.mock.calls[3]).toEqual(['keydown', anyFunction]);

			const keydown = container.addEventListener.mock.calls[3][1];

			keydown({keyCode: 32, target: c0, preventDefault});
			expect(c0.matches.mock.calls).toEqual([['.draggable']]);
			expect(c0.classList.add.mock.calls).toEqual([['dragging']]);
			expect(onStart.mock.calls).toEqual([[c0, 0]]);
			expect(document.addEventListener.mock.calls).toEqual([['keydown', anyFunction, true]]);

			const documentKeyDown = document.addEventListener.mock.calls[0][1];

			documentKeyDown({keyCode: 39, preventDefault, stopPropagation});
			expect(c0.style.transform).toBe('translate(20px,0px)');
			expect(c1.style.transform).toBe('translate(-20px,0px)');

			jest.runOnlyPendingTimers();
			expect(c0.style.transform).toBe('');
			expect(c1.style.transform).toBe('');
			expect(c1.insertAdjacentElement.mock.calls).toEqual([['afterend', c0]]);

			documentKeyDown({keyCode: 32, preventDefault, stopPropagation});
			expect(c0.classList.remove.mock.calls).toEqual([['dragging']]);
			expect(onMove.mock.calls).toEqual([[c0, 1]]);
			expect(onFinish.mock.calls).toEqual([[c0]]);
		});

		it('moves element left', () => {
			const onStart = jest.fn();
			const onMove = jest.fn();
			const onFinish = jest.fn();
			const container = createContainer({});
			const c0 = createChild({left: 0, right: 20, top: 0, bottom: 10});
			c0.insertAdjacentElement = jest.fn(() => (c1.previousSibling = null));
			const c1 = createChild({left: 20, right: 40, top: 0, bottom: 10});
			c1.matches = jest.fn().mockReturnValue(true);
			c1.parentNode = container;
			container.childNodes = [c0, c1];
			c1.previousSibling = c0;
			reorder(container, {horizontal: true, onStart, onMove, onFinish});
			expect(container.addEventListener.mock.calls[3]).toEqual(['keydown', anyFunction]);

			const keydown = container.addEventListener.mock.calls[3][1];

			keydown({keyCode: 32, target: c1, preventDefault});
			expect(c1.matches.mock.calls).toEqual([['.draggable']]);
			expect(c1.classList.add.mock.calls).toEqual([['dragging']]);
			expect(onStart.mock.calls).toEqual([[c1, 1]]);
			expect(document.addEventListener.mock.calls).toEqual([['keydown', anyFunction, true]]);

			const documentKeyDown = document.addEventListener.mock.calls[0][1];

			documentKeyDown({keyCode: 37, preventDefault, stopPropagation});
			expect(c0.style.transform).toBe('translate(20px,0px)');
			expect(c1.style.transform).toBe('translate(-20px,0px)');

			jest.runOnlyPendingTimers();
			expect(c0.style.transform).toBe('');
			expect(c1.style.transform).toBe('');
			expect(c0.insertAdjacentElement.mock.calls).toEqual([['beforebegin', c1]]);

			documentKeyDown({keyCode: 32, preventDefault, stopPropagation});
			expect(c1.classList.remove.mock.calls).toEqual([['dragging']]);
			expect(onMove.mock.calls).toEqual([[c1, 0]]);
			expect(onFinish.mock.calls).toEqual([[c1]]);
		});

		it('cancels move on escape', () => {
			const onStart = jest.fn();
			const onMove = jest.fn();
			const onCancel = jest.fn();
			const container = createContainer({});
			const c0 = createChild({left: 0, right: 20, top: 0, bottom: 10});
			c0.matches = jest.fn().mockReturnValue(true);
			c0.parentNode = container;
			const c1 = createChild({left: 0, right: 20, top: 10, bottom: 20});
			c1.insertAdjacentElement = jest.fn(
				() => ((container.childNodes = [c1, c0]), (c0.nextSibling = null), (c0.previousSibling = c1))
			);
			container.childNodes = [c0, c1];
			c0.nextSibling = c1;
			reorder(container, {onStart, onMove, onCancel});
			expect(container.addEventListener.mock.calls[3]).toEqual(['keydown', anyFunction]);

			const keydown = container.addEventListener.mock.calls[3][1];

			keydown({keyCode: 32, target: c0, preventDefault});
			expect(c0.matches.mock.calls).toEqual([['.draggable']]);
			expect(c0.classList.add.mock.calls).toEqual([['dragging']]);
			expect(onStart.mock.calls).toEqual([[c0, 0]]);
			expect(document.addEventListener.mock.calls).toEqual([['keydown', anyFunction, true]]);

			const documentKeyDown = document.addEventListener.mock.calls[0][1];

			documentKeyDown({keyCode: 40, preventDefault, stopPropagation});
			expect(c0.style.transform).toBe('translate(0px,10px)');
			expect(c1.style.transform).toBe('translate(0px,-10px)');

			// cancel while busy
			documentKeyDown({keyCode: 27, preventDefault, stopPropagation});
			jest.runOnlyPendingTimers();
			expect(c1.insertAdjacentElement.mock.calls).toEqual([['afterend', c0]]);

			jest.runOnlyPendingTimers();
			expect(c0.style.transform).toBe('');
			expect(c1.style.transform).toBe('');
			expect(c1.insertAdjacentElement.mock.calls).toEqual([
				['afterend', c0],
				['beforebegin', c0],
			]);
			expect(onMove.mock.calls).toEqual([[c0, 1]]);
			expect(onCancel.mock.calls).toEqual([[c0]]);
		});

		it('cancels move on escape when the element was not moved', () => {
			const onStart = jest.fn();
			const onCancel = jest.fn();
			const container = createContainer({});
			const c0 = createChild({left: 0, right: 20, top: 0, bottom: 10});
			c0.matches = jest.fn().mockReturnValue(true);
			c0.parentNode = container;
			const c1 = createChild({left: 0, right: 20, top: 10, bottom: 20});
			container.childNodes = [c0, c1];
			reorder(container, {onStart, onCancel});
			expect(container.addEventListener.mock.calls[3]).toEqual(['keydown', anyFunction]);

			const keydown = container.addEventListener.mock.calls[3][1];

			keydown({keyCode: 32, target: c0, preventDefault});
			expect(c0.matches.mock.calls).toEqual([['.draggable']]);
			expect(c0.classList.add.mock.calls).toEqual([['dragging']]);
			expect(onStart.mock.calls).toEqual([[c0, 0]]);
			expect(document.addEventListener.mock.calls).toEqual([['keydown', anyFunction, true]]);

			const documentKeyDown = document.addEventListener.mock.calls[0][1];

			documentKeyDown({keyCode: 27, preventDefault, stopPropagation});
			jest.runOnlyPendingTimers();
			expect(onCancel.mock.calls).toEqual([[c0]]);
		});

		it('ignores keydown for other keys', () => {
			const onFinish = jest.fn();
			const container = {parentNode: document.body, style: {}, addEventListener: jest.fn()};
			container.matches = jest.fn().mockReturnValue(false);
			reorder(container, {onFinish});
			expect(container.addEventListener.mock.calls[3]).toEqual(['keydown', anyFunction]);

			const keydown = container.addEventListener.mock.calls[3][1];

			keydown({keyCode: 13, target: container, preventDefault});
			expect(container.matches.mock.calls).toEqual([]);
			expect(onFinish.mock.calls).toEqual([]);
		});

		it('ignores keydown if no draggable is found', () => {
			const onFinish = jest.fn();
			const container = {parentNode: document.body, style: {}, addEventListener: jest.fn()};
			container.matches = jest.fn().mockReturnValue(false);
			reorder(container, {onFinish});
			expect(container.addEventListener.mock.calls[3]).toEqual(['keydown', anyFunction]);

			const keydown = container.addEventListener.mock.calls[3][1];

			keydown({keyCode: 32, target: container, preventDefault});
			expect(document.addEventListener.mock.calls).toEqual([]);
		});
	});

	describe('remove listeners', () => {
		it('removes listeners', () => {
			const container = createContainer({});
			const removeListeners = reorder(container, {});
			removeListeners();

			expect(container.addEventListener.mock.calls).toEqual([
				['pointerdown', anyFunction],
				['pointerup', anyFunction],
				['lostpointercapture', anyFunction],
				['keydown', anyFunction],
			]);
			expect(container.removeEventListener.mock.calls).toEqual(container.addEventListener.mock.calls);
		});
	});
});
