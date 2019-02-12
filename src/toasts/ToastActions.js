import {createAction} from 'redux-actions';

export const addToast = createAction('TOAST/ADD', (type, text, onClick) => ({type, text, onClick}));
export const removeToast = createAction('TOAST/REMOVE');
export const removeToastType = createAction('TOAST/REMOVE_TYPE');
export const removeAllToasts = createAction('TOAST/REMOVE_ALL');
