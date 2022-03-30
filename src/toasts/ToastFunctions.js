import ToastTypes from './ToastTypes';
import {addToast} from './ToastActions';

const toasts = {};

export const hasFatalError = (messages) => messages.some((m) => m.type === ToastTypes.FATAL);

/** @deprecated use `@bluecat/redux-toasts` instead. */
export const registerActionToast = (action, text, type = ToastTypes.FATAL) => {
	let list = toasts[action];
	if (!list) {
		toasts[action] = list = [];
	}
	list.push(typeof text === 'object' ? text : {text, type});
};

/** @deprecated use `@bluecat/redux-toasts` instead. */
export const toaster = (store) => (next) => (action) => {
	const actionType = action.type;
	const dispatch = store.dispatch;
	if (actionType === addToast.type) {
		processMessage(action.payload, action);
	} else {
		const list = toasts[actionType];
		if (list) {
			list.forEach((toast) => {
				let message;
				const getter = toast.toast;
				if (getter) {
					message = getter(action, dispatch);
				} else {
					const text = toast.text;
					message = {type: toast.type, text: typeof text === 'function' ? text(action) : text};
				}
				if (message) {
					processMessage(message, action);
				}
			});
		}
	}
	return next(action);
};

const processMessage = (message, action) => {
	message.id = `${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`;
	let toasts;
	if (!action.meta) {
		toasts = [];
		action.meta = {toasts};
	} else {
		toasts = action.meta.toasts;
		if (!toasts) {
			action.meta.toasts = toasts = [];
		}
	}
	toasts.push(message);
};
