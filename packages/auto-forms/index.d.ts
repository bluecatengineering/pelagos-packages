import type {ComponentType, FC, FormHTMLAttributes, ForwardRefExoticComponent, ReactNode, RefAttributes} from 'react';

/** ---------- Shared Types ---------- */

/** Form values keyed by field. */
export type FormValues = Record<string, unknown>;
/** Validation errors keyed by field; null means 'no error'. */
export type FormErrors<E = string> = Record<string, E | null>;
/** Extra arbitrary data keyed by field. */
export type FormExtras = Record<string, unknown>;

/** A single-field state & updaters returned by useFormField */
export interface FormFieldState<V = unknown, E = string, X = unknown> {
	/** Current value for the field */
	value: V;
	/** Current validation error (null when valid) */
	error: E | null;
	/** Extra per-field data */
	extra: X;
	/** Set the value and (re)run the field rule if present */
	setValue: (value: V) => void;
	/** Manually set/override the field error */
	setError: (error: E | null) => void;
	/** Set the field's extra payload */
	setExtra: (extra: X) => void;
}

/** A form-wide state snapshot & helpers returned by useFormState */
export interface UseFormStateResult<E = string> {
	/** Initial values provided to <Form /> */
	initialValues: FormValues;
	/** Live values */
	values: FormValues;
	/** Validation errors per field (null means no error) */
	errors: FormErrors<E>;
	/** Extra arbitrary data per field */
	extras: FormExtras;
	/** Triggers validation & calls onSubmit if valid. Resolves to null when blocked by errors. */
	submit: () => Promise<unknown | null>;
	/** Resets values/errors/extras back to initial state */
	reset: () => void;
	/** True if current values differ from initialValues */
	isChanged: () => boolean;
	/** True if any field currently has a non-null error */
	hasErrors: () => boolean;
}

/** Per-field rule: returns null when valid, or an error payload/message otherwise */
export type FieldRule<V = unknown, E = string> = (value: V) => E | null;

/** Rules map passed to <Form /> */
export type RuleMap<E = string> = Record<string, FieldRule<unknown, E> | undefined>;

/** Extra cross-field validation. Receives current errors and may return/resolve a new/merged errors object. */
export type ExtraValidation<E = string> = (
	errors: FormErrors<E>,
	values: FormValues,
	extras: FormExtras,
	initialValues: FormValues
) => FormErrors<E> | Promise<FormErrors<E>>;

/** ---------- <Form /> ---------- */

export interface FormSubmitHelpers<E = string> {
	/** Initial values originally passed to the form */
	initialValues: FormValues;
	/** Current extras object */
	extras: FormExtras;
	/** Set multiple field errors at once */
	setErrors: (errors: FormErrors<E>) => void;
}

export interface FormProps<E = string> extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onReset'> {
	/** Initial field values (required) */
	initialValues: FormValues;
	/** Optional per-field extras (defaults to {}) */
	initialExtras?: FormExtras;
	/** Per-field validation rules (required) */
	rules: RuleMap<E>;
	/** Children (React element or array) */
	children?: ReactNode;
	/**
	 * Return a subset of field names that should be validated/considered "active".
	 * If omitted, all keys in `values` are considered.
	 */
	getActiveFields?: (values: FormValues, extras: FormExtras) => string[];
	/** Optional cross-field validation hook. May be async. */
	extraValidation?: ExtraValidation<E>;
	/**
	 * Called when validation passes. May be async.
	 * Return value is forwarded by `submit()`.
	 */
	onSubmit?: (values: FormValues, helpers: FormSubmitHelpers<E>) => unknown | Promise<unknown>;
}

/** Form component which performs validation on nested elements base on specified rules. */
export const Form: ForwardRefExoticComponent<FormProps & RefAttributes<HTMLFormElement>>;

/** ---------- Hooks ---------- */

/** Access and mutate a single field's value/error/extra by name */
export function useFormField<V = unknown, E = string, X = unknown>(name: string): FormFieldState<V, E, X>;

/** Access full form state & helpers */
export function useFormState<E = string>(): UseFormStateResult<E>;

/** ---------- HOC: connect(Component, mapState) ---------- */

/**
 * Connect a presentational component to a single form field.
 *
 * - The resulting component requires a `name` prop and the *remaining* props
 *   of `P` that are not supplied by `mapState`.
 * - `mapState` receives a `FormFieldState<V, E, X>` enabling consumers to
 *   specialize value/error/extra types when desired.
 */
export function connect<P extends object, V = unknown, E = string, X = unknown, Injected extends object = object>(
	Component: ComponentType<P & Injected & {name: string}>,
	mapState: (state: FormFieldState<V, E, X>) => Injected
): FC<Omit<P, keyof Injected> & {name: string}>;

/** ---------- Validators ---------- */

/**
 * Compose multiple validators. Returns the first non-null/truthy result, or null if all pass.
 * The composed function preserves the argument list of the input validators.
 */
export function validateAnd<V = unknown, E = string>(rules: ((value: V) => E | null)[]): (value: V) => E | null;

/** Valid when value is falsy or matches `rx`; otherwise returns `message`. */
export function validateMatches<V = string, E = string>(rx: RegExp, message: E): (value: V) => E | null;

/** Valid when value is non-empty (after trim); otherwise returns `message`. */
export function validateNotEmpty<V = string, E = string>(message: E): (value: V) => E | null;

/** Valid when value is falsy or does not match `rx`; otherwise returns `message`. */
export function validateNotMatches<V = string, E = string>(rx: RegExp, message: E): (value: V) => E | null;
