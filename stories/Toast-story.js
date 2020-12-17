import {ToastTypes, Toast} from '../src';

const messages = [
	{id: '0', type: ToastTypes.INFO, text: 'Info'},
	{id: '1', type: ToastTypes.WARNING, text: 'Warning'},
	{id: '2', type: ToastTypes.ERROR, text: 'Error'},
];

const Template = (args) => <Toast {...args} />;

export const Normal = Template.bind({});
Normal.args = {messages};

export default {
	title: 'Toast',
	component: Toast,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
