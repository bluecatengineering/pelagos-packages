import ToastTypes from './ToastTypes';
import {removeAllToasts, removeToast, removeToastType} from './ToastActions';
import {hasFatalError} from './ToastFunctions';

export default (state, {type, payload, meta}) => {
	if (!state) {
		state = [];
	}
	switch (type) {
		case removeToast.type:
			return state.filter((m) => m !== payload);
		case removeToastType.type:
			return state.filter((m) => m.type !== payload);
		case removeAllToasts.type:
			return [];
		default:
			if (!hasFatalError(state) && meta?.toasts) {
				const toasts = meta.toasts;
				const fatal = toasts.find((m) => m.type === ToastTypes.FATAL);
				return fatal ? [fatal] : [...state, ...toasts].slice(-3);
			}
	}
	return state;
};
