import {useState} from 'react';
import {action} from 'storybook/actions';

import WithLayers from '../../templates/WithLayers';

import TextArea from './TextArea';

const handleChange = action('onChange');

export default {
	title: 'Components/TextArea',
	component: TextArea,
	render: (args) => {
		const [value, setValue] = useState(args.value);
		return <TextArea {...args} value={value} onChange={setValue} />;
	},
};

export const Default = {
	args: {'aria-label': 'Default', value: 'Alpha'},
};

export const Empty = {
	args: {'aria-label': 'Empty', placeholder: 'Placeholder'},
};

export const Error = {
	args: {'aria-label': 'Error', value: 'Alpha', error: true},
};

export const _WithLayers = {
	render: () => <WithLayers>{() => <TextArea aria-label="Label" value="Alpha" onChange={handleChange} />}</WithLayers>,
	parameters: {
		controls: {hideNoControlsWarning: true},
	},
};
