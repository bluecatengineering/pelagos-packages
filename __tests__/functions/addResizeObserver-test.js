jest.unmock('../../src/functions/addResizeObserver');

describe('addResizeObserver', () => {
	beforeEach(() => jest.resetModules());

	it('uses ResizeObserver if available', () => {
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

	it('uses resize events if ResizeObserver is not available', () => {
		const rect = {test: 'foo'};
		const target = {getBoundingClientRect: jest.fn().mockReturnValue(rect)};
		const callback = jest.fn();
		const throttle = Object.assign(jest.fn(), {cancel: jest.fn()});
		global.ResizeObserver = null;
		global.addEventListener = jest.fn();
		global.removeEventListener = jest.fn();
		const {default: addResizeObserver} = require('../../src/functions/addResizeObserver');
		const {default: throttleAF} = require('../../src/functions/throttleAF');

		throttleAF.mockReturnValue(throttle);
		const remove = addResizeObserver(target, callback);
		expect(remove).toEqual(expect.any(Function));
		expect(throttleAF.mock.calls).toEqual([[expect.any(Function)]]);
		expect(addEventListener.mock.calls).toEqual([['resize', expect.any(Function)]]);

		throttleAF.mock.calls[0][0]();
		expect(callback.mock.calls).toEqual([[rect]]);

		remove();
		expect(throttle.cancel).toHaveBeenCalledTimes(1);
		expect(removeEventListener.mock.calls).toEqual([['resize', expect.any(Function)]]);
	});
});
