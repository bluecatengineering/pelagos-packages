import ToastTypes from '../ToastTypes';

import {addToast, removeToast} from './ToastActions';

const ADD_TOAST_TYPE = addToast.toString();
const toasts = {};

export const SHORT_DURATION = 3000;
export const DEFAULT_DURATION = 8000;

export const hasFatalError = messages => messages.some(m => m.type === ToastTypes.FATAL);

export const registerActionToast = (action, text, type = ToastTypes.FATAL) => {
	let list = toasts[action];
	if (!list) {
		toasts[action] = list = [];
	}
	list.push(typeof text === 'object' ? text : {text, type});
};

export const toaster = store => next => action => {
	const actionType = action.type;
	const dispatch = store.dispatch;
	if (actionType === ADD_TOAST_TYPE) {
		processMessage(action.payload, action, dispatch);
	} else {
		const list = toasts[actionType];
		if (list) {
			list.forEach(toast => {
				let message;
				const getter = toast.toast;
				if (getter) {
					message = getter(action, dispatch);
				} else {
					const text = toast.text;
					message = {type: toast.type, text: typeof text === 'function' ? text(action) : text};
				}
				if (message) {
					processMessage(message, action, dispatch);
				}
			});
		}
	}
	return next(action);
};

const processMessage = (message, action, dispatch) => {
	const type = message.type;
	if (type !== ToastTypes.FATAL && type !== ToastTypes.ACTION) {
		message.timerId = setTimeout(
			() => dispatch(removeToast(message)),
			type === ToastTypes.SUCCESS ? SHORT_DURATION : DEFAULT_DURATION
		);
	}
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
