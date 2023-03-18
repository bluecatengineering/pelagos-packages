import {TextInputField} from '../src';

export default {
	title: 'Components/TextInputField',
	component: TextInputField,
};

export const Default = {
	args: {label: 'Default', value: 'Alpha', helperText: 'Helper text'},
};

export const Empty = {
	args: {label: 'Empty', placeholder: 'Placeholder'},
};

export const Required = {
	args: {label: 'Required', required: true},
};

export const Disabled = {
	args: {label: 'Disabled', value: 'Alpha', disabled: true},
};

export const ReadOnly = {
	args: {label: 'Read-Only', value: 'Alpha', readOnly: true},
};

export const Error = {
	args: {label: 'Error', value: 'Alpha', required: true, error: 'Error message'},
};
