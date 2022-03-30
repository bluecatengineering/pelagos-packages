import {createAction} from '@bluecat/redux-utils';

/** @deprecated use `@bluecat/redux-toasts` instead. */
export const addToast = createAction('toast/add', (type, text, onClick) => ({payload: {type, text, onClick}}));
/** @deprecated use `@bluecat/redux-toasts` instead. */
export const removeToast = createAction('toast/remove');
/** @deprecated use `@bluecat/redux-toasts` instead. */
export const removeToastType = createAction('toast/removeType');
/** @deprecated use `@bluecat/redux-toasts` instead. */
export const removeAllToasts = createAction('toast/removeAll');
