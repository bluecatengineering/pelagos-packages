import identity from 'lodash-es/identity';

import {ListInput} from '../src';

const placeholder = '1.1.1.1, 1.1.1.2';
const autoFocus = true;
const list = ['1.1.1.1', '1.1.1.2'];
const getSuggestions = () => ({suggestions: []});
const getItemName = identity;
const getItemKey = identity;
const onTextChange = identity;
const onListChange = identity;

const Template = (args) => <ListInput {...args} />;

export const Grid = Template.bind({});
Grid.args = {
	id: 'grid',
	label: 'Grid',
	placeholder,
	autoFocus,
	list,
	text: '1.1',
	getSuggestions,
	getItemName,
	getItemKey,
	onTextChange,
	onListChange,
};

export const Column = Template.bind({});
Column.args = {
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
};

export const Empty = Template.bind({});
Empty.args = {
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
};

export default {
	title: 'ListInput',
	component: ListInput,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
