import Toggle from './Toggle';

export default {
	title: 'Components/Toggle',
	component: Toggle,
};

export const Default = {
	args: {'aria-label': 'Default'},
};

export const Checked = {
	args: {'aria-label': 'Checked', checked: true},
};

export const Disabled = {
	args: {'aria-label': 'Disabled', disabled: true},
};
