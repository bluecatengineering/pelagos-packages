import {BlockHeader} from '../src';

const Template = (args) => <BlockHeader {...args} />;

export const Normal = Template.bind({});
Normal.args = {header: 'Test'};

export const Configured = Template.bind({});
Configured.args = {header: 'Test', configured: true};

export default {
	title: 'BlockHeader',
	component: BlockHeader,
};
