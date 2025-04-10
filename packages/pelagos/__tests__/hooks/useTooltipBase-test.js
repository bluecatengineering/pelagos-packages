import useTooltipBase from '../../src/hooks/useTooltipBase';

jest.unmock('../../src/hooks/useTooltipBase');

const anyFunction = expect.any(Function);

const pause = jest.fn();
const play = jest.fn();
const updatePlaybackRate = jest.fn();
const animate = jest.fn().mockReturnValue({pause, play, updatePlaybackRate});
const elementBoundingRect = jest.fn();
const setProperty = jest.fn();
const baseElement = {
	animate,
	getBoundingClientRect: elementBoundingRect,
};
const createElement = jest.fn(() => {
	const element = Object.create(baseElement);
	element.style = {setProperty};
	return element;
});
const appendChild = jest.fn();
const removeChild = jest.fn();
global.document = {createElement, body: {appendChild, removeChild}};
global.window = {innerWidth: 1024, innerHeight: 768};

jest.spyOn(Math, 'random').mockReturnValue(0.1);

describe('useTooltipBase', () => {
	describe('show', () => {
		it('shows tooltip', () => {
			const setAttribute = jest.fn();
			const removeAttribute = jest.fn();
			const getBoundingClientRect = jest.fn().mockReturnValue({top: 100, left: 100, width: 200, height: 50});
			const [show, hide] = useTooltipBase();
			elementBoundingRect.mockReturnValue({width: 20, height: 10});
			expect(animate.mock.calls).toEqual([
				[[{opacity: 0}, {opacity: 1}], {duration: 150, fill: 'both', easing: 'ease-out'}],
			]);
			const animation = animate.mock.results[0].value;
			expect(animation).toEqual({pause, play, updatePlaybackRate, onfinish: anyFunction});

			const tooltipDiv = createElement.mock.results[0].value;
			show('Test', 'top', {setAttribute, removeAttribute, getBoundingClientRect});
			animation.onfinish({currentTime: 150});
			expect(tooltipDiv).toMatchSnapshot();
			expect(setAttribute.mock.calls).toEqual([['aria-describedby', 'tooltip-1']]);

			tooltipDiv.parentNode = document.body;
			hide();
			expect(pause.mock.calls).toEqual([[], [], []]);
			expect(play.mock.calls).toEqual([[], []]);
			expect(updatePlaybackRate.mock.calls).toEqual([[1], [-1]]);

			animation.onfinish({currentTime: 0});
			expect(removeAttribute.mock.calls).toEqual([['aria-describedby']]);
			expect(removeChild.mock.calls).toEqual([[tooltipDiv]]);
		});

		it('shows tooltip on mouse over when placement is bottom', () => {
			const setAttribute = jest.fn();
			const getBoundingClientRect = jest.fn().mockReturnValue({top: 100, left: 100, width: 200, height: 50});
			const [show] = useTooltipBase();
			elementBoundingRect.mockReturnValue({width: 20, height: 10});

			show('Test', 'bottom', {setAttribute, getBoundingClientRect});
			expect(createElement.mock.results[0].value).toMatchSnapshot();
		});

		it('shows tooltip on mouse over when placement is left', () => {
			const setAttribute = jest.fn();
			const getBoundingClientRect = jest.fn().mockReturnValue({top: 100, left: 100, width: 200, height: 50});
			const [show] = useTooltipBase();
			elementBoundingRect.mockReturnValue({width: 20, height: 10});

			show('Test', 'left', {setAttribute, getBoundingClientRect});
			expect(createElement.mock.results[0].value).toMatchSnapshot();
		});

		it('shows tooltip on mouse over when placement is right', () => {
			const setAttribute = jest.fn();
			const getBoundingClientRect = jest.fn().mockReturnValue({top: 100, left: 100, width: 200, height: 50});
			const [show] = useTooltipBase();
			elementBoundingRect.mockReturnValue({width: 20, height: 10});

			show('Test', 'right', {setAttribute, getBoundingClientRect});
			expect(createElement.mock.results[0].value).toMatchSnapshot();
		});

		it('shows tooltip on mouse over when the tooltip position is negative', () => {
			const setAttribute = jest.fn();
			const getBoundingClientRect = jest.fn().mockReturnValue({top: 100, left: 100, width: 200, height: 50});
			const [show] = useTooltipBase();
			elementBoundingRect.mockReturnValue({width: 800, height: 10});

			show('Test', 'top', {setAttribute, getBoundingClientRect});
			expect(createElement.mock.results[0].value).toMatchSnapshot();
		});

		it('shows tooltip on mouse over when the tooltip position exceeds the window width', () => {
			const setAttribute = jest.fn();
			const getBoundingClientRect = jest.fn().mockReturnValue({top: 100, left: 700, width: 200, height: 50});
			const [show] = useTooltipBase();
			elementBoundingRect.mockReturnValue({width: 800, height: 10});

			show('Test', 'top', {setAttribute, getBoundingClientRect});
			expect(createElement.mock.results[0].value).toMatchSnapshot();
		});

		it('shows tooltip when aria is labelledby', () => {
			const setAttribute = jest.fn();
			const removeAttribute = jest.fn();
			const getBoundingClientRect = jest.fn().mockReturnValue({top: 100, left: 100, width: 200, height: 50});
			const [show, hide] = useTooltipBase();
			elementBoundingRect.mockReturnValue({width: 20, height: 10});

			show('Test', 'top', {setAttribute, removeAttribute, getBoundingClientRect}, 'labelledby');
			createElement.mock.results[0].value.parentNode = document.body;
			hide();
			expect(setAttribute.mock.calls).toEqual([['aria-labelledby', 'tooltip-1']]);
			expect(removeAttribute.mock.calls).toEqual([['aria-labelledby']]);
		});

		it('does not show tooltip on mouse over if text is null', () => {
			const [show] = useTooltipBase();

			show(null, 'top', {});
			expect(document.body.appendChild).not.toHaveBeenCalled();
		});
	});

	describe('hide', () => {
		it('does not remove tooltip if not in the DOM', () => {
			jest.spyOn(global, 'setTimeout');
			const [, hide] = useTooltipBase();
			hide();
			expect(setTimeout).not.toHaveBeenCalled();
		});
	});
});
