import useTooltip from '../../src/hooks/useTooltip';
import useTooltipBase from '../../src/hooks/useTooltipBase';

jest.unmock('../../src/hooks/useTooltip');

const anyFunction = expect.any(Function);

describe('useTooltip', () => {
	it('shows tooltip on mouse over and removes it on mouse leave', () => {
		const addEventListener = jest.fn();
		const show = jest.fn();
		const hide = jest.fn();
		const element = {addEventListener};
		const tooltipElement = {addEventListener};
		useTooltipBase.mockReturnValue([show, hide, tooltipElement]);
		const tooltip = useTooltip('Test', 'top');
		tooltip(element);
		expect(addEventListener.mock.calls).toEqual([
			['mouseenter', anyFunction],
			['mouseleave', anyFunction],
			['mouseenter', anyFunction],
			['mouseleave', anyFunction],
			['focus', anyFunction],
			['blur', hide],
			['keydown', anyFunction],
		]);

		addEventListener.mock.calls[0][1]({});
		addEventListener.mock.calls[0][1]({relatedTarget: tooltipElement});
		addEventListener.mock.calls[0][1]({relatedTarget: element});
		expect(show.mock.calls).toEqual([['Test', 'top', element]]);

		addEventListener.mock.calls[1][1]({});
		addEventListener.mock.calls[1][1]({relatedTarget: tooltipElement});
		addEventListener.mock.calls[1][1]({relatedTarget: element});
		expect(hide.mock.calls).toEqual([[]]);
	});

	it('shows tooltip on mouse over when aria is set', () => {
		const addEventListener = jest.fn();
		const show = jest.fn();
		const hide = jest.fn();
		const element = {addEventListener};
		const tooltipElement = {addEventListener};
		useTooltipBase.mockReturnValue([show, hide, tooltipElement]);
		const tooltip = useTooltip('Test', 'top', 'labelledby');
		tooltip(element);
		expect(addEventListener.mock.calls).toEqual([
			['mouseenter', anyFunction],
			['mouseleave', anyFunction],
			['mouseenter', anyFunction],
			['mouseleave', anyFunction],
			['focus', anyFunction],
			['blur', hide],
			['keydown', anyFunction],
		]);

		addEventListener.mock.calls[0][1]({});
		expect(show.mock.calls).toEqual([['Test', 'top', element, 'labelledby']]);
	});

	it('hides tooltip when escape is pressed', () => {
		const addEventListener = jest.fn();
		const show = jest.fn();
		const hide = jest.fn();
		const element = {addEventListener};
		const tooltipElement = {addEventListener};
		useTooltipBase.mockReturnValue([show, hide, tooltipElement]);
		const tooltip = useTooltip('Test', 'top', 'labelledby');
		tooltip(element);
		expect(addEventListener.mock.calls).toEqual([
			['mouseenter', anyFunction],
			['mouseleave', anyFunction],
			['mouseenter', anyFunction],
			['mouseleave', anyFunction],
			['focus', anyFunction],
			['blur', hide],
			['keydown', anyFunction],
		]);

		addEventListener.mock.calls[6][1]({key: 'Escape'});
		addEventListener.mock.calls[6][1]({key: 'Other'});
		expect(hide.mock.calls).toEqual([[]]);
	});

	it('removes listeners from previous target when target changes', () => {
		const addEventListener = jest.fn();
		const removeEventListener = jest.fn();
		const show = jest.fn();
		const hide = jest.fn();
		useTooltipBase.mockReturnValue([show, hide, {addEventListener, removeEventListener}]);
		const tooltip = useTooltip('Test', 'top');
		tooltip({addEventListener, removeEventListener});
		expect(addEventListener.mock.calls).toEqual([
			['mouseenter', anyFunction],
			['mouseleave', anyFunction],
			['mouseenter', anyFunction],
			['mouseleave', anyFunction],
			['focus', anyFunction],
			['blur', hide],
			['keydown', anyFunction],
		]);

		tooltip(null);
		expect(addEventListener.mock.calls).toEqual(addEventListener.mock.calls);
	});
});
