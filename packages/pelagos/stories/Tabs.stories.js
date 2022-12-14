import {Tabs} from '../src';

const getTabKey = ({id}) => id;
const renderLineTab = ({id, text}, current, focused) => (
	<div
		key={id}
		id={`tabs-${id}`}
		className="Tabs__tab"
		style={{height: '40px', padding: '0 16px', justifyContent: 'center'}}
		aria-selected={current}
		data-focused={focused}>
		{text}
	</div>
);
const renderContainedTab = ({id, text}, current, focused) => (
	<div
		key={id}
		id={`tabs-${id}`}
		className="Tabs__containedTab"
		style={{height: '40px', padding: '0 16px', justifyContent: 'center'}}
		aria-selected={current}
		data-focused={focused}>
		{text}
	</div>
);

const items = [
	{id: 'foo', text: 'Foo'},
	{id: 'bar', text: 'Bar'},
	{id: 'baz', text: 'Baz'},
];

const Template = (args) => <Tabs {...args} />;

export const Line = Template.bind({});
Line.args = {id: 'tabs', currentTab: 'foo', items, getTabKey, renderTab: renderLineTab};

export const Contained = Template.bind({});
Contained.args = {id: 'tabs', currentTab: 'foo', items, getTabKey, renderTab: renderContainedTab};

export default {
	title: 'Components/Tabs',
	component: Tabs,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
