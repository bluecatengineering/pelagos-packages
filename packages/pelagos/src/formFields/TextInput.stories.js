import {useState} from 'react';
import {action} from 'storybook/actions';

import WithLayers from '../../templates/WithLayers';

import TextInput from './TextInput';

const handleChange = action('onChange');

export default {
	title: 'Components/TextInput',
	component: TextInput,
	render: (args) => {
		const [value, setValue] = useState(args.value);
		return <TextInput {...args} value={value} onChange={setValue} />;
	},
};

export const Default = {
	args: {'aria-label': 'Default', value: 'Alpha'},
};

export const Empty = {
	args: {'aria-label': 'Empty', placeholder: 'Placeholder'},
};

export const Disabled = {
	args: {'aria-label': 'Disabled', value: 'Alpha', disabled: true},
};

export const ReadOnly = {
	args: {'aria-label': 'Read-Only', value: 'Alpha', readOnly: true},
};

export const Error = {
	args: {'aria-label': 'Error', value: 'Alpha', required: true, error: true},
};

export const _WithLayers = {
	render: () => <WithLayers>{() => <TextInput aria-label="Label" value="Alpha" onChange={handleChange} />}</WithLayers>,
	parameters: {
		controls: {hideNoControlsWarning: true},
	},
};
