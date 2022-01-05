import {ConfirmDialog} from '../src';

const Template = (args) => <ConfirmDialog {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	title: 'Title',
	body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	confirmText: 'Confirm',
};

export default {
	title: 'Components/ConfirmDialog',
	component: ConfirmDialog,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
