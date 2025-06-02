import {useState} from 'react';
import {action} from '@storybook/addon-actions';

import WithLayers from '../../templates/WithLayers';

import TextInputField from './TextInputField';

const handleChange = action('onChange');

export default {
	title: 'Components/TextInputField',
	component: TextInputField,
	render: (args) => {
		const [value, setValue] = useState(args.value);
		return <TextInputField {...args} value={value} onChange={setValue} />;
	},
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

export const _WithLayers = {
	render: () => (
		<WithLayers>
			{() => <TextInputField label="Label" value="Alpha" helperText="Helper text" onChange={handleChange} />}
		</WithLayers>
	),
	parameters: {
		controls: {hideNoControlsWarning: true},
	},
};
