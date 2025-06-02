import {useCallback, useState} from 'react';

import Toggle from './Toggle';

export default {
	title: 'Components/Toggle',
	component: Toggle,
	render: (args) => {
		const [checked, setChecked] = useState(args.checked);
		const handleChange = useCallback(() => setChecked((o) => !o), []);
		return <Toggle {...args} checked={checked} onChange={handleChange} />;
	},
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
