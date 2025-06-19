import {useState} from 'react';

import TagComboBox from './TagComboBox';
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
	title: 'Experimental/TagComboBox',
	component: TagComboBox,
	render: (args) => {
		const [value, setValue] = useState(args.tags);
		return <TagComboBox {...args} tags={value} onChange={setValue} />;
	},
};

export const Default = {
	args: {
		'aria-label': 'Default',
		tags: [
			{type: 'purple', name: 'Alpha'},
			{type: 'green', name: 'Banana'},
		],
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

export const DefaultTags = {
	args: {
		'aria-label': 'Default tags',
		defaultTags: [{type: 'purple', name: 'Alpha'}],
		defaultTooltipText: 'Default',
		tags: [],
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

export const Disabled = {
	args: {
		'aria-label': 'Disabled',
		tags: [{type: 'purple', name: 'Alpha'}],
		getKey,
		getName,
		renderTag,
		hasTag,
		validate,
		disabled: true,
	},
};

export const DisabledWithDefault = {
	args: {
		'aria-label': 'Disabled',
		defaultTags: [{type: 'purple', name: 'Alpha'}],
		tags: [],
		getKey,
		getName,
		renderTag,
		hasTag,
		validate,
		disabled: true,
	},
};
