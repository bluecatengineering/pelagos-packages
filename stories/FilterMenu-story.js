import identity from 'lodash-es/identity';

import {FilterMenu} from '../src';

const options = ['Foo', 'Bar', 'Baz'];

const getEditor = (name) => <div>Mock Editor for {name}</div>;

const Template = (args) => <FilterMenu {...args} />;

export const Normal = Template.bind({});
Normal.args = {options, getOptionText: identity, getEditor};

export const Empty = Template.bind({});
Empty.args = {options: [], getOptionText: identity, getEditor};

export default {
	title: 'Components/FilterMenu',
	component: FilterMenu,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
