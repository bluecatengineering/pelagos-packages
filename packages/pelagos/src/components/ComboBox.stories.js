import {useCallback, useState} from 'react';
import {action} from 'storybook/actions';

import WithLayers from '../../templates/WithLayers';
import renderComplexSuggestion from '../suggestions/renderSuggestion';
import loremIpsumShort from '../../stories/LoremIpsumShort';

import ComboBox from './ComboBox';

const getSuggestions = () => ['Alpha', 'Beta', 'Gamma'];
const renderSuggestion = (text) => <div>{text}</div>;
const handleChange = action('onChange');
const handleTextChange = action('onTextChange');

export default {
	title: 'Components/ComboBox',
	component: ComboBox,
	render: (args) => {
		const [text, setText] = useState(args.text);
		return <ComboBox {...args} text={text} onTextChange={setText} onChange={setText} />;
	},
};

export const Default = {
	args: {id: 'default', text: 'Alpha', 'aria-label': 'Default', getSuggestions, renderSuggestion},
};

export const Empty = {
	args: {id: 'empty', placeholder: 'Empty', 'aria-label': 'Empty', getSuggestions, renderSuggestion},
};

export const Disabled = {
	args: {
		id: 'disabled',
		text: 'Disabled',
		'aria-label': 'Disabled',
		disabled: true,
		getSuggestions: () => [],
		renderSuggestion,
	},
};

export const Error = {
	args: {id: 'error', text: 'Error', 'aria-label': 'Error', error: true, getSuggestions, renderSuggestion},
};

export const ComplexSuggestions = {
	args: {
		id: 'default',
		text: 'Alpha',
		'aria-label': 'Default',
		getSuggestions: () => [
			{name: 'Alpha', description: 'first'},
			{name: loremIpsumShort, description: 'second'},
		],
		renderSuggestion: renderComplexSuggestion,
	},
	render: (args) => {
		const [text, setText] = useState(args.text);
		const handleChange = useCallback((suggestion) => setText(suggestion.name), []);
		return <ComboBox {...args} text={text} onTextChange={setText} onChange={handleChange} />;
	},
};

export const _WithLayers = {
	render: () => (
		<WithLayers>
			{(level) => (
				<ComboBox
					id={`level-${level}`}
					text="Alpha"
					aria-label="Default"
					getSuggestions={getSuggestions}
					renderSuggestion={renderSuggestion}
					onChange={handleChange}
					onTextChange={handleTextChange}
				/>
			)}
		</WithLayers>
	),
	parameters: {
		controls: {hideNoControlsWarning: true},
	},
};
