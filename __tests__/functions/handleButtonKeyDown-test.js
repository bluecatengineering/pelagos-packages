import handleButtonKeyDown from '../../src/functions/handleButtonKeyDown';

jest.unmock('../../src/functions/handleButtonKeyDown');

describe('handleButtonKeyDown', () => {
	it('calls onClick when enter is pressed', () => {
		const click = jest.fn();
		const event = {
			keyCode: 13,
			target: {click},
			preventDefault: jest.fn(),
			nativeEvent: {stopImmediatePropagation: jest.fn()},
		};
		handleButtonKeyDown(event);
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
		handleButtonKeyDown(event);
		expect(click.mock.calls).toEqual([[]]);
		expect(event.preventDefault).toHaveBeenCalled();
		expect(event.nativeEvent.stopImmediatePropagation).toHaveBeenCalled();
	});

	it('does not call onClick when any other key is pressed', () => {
		const event = {keyCode: 65, preventDefault: jest.fn()};
		handleButtonKeyDown(event);
		expect(event.preventDefault).not.toHaveBeenCalled();
	});

	it('does not call onClick when any modifier is set', () => {
		const preventDefault = jest.fn();

		handleButtonKeyDown({keyCode: 13, shiftKey: true, preventDefault});
		handleButtonKeyDown({keyCode: 13, ctrlKey: true, preventDefault});
		handleButtonKeyDown({keyCode: 13, altKey: true, preventDefault});
		handleButtonKeyDown({keyCode: 13, metaKey: true, preventDefault});

		expect(preventDefault).not.toHaveBeenCalled();
	});
});
