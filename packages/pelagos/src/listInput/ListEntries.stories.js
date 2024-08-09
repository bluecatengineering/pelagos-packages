import identity from 'lodash-es/identity';

import ListEntries from './ListEntries';

const list = ['1.1.1.1', '1.1.1.2'];
const getItemName = identity;
const getItemKey = identity;

export default {
	title: 'Components/ListEntries',
	component: ListEntries,
};

export const Grid = {args: {id: 'grid', list, getItemKey, getItemName}};

export const Column = {args: {id: 'column', list, column: true, getItemKey, getItemName}};

export const Reorderable = {args: {id: 'reorderable', list, reorderable: true, getItemKey, getItemName}};
