import {useCallback, useState} from 'react';

import ToggleField from './ToggleField';

export default {
	title: 'Components/ToggleField',
	component: ToggleField,
	render: (args) => {
		const [value, setValue] = useState(args.value);
		const handleChange = useCallback(() => setValue((o) => !o), []);
		return <ToggleField {...args} value={value} onChange={handleChange} />;
	},
};

export const Default = {args: {label: 'Default'}};

export const Checked = {args: {label: 'Checked', value: true}};

export const Disabled = {args: {label: 'Disabled', disabled: true}};
