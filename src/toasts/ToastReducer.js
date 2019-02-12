import ToastTypes from '../ToastTypes';

import {removeToast, removeToastType, removeAllToasts} from './ToastActions';
import {hasFatalError} from './ToastFunctions';

const BUFFER_SIZE = 3;

const clearMessageTimer = ({timerId}) => {
	if (timerId) {
		clearTimeout(timerId);
	}
};

const clearAllTimers = messages => {
	messages.forEach(clearMessageTimer);
};

const remove = (messages, condition) =>
	messages.filter(m => {
		const matches = condition(m);
		if (matches) {
			clearMessageTimer(m);
		}
		return !matches;
	});

export default (state, {type, payload, meta}) => {
	if (!state) {
		state = [];
	}
	switch (type) {
		case removeToast.toString():
			return remove(state, m => m === payload);
		case removeToastType.toString():
			return remove(state, m => m.type === payload);
		case removeAllToasts.toString():
			clearAllTimers(state);
			return [];
		default:
			if (meta && meta.toasts) {
				if (hasFatalError(state)) {
					return state;
				}

				const toasts = meta.toasts;
				const fatal = toasts.find(m => m.type === ToastTypes.FATAL);
				if (fatal) {
					clearAllTimers(state);
					return [fatal];
				}

				toasts.forEach(toast => {
					const toastType = toast.type;

					if (toastType === ToastTypes.ACTION) {
						state = remove(state, m => m.type === toastType);
					}

					if (state.length === BUFFER_SIZE) {
						clearMessageTimer(state[0]);
						state = state.slice(1);
					}
				});

				return [...state, ...toasts];
			}
	}
	return state;
};
