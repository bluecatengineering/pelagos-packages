import useButtonKeyHandler from '../../src/hooks/useButtonKeyHandler';

jest.unmock('../../src/hooks/useButtonKeyHandler');

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useCallback: fn => fn,
}));

describe('useButtonKeyHandler', () => {
	it('calls onClick when enter is pressed', () => {
		const onClick = jest.fn();
		const event = {keyCode: 13, preventDefault: jest.fn()};
		useButtonKeyHandler(onClick)(event);
		expect(onClick.mock.calls).toEqual([[event]]);
		expect(event.preventDefault).toHaveBeenCalled();
	});

	it('calls onClick when space is pressed', () => {
		const onClick = jest.fn();
		const event = {keyCode: 32, preventDefault: jest.fn()};
		useButtonKeyHandler(onClick)(event);
		expect(onClick.mock.calls).toEqual([[event]]);
		expect(event.preventDefault).toHaveBeenCalled();
	});

	it('does not call onClick when any other key is pressed', () => {
		const onClick = jest.fn();
		const event = {keyCode: 65, preventDefault: jest.fn()};
		useButtonKeyHandler(onClick)(event);
		expect(onClick).not.toHaveBeenCalled();
		expect(event.preventDefault).not.toHaveBeenCalled();
	});

	it('does not call onClick when any modifier is set', () => {
		const onClick = jest.fn();
		const preventDefault = jest.fn();

		useButtonKeyHandler(onClick)({keyCode: 13, shiftKey: true, preventDefault});
		useButtonKeyHandler(onClick)({keyCode: 13, ctrlKey: true, preventDefault});
		useButtonKeyHandler(onClick)({keyCode: 13, altKey: true, preventDefault});
		useButtonKeyHandler(onClick)({keyCode: 13, metaKey: true, preventDefault});

		expect(onClick).not.toHaveBeenCalled();
		expect(preventDefault).not.toHaveBeenCalled();
	});
});
