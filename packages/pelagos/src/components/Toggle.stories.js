import Toggle from './Toggle';

export default {
	title: 'Components/Toggle',
	component: Toggle,
};

const getSideLabel = (checked) => (checked ? 'Active' : 'Inactive');

export const Default = {
	args: {'aria-label': 'Default', getSideLabel},
};

export const Checked = {
	args: {'aria-label': 'Checked', checked: true, getSideLabel},
};

export const Disabled = {
	args: {'aria-label': 'Disabled', disabled: true, getSideLabel},
};
