import ToggleField from './ToggleField';

export default {
	title: 'Components/ToggleField',
	component: ToggleField,
};

export const Default = {args: {label: 'Default'}};

export const Checked = {args: {label: 'Checked', value: true}};

export const Disabled = {args: {label: 'Disabled', disabled: true}};
