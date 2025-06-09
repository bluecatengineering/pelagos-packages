import {useState} from 'react';
import {action} from '@storybook/addon-actions';

import WithLayers from '../../templates/WithLayers';

import TagComboBoxField from './TagComboBoxField';
import {
	getKey,
	getName,
	renderTag,
	hasTag,
	validate,
	textToTag,
	getSuggestions,
	renderSuggestion,
} from './story-helpers';

export default {
	title: 'Experimental/TagComboBoxField',
	component: TagComboBoxField,
	render: (args) => {
		const [value, setValue] = useState(args.tags);
		return <TagComboBoxField {...args} tags={value} onChange={setValue} />;
	},
};

export const Default = {
	args: {
		label: 'Default',
		tags: [
			{type: 'purple', name: 'Alpha'},
			{type: 'green', name: 'Banana'},
		],
		helperText: 'Helper text',
		getKey,
		getName,
		renderTag,
		hasTag,
		validate,
		textToTag,
		getSuggestions,
		renderSuggestion,
	},
};

export const _WithLayers = {
	render: () => (
		<WithLayers>
			{() => (
				<TagComboBoxField
					label="Label"
					tags={[{type: 'purple', name: 'Alpha'}]}
					helperText="Helper text"
					getKey={getKey}
					getName={getName}
					renderTag={renderTag}
					hasTag={hasTag}
					validate={validate}
					textToTag={textToTag}
					getSuggestions={getSuggestions}
					renderSuggestion={renderSuggestion}
					onChange={action('onChange')}
					onError={action('onError')}
				/>
			)}
		</WithLayers>
	),
	parameters: {
		controls: {hideNoControlsWarning: true},
	},
};
