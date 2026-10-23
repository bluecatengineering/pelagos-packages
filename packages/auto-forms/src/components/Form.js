import {forwardRef, useCallback, useMemo, useReducer} from 'react';
import PropTypes from 'prop-types';
import identity from 'lodash-es/identity';

import isNotNull from '../utils/isNotNull';

import FormContext from './FormContext';

const emptyExtras = {};

const reducer = (state, action) => {
	const {type, name, payload} = action;
	switch (type) {
		case 'SET_VALUE':
			return {
				...state,
				values: {...state.values, [name]: payload},
				// the error is optional, it is set in the same update to avoid rendering a value with a stale error
				...('error' in action && {errors: {...state.errors, [name]: action.error}}),
			};
		case 'SET_ERROR':
			return {...state, errors: {...state.errors, [name]: payload}};
		case 'SET_EXTRA':
			return {...state, extras: {...state.extras, [name]: payload}};
		case 'RESET':
			return payload;
	}
	return state;
};

const getInitialState = ({initialValues, initialExtras}) => ({
	initialValues,
	values: initialValues,
	errors: Object.fromEntries(Object.keys(initialValues).map((key) => [key, null])),
	extras: initialExtras,
});

const submitForm = (
	{values, errors: currentErrors, extras, initialValues},
	dispatch,
	rules,
	getActiveFields,
	extraValidation,
	onSubmit
) => {
	const setError = (name, payload) => dispatch({type: 'SET_ERROR', name, payload});
	return new Promise((resolve) => {
		const keys = getActiveFields ? getActiveFields(values, extras) : Object.keys(values);
		if (getActiveFields) {
			// fields which are not active cannot block the submit, their old errors would only be misleading
			const active = new Set(keys);
			Object.keys(values).forEach((key) => !active.has(key) && currentErrors[key] && setError(key, null));
		}
		const errors = keys.reduce((o, key) => {
			const rule = rules[key];
			if (rule) {
				o[key] = rule(values[key]);
			}
			return o;
		}, {});

		resolve(extraValidation(errors, values, extras, initialValues));
	}).then((errors) => {
		const passed = Object.entries(errors).reduce((r, [name, payload]) => {
			setError(name, payload);
			return isNotNull(payload) ? false : r;
		}, true);

		if (!passed) {
			return null;
		}

		const setErrors = (errors) => Object.entries(errors).forEach(([name, payload]) => setError(name, payload));
		return onSubmit(values, {initialValues, extras, setErrors});
	});
};

const resetForm = (initialValues, initialExtras, dispatch) =>
	dispatch({type: 'RESET', payload: getInitialState({initialValues, initialExtras})});

const Form = forwardRef(
	(
		{
			initialValues,
			initialExtras = emptyExtras,
			rules,
			children,
			getActiveFields,
			extraValidation = identity,
			onSubmit,
			...props
		},
		ref
	) => {
		const [state, dispatch] = useReducer(reducer, {initialValues, initialExtras}, getInitialState);
		const submit = useCallback(
			() => submitForm(state, dispatch, rules, getActiveFields, extraValidation, onSubmit),
			[state, rules, getActiveFields, extraValidation, onSubmit]
		);
		const reset = useCallback(
			() => resetForm(initialValues, initialExtras, dispatch),
			[initialExtras, initialValues, dispatch]
		);
		const handleSubmit = useCallback((event) => (event.preventDefault(), submit()), [submit]);
		const handleReset = useCallback((event) => (event.preventDefault(), reset()), [reset]);
		const context = useMemo(() => ({rules, state, dispatch, submit, reset}), [rules, state, dispatch, submit, reset]);
		return (
			<FormContext.Provider value={context}>
				<form {...props} ref={ref} onSubmit={handleSubmit} onReset={handleReset}>
					{children}
				</form>
			</FormContext.Provider>
		);
	}
);

Form.displayName = 'Form';

Form.propTypes = {
	initialValues: PropTypes.object.isRequired,
	initialExtras: PropTypes.object,
	rules: PropTypes.object.isRequired,
	children: PropTypes.node,
	getActiveFields: PropTypes.func,
	extraValidation: PropTypes.func,
	onSubmit: PropTypes.func.isRequired,
};

export default Form;
