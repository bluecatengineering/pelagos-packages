import Button from '../components/Button';
import buildSimpleSuggestionsParser from '../functions/buildSimpleSuggestionsParser';

import TextFilterEditor from './TextFilterEditor';

const list = ['foo', 'baz'];
const getSuggestions = () => ({suggestions: [{name: 'bar'}]});
const parseInput = buildSimpleSuggestionsParser();

export default {
	title: 'Components/TextFilterEditor',
	component: TextFilterEditor,
};

export const Default = {
	args: {label: 'Default', placeholder: 'Placeholder', list, getSuggestions, parseInput, validateSaveRef: {}},
};

export const ForArea = {
	args: {
		label: 'For area',
		placeholder: 'Placeholder',
		list,
		getSuggestions,
		parseInput,
		chipId: 'chip',
		forArea: true,
	},
	decorators: [
		(Story) => (
			<>
				<Button id="chip" text="Button" size="small" />
				<Story />
			</>
		),
	],
};
