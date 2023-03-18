import {TextAreaField} from '../src';

export default {
	title: 'Components/TextAreaField',
	component: TextAreaField,
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

export const Error = {
	args: {label: 'Error', value: 'Alpha', error: 'Error message'},
};
