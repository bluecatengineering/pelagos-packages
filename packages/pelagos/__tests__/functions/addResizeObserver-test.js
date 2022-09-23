jest.unmock('../../src/functions/addResizeObserver');

describe('addResizeObserver', () => {
	it('uses ResizeObserver', () => {
		const target = {};
		const callback = jest.fn();
		const observer = {observe: jest.fn(), disconnect: jest.fn()};
		const throttle = Object.assign(jest.fn(), {cancel: jest.fn()});
		global.ResizeObserver = jest.fn(() => observer);
		const {default: addResizeObserver} = require('../../src/functions/addResizeObserver');
		const {default: throttleAF} = require('../../src/functions/throttleAF');

		throttleAF.mockReturnValue(throttle);
		const remove = addResizeObserver(target, callback);
		expect(remove).toEqual(expect.any(Function));
		expect(throttleAF.mock.calls).toEqual([[expect.any(Function)]]);
		expect(ResizeObserver.mock.calls).toEqual([[expect.any(Function)]]);
		expect(observer.observe.mock.calls).toEqual([[target]]);

		const contentRect = {test: 'foo'};
		ResizeObserver.mock.calls[0][0]([{contentRect: {test: 'bar'}}]);
		ResizeObserver.mock.calls[0][0]([{contentRect}]);
		throttleAF.mock.calls[0][0]();
		expect(callback.mock.calls).toEqual([[contentRect]]);

		remove();
		expect(throttle.cancel).toHaveBeenCalledTimes(1);
		expect(observer.disconnect).toHaveBeenCalledTimes(1);
	});
});
