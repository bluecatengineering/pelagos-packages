import useButtonKeyHandler from '../../src/hooks/useButtonKeyHandler';

jest.unmock('../../src/hooks/useButtonKeyHandler');

describe('useButtonKeyHandler', () => {
	it('calls onClick when enter is pressed', () => {
		const click = jest.fn();
		const event = {
			keyCode: 13,
			target: {click},
			preventDefault: jest.fn(),
			nativeEvent: {stopImmediatePropagation: jest.fn()},
		};
		useButtonKeyHandler()(event);
		expect(click.mock.calls).toEqual([[]]);
		expect(event.preventDefault).toHaveBeenCalled();
		expect(event.nativeEvent.stopImmediatePropagation).toHaveBeenCalled();
	});

	it('calls onClick when space is pressed', () => {
		const click = jest.fn();
		const event = {
			keyCode: 32,
			target: {click},
			preventDefault: jest.fn(),
			nativeEvent: {stopImmediatePropagation: jest.fn()},
		};
		useButtonKeyHandler()(event);
		expect(click.mock.calls).toEqual([[]]);
		expect(event.preventDefault).toHaveBeenCalled();
		expect(event.nativeEvent.stopImmediatePropagation).toHaveBeenCalled();
	});

	it('does not call onClick when any other key is pressed', () => {
		const event = {keyCode: 65, preventDefault: jest.fn()};
		useButtonKeyHandler()(event);
		expect(event.preventDefault).not.toHaveBeenCalled();
	});

	it('does not call onClick when any modifier is set', () => {
		const preventDefault = jest.fn();

		useButtonKeyHandler()({keyCode: 13, shiftKey: true, preventDefault});
		useButtonKeyHandler()({keyCode: 13, ctrlKey: true, preventDefault});
		useButtonKeyHandler()({keyCode: 13, altKey: true, preventDefault});
		useButtonKeyHandler()({keyCode: 13, metaKey: true, preventDefault});

		expect(preventDefault).not.toHaveBeenCalled();
	});
});
