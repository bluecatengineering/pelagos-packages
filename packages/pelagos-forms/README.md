# @bluecateng/pelagos-forms [![GitHub license](https://img.shields.io/badge/license-ISC-blue.svg)](https://github.com/bluecatengineering/pelagos-packages/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/@bluecateng/pelagos-forms.svg?style=flat)](https://www.npmjs.com/package/@bluecateng/pelagos-forms)

Form components.

The components are [@bluecateng/pelagos](https://www.npmjs.com/package/@bluecateng/pelagos) fields connected to a [@bluecateng/auto-forms](https://www.npmjs.com/package/@bluecateng/auto-forms) `Form`. Each one takes a `name` prop with the name of the form field, plus the props of the component it wraps, except the ones which are provided by the form.

## Installation

```bash
npm i -S @bluecateng/pelagos-forms
```

## Usage

```javascript
import {Form, validateNotEmpty} from '@bluecateng/auto-forms';
import {FormSubmit, FormTextInput} from '@bluecateng/pelagos-forms';

const initialValues = {name: ''};
const rules = {name: validateNotEmpty('The name is required.')};

const Example = ({onSave}) => (
	<Form initialValues={initialValues} rules={rules} onSubmit={onSave}>
		<FormTextInput id="name" name="name" label="Name" />
		<FormSubmit text="Save" />
	</Form>
);
```

## Components

| Component          | Wraps              | Provided by the form                                             |
| ------------------ | ------------------ | ---------------------------------------------------------------- |
| `FormCheckBox`     | `CheckBox`         | `checked`, `onChange`                                            |
| `FormDateInput`    | `DateInputField`   | `value`, `error`, `onChange`                                     |
| `FormDropDown`     | `DropDownField`    | `value`, `error`, `onChange`                                     |
| `FormFileUploader` | `FileUploader`     | `files`, `error`, `onChange`                                     |
| `FormListInput`    | `ListInput`        | `list`, `error`, `onListChange`, `onTextChange`, `onErrorChange` |
| `FormRadioGroup`   | `RadioGroup`       | `value`, `onChange`                                              |
| `FormTagComboBox`  | `TagComboBoxField` | `tags`, `error`, `onChange`, `onError`                           |
| `FormTagInput`     | `TagInputField`    | `tags`, `error`, `onChange`, `onError`                           |
| `FormTextArea`     | `TextAreaField`    | `value`, `error`, `onChange`                                     |
| `FormTextInput`    | `TextInputField`   | `value`, `error`, `onChange`                                     |
| `FormToggle`       | `ToggleField`      | `value`, `onChange`                                              |
| `FormSubmit`       | `Button`           | `type`                                                           |

`FormCheckBox`, `FormRadioGroup` and `FormToggle` do not receive the field error, so a validation rule on those fields is not displayed by the component. Show the error with `useFormField` if one is needed.

`FormListInput` stores in the form extras whether the input has text which was not added to the list, use it in `extraValidation` to reject the form in that case.

`FormSubmit` is a `Button` which is displayed as primary when the form values are different from the initial values, and as tertiary otherwise.
