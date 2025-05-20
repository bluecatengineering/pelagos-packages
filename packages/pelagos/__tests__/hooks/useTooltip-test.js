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
		useTooltipBase.mockReturnValue([show, hide]);
		const tooltip = useTooltip('Test', 'top');
		tooltip(element);
		expect(addEventListener.mock.calls).toEqual([
			['mouseenter', anyFunction],
			['mouseleave', hide],
			['focus', anyFunction],
			['blur', hide],
			['keydown', anyFunction],
		]);

		addEventListener.mock.calls[0][1]();
		expect(show.mock.calls).toEqual([['Test', 'top', element]]);
	});

	it('shows tooltip on mouse over when aria is set', () => {
		const addEventListener = jest.fn();
		const show = jest.fn();
		const hide = jest.fn();
		const element = {addEventListener};
		useTooltipBase.mockReturnValue([show, hide]);
		const tooltip = useTooltip('Test', 'top', 'labelledby');
		tooltip(element);
		expect(addEventListener.mock.calls).toEqual([
			['mouseenter', anyFunction],
			['mouseleave', hide],
			['focus', anyFunction],
			['blur', hide],
			['keydown', anyFunction],
		]);

		addEventListener.mock.calls[0][1]();
		expect(show.mock.calls).toEqual([['Test', 'top', element, 'labelledby']]);
	});

	it('hides tooltip when escape is pressed', () => {
		const addEventListener = jest.fn();
		const show = jest.fn();
		const hide = jest.fn();
		const element = {addEventListener};
		useTooltipBase.mockReturnValue([show, hide]);
		const tooltip = useTooltip('Test', 'top', 'labelledby');
		tooltip(element);
		expect(addEventListener.mock.calls).toEqual([
			['mouseenter', anyFunction],
			['mouseleave', hide],
			['focus', anyFunction],
			['blur', hide],
			['keydown', anyFunction],
		]);

		addEventListener.mock.calls[4][1]({key: 'Escape'});
		addEventListener.mock.calls[4][1]({key: 'Other'});
		expect(hide.mock.calls).toEqual([[]]);
	});

	it('removes listeners from previous target when target changes', () => {
		const addEventListener = jest.fn();
		const removeEventListener = jest.fn();
		const show = jest.fn();
		const hide = jest.fn();
		useTooltipBase.mockReturnValue([show, hide]);
		const tooltip = useTooltip('Test', 'top');
		tooltip({addEventListener, removeEventListener});
		expect(addEventListener.mock.calls).toEqual([
			['mouseenter', anyFunction],
			['mouseleave', hide],
			['focus', anyFunction],
			['blur', hide],
			['keydown', anyFunction],
		]);

		tooltip(null);
		expect(addEventListener.mock.calls).toEqual(addEventListener.mock.calls);
	});
});
