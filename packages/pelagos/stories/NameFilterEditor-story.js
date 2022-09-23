import {NameFilterEditor} from '../src';

const list = ['foo', 'baz'];
const foo = {id: 'foo', name: 'Foo'};
const bar = {id: 'bar', name: 'Bar'};
const baz = {id: 'baz', name: 'Baz'};
const sourceById = {foo, bar, baz};

const Template = (args) => <NameFilterEditor {...args} />;

export const Normal = Template.bind({});
Normal.args = {label: 'Normal', placeholder: 'Placeholder', list, sourceById, validateSaveRef: {}};

export default {
	title: 'Components/NameFilterEditor',
	component: NameFilterEditor,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
