import identity from 'lodash-es/identity';

import {FilterList} from '../src';

const filters = {foo: 'foo values', bar: 'bar values', baz: 'baz values'};

const getValues = (key, values) => values;

const getEditor = (name) => <div>Mock Editor for {name}</div>;

const Template = (args) => <FilterList {...args} />;

export const Normal = Template.bind({});
Normal.args = {filters, getFilterTitle: identity, getValues, getEditor};

export default {
	title: 'Components/FilterList',
	component: FilterList,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
