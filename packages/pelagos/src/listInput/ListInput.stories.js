import identity from 'lodash-es/identity';

import ListInput from './ListInput';

const placeholder = '1.1.1.1, 1.1.1.2';
const autoFocus = true;
const list = ['1.1.1.1', '1.1.1.2'];
const getSuggestions = () => ({suggestions: []});
const getItemName = identity;
const getItemKey = identity;
const onTextChange = identity;
const onListChange = identity;

export default {
	title: 'Components/ListInput',
	component: ListInput,
};

export const Grid = {
	args: {
		id: 'grid',
		label: 'Grid',
		placeholder,
		autoFocus,
		list,
		text: '1.1',
		helperText: 'Helper text',
		getSuggestions,
		getItemName,
		getItemKey,
		onTextChange,
		onListChange,
	},
};

export const Column = {
	args: {
		id: 'column',
		label: 'Column',
		placeholder,
		autoFocus,
		list,
		text: '1.1',
		column: true,
		getSuggestions,
		getItemName,
		getItemKey,
		onTextChange,
		onListChange,
	},
};

export const Empty = {
	args: {
		id: 'empty',
		label: 'Empty',
		placeholder,
		autoFocus,
		list: [],
		text: '1.1',
		emptyText: 'The list is empty',
		getSuggestions,
		getItemName,
		getItemKey,
		onTextChange,
		onListChange,
	},
};
