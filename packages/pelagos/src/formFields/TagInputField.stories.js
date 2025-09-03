import {useState} from 'react';
import {action} from 'storybook/actions';

import WithLayers from '../../templates/WithLayers';

import TagInputField from './TagInputField';

const validate = () => null;
const handleChange = action('onChange');
const handleError = () => null;

export default {
	title: 'Components/TagInputField',
	component: TagInputField,
	render: (args) => {
		const [value, setValue] = useState(args.tags);
		return <TagInputField {...args} tags={value} onChange={setValue} />;
	},
};

export const Default = {
	args: {label: 'Default', tags: ['Alpha'], helperText: 'Helper text', validate},
};

export const DefaultTags = {
	args: {
		label: 'Default tags',
		defaultTags: ['Alpha'],
		defaultTooltipText: 'This is a default',
		tags: [],
		validate,
	},
};

export const Disabled = {
	args: {label: 'Disabled', tags: ['Alpha'], validate, disabled: true},
};

export const DisabledWithDefault = {
	args: {label: 'Disabled', defaultTags: ['Alpha'], tags: [], validate, disabled: true},
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
