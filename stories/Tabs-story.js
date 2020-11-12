import {Tabs} from '../src';

// eslint-disable-next-line react/display-name
const buildPanel = (name) => () => <div>{name} panel</div>;

const items = [
	{id: 'foo', title: 'Foo', getPanel: buildPanel('Foo')},
	{id: 'bar', title: 'Bar', getPanel: buildPanel('Bar')},
	{id: 'baz', title: 'Baz', getPanel: buildPanel('Baz')},
];

const Template = (args) => <Tabs {...args} />;

export const Normal = Template.bind({});
Normal.args = {id: 'tabs', active: 'foo', items};

export default {
	title: 'Tabs',
	component: Tabs,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
