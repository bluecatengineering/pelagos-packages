import FieldWrapper from './FieldWrapper';

export default {
	title: 'Components/FieldWrapper',
	component: FieldWrapper,
};

export const Default = {
	args: {label: 'Default', helperText: 'Helper text', children: '[Some input]'},
};

export const Required = {
	args: {label: 'Required', required: true, children: '[Some required input]'},
};

export const RequiredError = {
	args: {label: 'Required with error', required: true, error: 'Error message', children: '[Some input with error]'},
};
