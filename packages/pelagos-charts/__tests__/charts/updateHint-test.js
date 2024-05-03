import updateHint from '../../src/charts/updateHint';

jest.unmock('../../src/charts/updateHint');

describe('updateHint', () => {
	it('calls expected functions', () => {
		const setHintData = jest.fn();
		const ruler = {style: {}};
		updateHint(true, 30, 90, 400, 320, 50, 24, 400, 38, 262, setHintData, 'test-hint', ruler);
		expect(setHintData.mock.calls).toEqual([[{visible: true, style: {left: 40, top: 78}, content: 'test-hint'}]]);
		expect(ruler.style.opacity).toBe(1);
	});

	it('calls expected functions when mouse crosses thresholds', () => {
		const setHintData = jest.fn();
		const ruler = {style: {}};
		updateHint(true, 210, 140, 400, 320, 220, 24, 400, 38, 262, setHintData, 'test-hint', ruler);
		expect(setHintData.mock.calls).toEqual([[{visible: true, style: {right: 198, bottom: 168}, content: 'test-hint'}]]);
		expect(ruler.style.opacity).toBe(1);
	});

	it('calls expected functions when vertical is false', () => {
		const setHintData = jest.fn();
		const ruler = {style: {}};
		updateHint(false, 30, 90, 400, 320, 80, 24, 400, 38, 262, setHintData, 'test-hint', ruler);
		expect(setHintData.mock.calls).toEqual([[{visible: true, style: {left: 40, top: 78}, content: 'test-hint'}]]);
		expect(ruler.style.opacity).toBe(1);
	});

	it('calls expected functions when mouse is outside offset', () => {
		const setHintData = jest.fn();
		const ruler = {style: {}};
		updateHint(true, 20, 90, 400, 320, 50, 24, 400, 38, 262, setHintData, 'test-hint', ruler);
		expect(setHintData.mock.calls).toEqual([[expect.any(Function)]]);
		expect(ruler.style.opacity).toBe(0);

		expect(setHintData.mock.calls[0][0]({foo: 'test'})).toEqual({foo: 'test', visible: false});
	});
});
