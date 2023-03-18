import identity from 'lodash-es/identity';

import {FilterMenu} from '../src';

const options = ['Foo', 'Bar', 'Baz'];

const getEditor = (name) => <div>Mock Editor for {name}</div>;

export default {
	title: 'Components/FilterMenu',
	component: FilterMenu,
};

export const Default = {args: {options, getOptionText: identity, getEditor}};

export const Empty = {args: {options: [], getOptionText: identity, getEditor}};
