# @bluecateng/auto-forms [![GitHub license](https://img.shields.io/badge/license-ISC-blue.svg)](https://github.com/bluecatengineering/pelagos-packages/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/@bluecateng/auto-forms.svg?style=flat)](https://www.npmjs.com/package/@bluecateng/auto-forms)

Auto-forms is a library that helps you quickly create "auto-wired" forms in React. Auto-Forms is a small library which ensures the least amount of performance hit possible, and makes it easy to create forms that already have the values, validation functions, error messages, and submit functions all work seamlessly together.

## Installation

```bash
npm i -S @bluecateng/auto-forms
```

### Creating Connected Components

#### Input

```javascript
import {connect} from '@bluecateng/auto-forms';
import ComponentToConnect from '...';

// Use the connect function to map the state of the component to the state of the auto-wired form.
// mapState is called while the wrapper renders, so it can use hooks.
// A ref passed to the connected component is forwarded to ComponentToConnect.
const AutoWiredTextInput = connect(ComponentToConnect, ({value, error, setValue}) => ({
	value,
	error,
	onChange: useCallback(({target: {value}}) => setValue(value), [setValue]),
}));

export default AutoWiredTextInput;
```

#### Submit

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import {useFormState} from '@bluecateng/auto-forms';

const AutoWiredSubmit = () => {
	// use useFormState to hook into the auto wired forms state:
	const {hasErrors} = useFormState();
	return <input type="submit" disabled={hasErrors()} />;
};

export default AutoWiredSubmit;
```

### Creating a form

```javascript
import {Form, validateNotEmpty} from '@bluecateng/auto-forms';
import {AutoWiredTextInput} from '...';
import {AutoWiredSubmit} from '...';
import {sendData} from '...';

const FormExample = () => {
	const initialValues = {
		name: 'example',
	};

	const rules = {
		name: validateNotEmpty('Name is required'),
	};

	return (
		<Form
			initialValues={initialValues}
			rules={rules}
			onSubmit={(values) => {
				sendData(values.name);
			}}>
			<AutoWiredTextInput name="name" />
			<AutoWiredSubmit />
		</Form>
	);
};

export default FormExample;
```

## Documentation

`Form`- Renders a `form` element and provides the form state to the connected components. It accepts the following props in addition to the standard `form` props:

- `initialValues` (required) - the initial field values, keyed by field name. Only the value on mount is used (see below).
- `initialExtras` - optional extra data for each field, keyed by field name.
- `rules` (required) - the validation function for each field. A rule returns `null` when the value is valid or the error otherwise (not `undefined`). Define the rules outside the component or memoize them, a new object on each render also changes the `setValue` function returned by `useFormField`.
- `getActiveFields` - a function returning the names of the fields to validate on submit. Errors on the other fields are cleared on submit.
- `extraValidation` - a function receiving `(errors, values, extras, initialValues)` and returning the final errors (or a promise), used to validate fields which depend on each other. Errors set here stay until the field is edited or the form is submitted again.
- `onSubmit` (required) - a function receiving `(values, {initialValues, extras, setErrors})` invoked when validation passes. If it returns a promise, the promise is returned by `submit`.

`Form` reads `initialValues` and `initialExtras` only when it is mounted. To re-initialize the form when the edited item changes, set a `key` on it, for example `<Form key={item.id} ...>`.

`connect`- Creates a component connected to a form field, see above. The resulting component requires a `name` prop.

`useFormField`- Returns the field by value as well as a function to edit the field outside of the input, similar to hooks in React.

`useFormState`- Returns an object containing the entire state of form. Note that `hasErrors()` only reflects errors set by editing a field, by `setError` or by a previous submit, so errors from `extraValidation` do not appear before the form is submitted.

`validateAnd`- Validates an array of functions, only returns null if all validations rules pass.

`validateMatches`- Validates a field against a regex pattern. The pattern must not use the `g` or `y` flags.

`validateNotEmpty`-Validates a field to ensure it is not empty.

`validateNotMatches`-Validates a field to ensure it does NOT match a regex pattern. The pattern must not use the `g` or `y` flags.

## License

[ISC](https://choosealicense.com/licenses/isc/)
