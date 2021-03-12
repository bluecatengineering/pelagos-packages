import {Tabs} from '../src';

const getTabKey = ({id}) => id;
const renderTab = ({text}) => (
	<div className="Tabs__tab" style={{padding: '4px 12px'}}>
		{text}
	</div>
);

const items = [
	{id: 'foo', text: 'Foo'},
	{id: 'bar', text: 'Bar'},
	{id: 'baz', text: 'Baz'},
];

const Template = (args) => <Tabs {...args} />;

export const Normal = Template.bind({});
Normal.args = {id: 'tabs', currentTab: 'foo', items, getTabKey, renderTab};

export default {
	title: 'Tabs',
	component: Tabs,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
