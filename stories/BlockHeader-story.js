import {BlockHeader} from '../src';

const Template = (args) => <BlockHeader {...args} />;

export const Normal = Template.bind({});
Normal.args = {header: 'Test'};

export default {
	title: 'BlockHeader',
	component: BlockHeader,
};
