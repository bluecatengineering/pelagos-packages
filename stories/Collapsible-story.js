import {Collapsible} from '../src';

import text from './LoremIpsum';

const content = <div key="content">{text}</div>;

const Template = (args) => <Collapsible {...args} />;

export const Normal = Template.bind({});
Normal.args = {open: true, children: [<h2 key="header">Test</h2>, content]};

export const Legacy = Template.bind({});
Legacy.args = {open: true, header: 'Test', children: content};

export default {
	title: 'Components/Collapsible',
	component: Collapsible,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
