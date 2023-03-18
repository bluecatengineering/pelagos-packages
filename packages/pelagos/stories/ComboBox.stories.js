import {ComboBox} from '../src';

const getSuggestions = () => ['Alpha', 'Beta', 'Gamma'];
const renderSuggestion = (text) => <div>{text}</div>;

export default {
	title: 'Components/ComboBox',
	component: ComboBox,
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
