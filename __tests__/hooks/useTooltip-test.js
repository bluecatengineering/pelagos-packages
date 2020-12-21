import useTooltip from '../../src/hooks/useTooltip';

jest.unmock('../../src/hooks/useTooltip');

const anyFunction = expect.any(Function);

const pause = jest.fn();
const play = jest.fn();
const animate = jest.fn().mockReturnValue({pause, play});
Element.prototype.animate = animate;
const elementBoundingRect = jest.spyOn(Element.prototype, 'getBoundingClientRect');

describe('useTooltip', () => {
	afterEach(() => {
		const tooltip = document.getElementById('tooltip');
		if (tooltip) {
			document.body.removeChild(tooltip);
		}
	});

	it('shows tooltip on mouse over and removes it on mouse leave', () => {
		const addEventListener = jest.fn();
		const setAttribute = jest.fn();
		const removeAttribute = jest.fn();
		const getBoundingClientRect = jest.fn().mockReturnValue({top: 100, left: 100, width: 200, height: 50});
		const tooltip = useTooltip('Test', 'top');
		elementBoundingRect.mockReturnValue({width: 20, height: 10});
		tooltip({addEventListener, setAttribute, removeAttribute, getBoundingClientRect});
		expect(addEventListener.mock.calls).toEqual([
			['mouseenter', anyFunction],
			['mouseleave', anyFunction],
			['focus', anyFunction],
			['blur', anyFunction],
		]);
		expect(animate.mock.calls).toEqual([
			[[{opacity: 0}, {opacity: 1}], {duration: 150, fill: 'both', easing: 'ease-out'}],
		]);
		const animation = animate.mock.results[0].value;
		expect(animation).toEqual({pause, play, onfinish: anyFunction});

		addEventListener.mock.calls[0][1]();
		animation.onfinish({currentTime: 150});
		expect(document.getElementById('tooltip')).toMatchSnapshot();
		expect(setAttribute.mock.calls).toEqual([['aria-describedby', 'tooltip']]);

		addEventListener.mock.calls[1][1]();
		expect(pause.mock.calls).toEqual([[], [], []]);
		expect(play.mock.calls).toEqual([[], []]);

		animation.onfinish({currentTime: 0});
		expect(removeAttribute.mock.calls).toEqual([['aria-describedby']]);
		expect(document.getElementById('tooltip')).toBeNull();
	});

	it('shows tooltip on mouse over when placement is bottom', () => {
		const addEventListener = jest.fn();
		const setAttribute = jest.fn();
		const getBoundingClientRect = jest.fn().mockReturnValue({top: 100, left: 100, width: 200, height: 50});
		const tooltip = useTooltip('Test', 'bottom');
		elementBoundingRect.mockReturnValue({width: 20, height: 10});
		tooltip({addEventListener, setAttribute, getBoundingClientRect});

		addEventListener.mock.calls[0][1]();
		expect(document.getElementById('tooltip')).toMatchSnapshot();
	});

	it('shows tooltip on mouse over when placement is left', () => {
		const addEventListener = jest.fn();
		const setAttribute = jest.fn();
		const getBoundingClientRect = jest.fn().mockReturnValue({top: 100, left: 100, width: 200, height: 50});
		const tooltip = useTooltip('Test', 'left');
		elementBoundingRect.mockReturnValue({width: 20, height: 10});
		tooltip({addEventListener, setAttribute, getBoundingClientRect});

		addEventListener.mock.calls[0][1]();
		expect(document.getElementById('tooltip')).toMatchSnapshot();
	});

	it('shows tooltip on mouse over when placement is right', () => {
		const addEventListener = jest.fn();
		const setAttribute = jest.fn();
		const getBoundingClientRect = jest.fn().mockReturnValue({top: 100, left: 100, width: 200, height: 50});
		const tooltip = useTooltip('Test', 'right');
		elementBoundingRect.mockReturnValue({width: 20, height: 10});
		tooltip({addEventListener, setAttribute, getBoundingClientRect});

		addEventListener.mock.calls[0][1]();
		expect(document.getElementById('tooltip')).toMatchSnapshot();
	});

	it('shows tooltip on mouse over when the tooltip position is negative', () => {
		const addEventListener = jest.fn();
		const setAttribute = jest.fn();
		const getBoundingClientRect = jest.fn().mockReturnValue({top: 100, left: 100, width: 200, height: 50});
		const tooltip = useTooltip('Test', 'top');
		elementBoundingRect.mockReturnValue({width: 800, height: 10});
		tooltip({addEventListener, setAttribute, getBoundingClientRect});

		addEventListener.mock.calls[0][1]();
		expect(document.getElementById('tooltip')).toMatchSnapshot();
	});

	it('shows tooltip on mouse over when the tooltip position exceeds the window width', () => {
		const addEventListener = jest.fn();
		const setAttribute = jest.fn();
		const getBoundingClientRect = jest.fn().mockReturnValue({top: 100, left: 700, width: 200, height: 50});
		const tooltip = useTooltip('Test', 'top');
		elementBoundingRect.mockReturnValue({width: 800, height: 10});
		tooltip({addEventListener, setAttribute, getBoundingClientRect});

		addEventListener.mock.calls[0][1]();
		expect(document.getElementById('tooltip')).toMatchSnapshot();
	});

	it('does not show tooltip on mouse over if text is null', () => {
		const addEventListener = jest.fn();
		const tooltip = useTooltip(null, 'top');
		tooltip({addEventListener});

		addEventListener.mock.calls[0][1]();
		expect(document.getElementById('tooltip')).toBeNull();
	});

	it('removes listeners from previous target when target changes', () => {
		const addEventListener = jest.fn();
		const removeEventListener = jest.fn();
		const tooltip = useTooltip('Test', 'top');
		tooltip({addEventListener, removeEventListener});
		expect(addEventListener.mock.calls).toEqual([
			['mouseenter', anyFunction],
			['mouseleave', anyFunction],
			['focus', anyFunction],
			['blur', anyFunction],
		]);

		tooltip(null);
		expect(addEventListener.mock.calls).toEqual(addEventListener.mock.calls);
	});

	it('does not remove tooltip if not in the DOM', () => {
		const addEventListener = jest.fn();
		const tooltip = useTooltip('Test', 'top');
		tooltip({addEventListener});
		addEventListener.mock.calls[1][1]();
		expect(setTimeout).not.toHaveBeenCalled();
	});
});
