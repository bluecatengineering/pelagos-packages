import reducer from '../../src/toasts/ToastReducer';
import ToastTypes from '../../src/toasts/ToastTypes';
import {removeToast, removeAllToasts, removeToastType} from '../../src/toasts/ToastActions';
import {hasFatalError} from '../../src/toasts/ToastFunctions';

jest.unmock('../../src/toasts/ToastReducer');
jest.unmock('../../src/toasts/ToastActions');

describe('ToastReducer', () => {
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
			const state = [{id: '100'}, {id: '101'}, {id: '102'}];
			expect(reducer(state, {meta: {toasts: [{id: '103'}]}})).toEqual([{id: '101'}, {id: '102'}, {id: '103'}]);
		});

		it('removes all toasts if the type is fatal', () => {
			const state = [{id: '100'}, {id: '101'}, {id: '102'}];
			expect(reducer(state, {meta: {toasts: [{type: ToastTypes.FATAL}]}})).toEqual([{type: ToastTypes.FATAL}]);
		});
	});

	describe('removeToast action', () => {
		it('removes the specified toast', () => {
			const state = [{id: '100'}, {id: '101'}];
			expect(reducer(state, removeToast(state[0]))).toEqual([{id: '101'}]);
		});
	});

	describe('removeToastType action', () => {
		it('removes all toasts of the specified type', () => {
			const state = [
				{type: 'a', id: '100'},
				{type: 'b', id: '101'},
				{type: 'a', id: '102'},
			];
			expect(reducer(state, removeToastType('a'))).toEqual([{type: 'b', id: '101'}]);
		});
	});

	describe('removeAllToasts action', () => {
		it('returns default state and clears timers', () => {
			const state = [{id: '5'}];
			expect(reducer(state, removeAllToasts())).toEqual([]);
		});
	});
});
