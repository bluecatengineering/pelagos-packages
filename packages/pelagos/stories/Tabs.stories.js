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

export default {
	title: 'Components/Tabs',
	component: Tabs,
};

export const Line = {args: {id: 'tabs', currentTab: 'foo', items, getTabKey, renderTab: renderLineTab}};

export const Contained = {args: {id: 'tabs', currentTab: 'foo', items, getTabKey, renderTab: renderContainedTab}};
