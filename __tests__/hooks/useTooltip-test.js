import useTooltip from '../../src/hooks/useTooltip';

jest.unmock('../../src/hooks/useTooltip');

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
		jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({width: 20, height: 10});
		tooltip({addEventListener, setAttribute, removeAttribute, getBoundingClientRect});
		expect(addEventListener.mock.calls).toEqual([
			['mouseenter', expect.any(Function)],
			['mouseleave', expect.any(Function)],
			['focus', expect.any(Function)],
			['blur', expect.any(Function)],
		]);

		addEventListener.mock.calls[0][1]();
		expect(document.getElementById('tooltip')).toMatchSnapshot();
		expect(setAttribute.mock.calls).toEqual([['aria-describedby', 'tooltip']]);

		addEventListener.mock.calls[1][1]();
		jest.runOnlyPendingTimers();
		expect(removeAttribute.mock.calls).toEqual([['aria-describedby']]);
		expect(document.getElementById('tooltip')).toBeNull();
	});

	it('shows tooltip on mouse over when placement is bottom', () => {
		const addEventListener = jest.fn();
		const setAttribute = jest.fn();
		const getBoundingClientRect = jest.fn().mockReturnValue({top: 100, left: 100, width: 200, height: 50});
		const tooltip = useTooltip('Test', 'bottom');
		jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({width: 20, height: 10});
		tooltip({addEventListener, setAttribute, getBoundingClientRect});

		addEventListener.mock.calls[0][1]();
		expect(document.getElementById('tooltip')).toMatchSnapshot();
	});

	it('shows tooltip on mouse over when placement is left', () => {
		const addEventListener = jest.fn();
		const setAttribute = jest.fn();
		const getBoundingClientRect = jest.fn().mockReturnValue({top: 100, left: 100, width: 200, height: 50});
		const tooltip = useTooltip('Test', 'left');
		jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({width: 20, height: 10});
		tooltip({addEventListener, setAttribute, getBoundingClientRect});

		addEventListener.mock.calls[0][1]();
		expect(document.getElementById('tooltip')).toMatchSnapshot();
	});

	it('shows tooltip on mouse over when placement is right', () => {
		const addEventListener = jest.fn();
		const setAttribute = jest.fn();
		const getBoundingClientRect = jest.fn().mockReturnValue({top: 100, left: 100, width: 200, height: 50});
		const tooltip = useTooltip('Test', 'right');
		jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({width: 20, height: 10});
		tooltip({addEventListener, setAttribute, getBoundingClientRect});

		addEventListener.mock.calls[0][1]();
		expect(document.getElementById('tooltip')).toMatchSnapshot();
	});

	it('shows tooltip on mouse over when the tooltip position is negative', () => {
		const addEventListener = jest.fn();
		const setAttribute = jest.fn();
		const getBoundingClientRect = jest.fn().mockReturnValue({top: 100, left: 100, width: 200, height: 50});
		const tooltip = useTooltip('Test', 'top');
		jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({width: 800, height: 10});
		tooltip({addEventListener, setAttribute, getBoundingClientRect});

		addEventListener.mock.calls[0][1]();
		expect(document.getElementById('tooltip')).toMatchSnapshot();
	});

	it('shows tooltip on mouse over when the tooltip position exceeds the window width', () => {
		const addEventListener = jest.fn();
		const setAttribute = jest.fn();
		const getBoundingClientRect = jest.fn().mockReturnValue({top: 100, left: 700, width: 200, height: 50});
		const tooltip = useTooltip('Test', 'top');
		jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({width: 800, height: 10});
		tooltip({addEventListener, setAttribute, getBoundingClientRect});

		addEventListener.mock.calls[0][1]();
		expect(document.getElementById('tooltip')).toMatchSnapshot();
	});

	it('clears existing timer on mouse over', () => {
		const addEventListener = jest.fn();
		const setAttribute = jest.fn();
		const removeAttribute = jest.fn();
		const getBoundingClientRect = jest.fn().mockReturnValue({top: 100, left: 100, width: 200, height: 50});
		const tooltip = useTooltip('Test', 'top');
		setTimeout.mockReturnValue(1);
		tooltip({addEventListener, setAttribute, removeAttribute, getBoundingClientRect});

		addEventListener.mock.calls[0][1]();
		addEventListener.mock.calls[1][1]();
		addEventListener.mock.calls[0][1]();
		expect(clearTimeout.mock.calls).toEqual([[1]]);
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
			['mouseenter', expect.any(Function)],
			['mouseleave', expect.any(Function)],
			['focus', expect.any(Function)],
			['blur', expect.any(Function)],
		]);

		tooltip(null);
		expect(addEventListener.mock.calls).toEqual(addEventListener.mock.calls);
	});

	it('removes tooltip when target changes', () => {
		const addEventListener = jest.fn();
		const setAttribute = jest.fn();
		const removeAttribute = jest.fn();
		const getBoundingClientRect = jest.fn().mockReturnValue({top: 100, left: 100, width: 200, height: 50});
		const removeEventListener = jest.fn();
		const tooltip = useTooltip('Test', 'top');
		tooltip({addEventListener, removeEventListener, setAttribute, removeAttribute, getBoundingClientRect});
		addEventListener.mock.calls[0][1]();
		addEventListener.mock.calls[1][1]();
		expect(document.getElementById('tooltip')).not.toBeNull();

		tooltip(null);
		expect(document.getElementById('tooltip')).toBeNull();
		expect(clearTimeout).toHaveBeenCalledTimes(1);
	});

	it('does not remove tooltip if not in the DOM', () => {
		const addEventListener = jest.fn();
		const tooltip = useTooltip('Test', 'top');
		tooltip({addEventListener});
		addEventListener.mock.calls[1][1]();
		expect(setTimeout).not.toHaveBeenCalled();
	});
});
