import {
	SHORT_DURATION,
	DEFAULT_DURATION,
	hasFatalError,
	registerActionToast,
	toaster,
} from '../../src/toasts/ToastFunctions';
import {addToast, removeToast} from '../../src/toasts/ToastActions';
import ToastTypes from '../../src/ToastTypes';

jest.unmock('../../src/toasts/ToastFunctions');
jest.unmock('../../src/toasts/ToastActions');

describe('ToastFunctions', () => {
	describe('hasFatalError', () => {
		it("returns true if there's a fatal error", () => {
			expect(hasFatalError([{type: ToastTypes.FATAL}])).toBeTruthy();
		});

		it("returns false if there's not a fatal error", () => {
			expect(hasFatalError([{type: ToastTypes.ACTION}])).toBeFalsy();
		});
	});

	describe('toaster', () => {
		const actionType = 'TEST';
		const text = 'This is a test';
		const other = 'This is another test';
		const actionTypeFn = 'TEST_FN';
		const actionTypeGet = 'TEST_GET';

		beforeAll(() => {
			registerActionToast(actionType, text, ToastTypes.INFO);
			registerActionToast(actionType, other, ToastTypes.INFO);
			registerActionToast(actionTypeFn, ({payload}) => payload + ' is a test');
			registerActionToast(actionTypeGet, {
				toast: ({payload}) => (payload ? {text: payload + ' is a getter test', type: ToastTypes.ERROR} : null),
			});
		});

		it('sets a toast meta for addToast actions', () => {
			const dispatch = jest.fn();
			const next = jest.fn();
			const action = addToast(ToastTypes.INFO, text);
			const toast = {type: ToastTypes.INFO, text, timerId: 1};
			toaster({dispatch})(next)(action);
			expect(action.meta).toEqual({toasts: [toast]});
			expect(next.mock.calls).toEqual([[action]]);
			expect(dispatch).not.toHaveBeenCalled();
			expect(setTimeout.mock.calls).toEqual([[expect.any(Function), DEFAULT_DURATION]]);

			jest.runOnlyPendingTimers();
			expect(dispatch.mock.calls).toEqual([[removeToast(toast)]]);
		});

		it('uses short duration for successful actions', () => {
			const dispatch = jest.fn();
			const next = jest.fn();
			const action = addToast(ToastTypes.SUCCESS, text);
			const toast = {type: ToastTypes.SUCCESS, text, timerId: 1};
			setTimeout.mockReturnValue(1);
			toaster({dispatch})(next)(action);
			expect(action.meta).toEqual({toasts: [toast]});
			expect(next.mock.calls).toEqual([[action]]);
			expect(dispatch).not.toHaveBeenCalled();
			expect(setTimeout.mock.calls).toEqual([[expect.any(Function), SHORT_DURATION]]);
		});

		it("sets a toast meta if there's a registered action", () => {
			const dispatch = jest.fn();
			const next = jest.fn();
			const action = {type: actionType, meta: {foo: 'test'}};
			setTimeout.mockReturnValue(1);
			toaster({dispatch})(next)(action);
			expect(action.meta).toEqual({
				foo: 'test',
				toasts: [
					{type: ToastTypes.INFO, text, timerId: 1},
					{type: ToastTypes.INFO, text: other, timerId: 1},
				],
			});
			expect(next.mock.calls).toEqual([[action]]);
			expect(dispatch).not.toHaveBeenCalled();
		});

		it("sets a toast meta with the result of executing text if there's a registered action and text is a function", () => {
			const dispatch = jest.fn();
			const next = jest.fn();
			const action = {type: actionTypeFn, payload: 'That'};
			toaster({dispatch})(next)(action);
			expect(action.meta).toEqual({
				toasts: [{type: ToastTypes.FATAL, text: 'That is a test'}],
			});
			expect(next.mock.calls).toEqual([[action]]);
			expect(dispatch).not.toHaveBeenCalled();
		});

		it("sets a toast meta with the result of executing toast if there's a registered action and toast is provided", () => {
			const dispatch = jest.fn();
			const next = jest.fn();
			const action = {type: actionTypeGet, payload: 'That'};
			setTimeout.mockReturnValue(1);
			toaster({dispatch})(next)(action);
			expect(action.meta).toEqual({
				toasts: [{type: ToastTypes.ERROR, text: 'That is a getter test', timerId: 1}],
			});
			expect(next.mock.calls).toEqual([[action]]);
			expect(dispatch).not.toHaveBeenCalled();
		});

		it("doesn't set a toast meta if there's no registered action", () => {
			const dispatch = jest.fn();
			const next = jest.fn();
			const action = {type: 'OTHER'};
			toaster({dispatch})(next)(action);
			expect(action.meta).not.toBeDefined();
			expect(next.mock.calls).toEqual([[action]]);
			expect(dispatch).not.toHaveBeenCalled();
		});

		it("doesn't start a timer if the type is application error", () => {
			const dispatch = jest.fn();
			const next = jest.fn();
			const action = addToast(ToastTypes.FATAL, text);
			const toast = {type: ToastTypes.FATAL, text};
			toaster({dispatch})(next)(action);
			expect(action.meta).toEqual({toasts: [toast]});
			expect(next.mock.calls).toEqual([[action]]);
			expect(dispatch).not.toHaveBeenCalled();
			expect(setTimeout).not.toHaveBeenCalled();
		});

		it("doesn't start a timer if the type is link", () => {
			const dispatch = jest.fn();
			const next = jest.fn();
			const action = addToast(ToastTypes.ACTION, text);
			const toast = {type: ToastTypes.ACTION, text};
			toaster({dispatch})(next)(action);
			expect(action.meta).toEqual({toasts: [toast]});
			expect(next.mock.calls).toEqual([[action]]);
			expect(dispatch).not.toHaveBeenCalled();
			expect(setTimeout).not.toHaveBeenCalled();
		});

		it("doesn't set a toast meta if there's a registered action and toast is provided but it returns null", () => {
			const dispatch = jest.fn();
			const next = jest.fn();
			const action = {type: actionTypeGet, payload: null};
			setTimeout.mockReturnValue(1);
			toaster({dispatch})(next)(action);
			expect(action.meta).toBeUndefined();
			expect(next.mock.calls).toEqual([[action]]);
			expect(dispatch).not.toHaveBeenCalled();
		});
	});
});
