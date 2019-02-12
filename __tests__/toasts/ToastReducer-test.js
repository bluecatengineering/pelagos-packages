import reducer from '../../src/toasts/ToastReducer';
import ToastTypes from '../../src/ToastTypes';
import {removeToast, removeAllToasts, removeToastType} from '../../src/toasts/ToastActions';
import {hasFatalError} from '../../src/toasts/ToastFunctions';

jest.unmock('../../src/toasts/ToastReducer');
jest.unmock('../../src/toasts/ToastActions');

describe('ToastMessagesReducer', () => {
	describe('basic behaviour', () => {
		it('returns default state when state is undefined', () => {
			expect(reducer(undefined, {type: 'TEST'})).toEqual([]);
		});

		it('returns same state for unknown actions', () => {
			const state = {};
			expect(reducer(state, {type: 'TEST'})).toBe(state);
		});
	});

	describe('toast meta', () => {
		it('adds toasts when empty', () => {
			const toasts = [{text: 'zero'}, {text: 'one'}];
			expect(reducer([], {meta: {toasts}})).toEqual(toasts);
		});

		it('adds a toast when not empty', () => {
			const t0 = {text: 'zero'};
			const t1 = {text: 'one'};
			expect(reducer([t0], {meta: {toasts: [t1]}})).toEqual([t0, t1]);
		});

		it('ignores all toasts if an application error occurred', () => {
			const state = [{type: ToastTypes.FATAL}];
			hasFatalError.mockReturnValueOnce(true);
			expect(reducer(state, {meta: {toasts: [{}]}})).toBe(state);
			expect(hasFatalError.mock.calls).toEqual([[state]]);
		});

		it('discards oldest toast when there are 3 toasts', () => {
			const state = [{timerId: 100}, {timerId: 101}, {timerId: 102}];
			expect(reducer(state, {meta: {toasts: [{timerId: 103}]}})).toEqual([
				{timerId: 101},
				{timerId: 102},
				{timerId: 103},
			]);
			expect(clearTimeout.mock.calls).toEqual([[100]]);
		});

		it('removes all toasts if the type is application error', () => {
			const state = [{timerId: 100}, {timerId: 101}, {timerId: 102}];
			expect(reducer(state, {meta: {toasts: [{type: ToastTypes.FATAL}]}})).toEqual([{type: ToastTypes.FATAL}]);
			expect(clearTimeout.mock.calls).toEqual([[100], [101], [102]]);
			expect(setTimeout).not.toHaveBeenCalled();
		});

		it('removes all toasts of the same type if the type is link', () => {
			const state = [{timerId: 101}, {type: ToastTypes.ACTION}, {timerId: 102}];
			expect(reducer(state, {meta: {toasts: [{type: ToastTypes.ACTION}]}})).toEqual([
				{timerId: 101},
				{timerId: 102},
				{type: ToastTypes.ACTION},
			]);
			expect(clearTimeout).not.toHaveBeenCalled();
			expect(setTimeout).not.toHaveBeenCalled();
		});
	});

	describe('removeToast action', () => {
		it('removes the specified toast', () => {
			const state = [{timerId: 100}, {timerId: 101}];
			expect(reducer(state, removeToast(state[0]))).toEqual([{timerId: 101}]);
			expect(clearTimeout.mock.calls).toEqual([[100]]);
		});
	});

	describe('removeToastType action', () => {
		it('removes all toasts of the specified type', () => {
			const state = [{type: 'a', timerId: 100}, {type: 'b', timerId: 101}, {type: 'a', timerId: 102}];
			expect(reducer(state, removeToastType('a'))).toEqual([{type: 'b', timerId: 101}]);
			expect(clearTimeout.mock.calls).toEqual([[100], [102]]);
		});
	});

	describe('removeAllToasts action', () => {
		it('returns default state and clears timers', () => {
			const state = [{timerId: 5}];

			expect(reducer(state, removeAllToasts())).toEqual([]);
			expect(clearTimeout.mock.calls).toEqual([[5]]);
		});
	});
});
