import ToggleField from './ToggleField';

export default {
	title: 'Components/ToggleField',
	component: ToggleField,
};

const getSideLabel = (checked) => (checked ? 'Active' : 'Inactive');

export const Default = {args: {label: 'Default', getSideLabel}};

export const Checked = {args: {label: 'Checked', value: true, getSideLabel}};

export const Disabled = {args: {label: 'Disabled', disabled: true, getSideLabel}};
