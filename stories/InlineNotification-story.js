import {InlineNotification} from '../src';

import text from './LoremIpsum';

const Template = (args) => <InlineNotification {...args} />;

export const Success = Template.bind({});
Success.args = {type: 'success', title: 'Success', text};

export const Info = Template.bind({});
Info.args = {type: 'info', title: 'Info', text};

export const Warning = Template.bind({});
Warning.args = {type: 'warning', title: 'Warning', text};

export const Error = Template.bind({});
Error.args = {type: 'error', title: 'Error', text};

export default {
	title: 'Components/InlineNotification',
	component: InlineNotification,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
