import identity from 'lodash-es/identity';

import {ListEntries} from '../src';

const list = ['1.1.1.1', '1.1.1.2'];
const getItemName = identity;
const getItemKey = identity;

const Template = (args) => <ListEntries {...args} />;

export const Grid = Template.bind({});
Grid.args = {
	id: 'grid',
	list,
	getItemKey,
	getItemName,
};

export const Column = Template.bind({});
Column.args = {
	id: 'column',
	list,
	column: true,
	getItemKey,
	getItemName,
};

export default {
	title: 'Components/ListEntries',
	component: ListEntries,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
