import {useState} from 'react';
import identity from 'lodash-es/identity';

import {buildSimpleSuggestionsParser} from '../functions';

import ListInput from './ListInput';

const placeholder = '1.1.1.1, 1.1.1.2';
const autoFocus = true;
const list = ['1.1.1.1', '1.1.1.2'];
const getSuggestions = () => ({suggestions: []});
const getItemName = identity;
const getItemKey = identity;
const parseInput = buildSimpleSuggestionsParser(() => null);
const onTextChange = identity;

export default {
	title: 'Components/ListInput',
	component: ListInput,
	render: (args) => {
		const [list, setList] = useState(args.list);
		return <ListInput {...args} list={list} onListChange={setList} />;
	},
};

export const Grid = {
	args: {
		id: 'grid',
		label: 'Grid',
		placeholder,
		autoFocus,
		list,
		helperText: 'Helper text',
		getSuggestions,
		getItemName,
		getItemKey,
		parseInput,
		onTextChange,
	},
};

export const Column = {
	args: {
		id: 'column',
		label: 'Column',
		placeholder,
		autoFocus,
		list,
		column: true,
		getSuggestions,
		getItemName,
		getItemKey,
		parseInput,
		onTextChange,
	},
};

export const Reorderable = {
	args: {
		id: 'reorderable',
		label: 'Reorderable',
		placeholder,
		autoFocus,
		list,
		reorderable: true,
		getSuggestions,
		getItemName,
		getItemKey,
		parseInput,
		onTextChange,
	},
};

export const Empty = {
	args: {
		id: 'empty',
		label: 'Empty',
		placeholder,
		autoFocus,
		list: [],
		emptyText: 'The list is empty',
		getSuggestions,
		getItemName,
		getItemKey,
		parseInput,
		onTextChange,
	},
};

export const WithSuggestions = {
	args: {
		id: 'grid',
		label: 'With suggestions',
		placeholder: 'Greek letter',
		autoFocus,
		list: ['Alpha', 'Beta'],
		helperText: 'Helper text',
		getSuggestions: (text, list) => ({
			suggestions: ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'].filter(
				(name) => name.toLowerCase().includes(text.toLowerCase()) && !list.includes(name)
			),
		}),
		getSuggestionText: identity,
		renderSuggestion: (text) => <div>{text}</div>,
		getHighlightKey: () => null,
		getItemName,
		getItemKey,
		onTextChange,
	},
};
