import {addToast} from '../../src/toasts/ToastActions';

jest.unmock('../../src/toasts/ToastActions');

describe('ToastActions', () => {
	describe('addToast', () => {
		it('creates a toast message', () => {
			const type = 'test';
			const text = 'This is a test';
			const onClick = jest.fn();
			expect(addToast(type, text, onClick).payload).toEqual({type, text, onClick});
		});
	});
});
