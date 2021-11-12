import {createAction} from '@bluecat/redux-utils';

export const addToast = createAction('toast/add', (type, text, onClick) => ({payload: {type, text, onClick}}));
export const removeToast = createAction('toast/remove');
export const removeToastType = createAction('toast/removeType');
export const removeAllToasts = createAction('toast/removeAll');
