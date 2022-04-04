import {ConfirmDialog} from '../src';

import body from './LoremIpsum';

const Template = (args) => <ConfirmDialog {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	title: 'Title',
	body,
	confirmText: 'Confirm',
};

export default {
	title: 'Components/ConfirmDialog',
	component: ConfirmDialog,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
