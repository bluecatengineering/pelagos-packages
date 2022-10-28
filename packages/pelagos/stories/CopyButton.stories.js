import {CopyButton} from '../src';

const Template = (args) => <CopyButton {...args} />;

export const Normal = Template.bind({});
Normal.args = {data: 'Test of CopyButton', tooltipText: 'Copy sample text'};

export default {
	title: 'Components/CopyButton',
	component: CopyButton,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
