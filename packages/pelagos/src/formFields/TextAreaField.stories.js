import {action} from '@storybook/addon-actions';

import WithLayers from '../../templates/WithLayers';

import TextAreaField from './TextAreaField';

const handleChange = action('onChange');

export default {
	title: 'Components/TextAreaField',
	component: TextAreaField,
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

export const Error = {
	args: {label: 'Error', value: 'Alpha', error: 'Error message'},
};

export const _WithLayers = {
	render: () => (
		<WithLayers>
			{() => <TextAreaField label="Label" value="Alpha" helperText="Helper text" onChange={handleChange} />}
		</WithLayers>
	),
	parameters: {
		controls: {hideNoControlsWarning: true},
	},
};
