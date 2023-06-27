import {action} from '@storybook/addon-actions';

import WithLayers from '../../templates/WithLayers';

import TagInputField from './TagInputField';

const validate = () => true;
const handleChange = action('onChange');
const handleError = () => null;

export default {
	title: 'Components/TagInputField',
	component: TagInputField,
};

export const Default = {
	args: {label: 'Default', tags: ['Alpha'], helperText: 'Helper text', validate},
};

export const Defaults = {
	args: {label: 'Defaults', defaultTags: ['Alpha'], tags: [], validate},
};

export const _WithLayers = {
	render: () => (
		<WithLayers>
			{() => (
				<TagInputField
					label="Label"
					tags={['Alpha']}
					helperText="Helper text"
					validate={validate}
					onChange={handleChange}
					onError={handleError}
				/>
			)}
		</WithLayers>
	),
	parameters: {
		controls: {hideNoControlsWarning: true},
	},
};
