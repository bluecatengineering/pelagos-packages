import {ToastTypes, Toast} from '../src';

const messages = [
	{id: '0', type: ToastTypes.SUCCESS, text: 'Success'},
	{id: '1', type: ToastTypes.INFO, text: 'Info'},
	{id: '2', type: ToastTypes.INFO, text: 'Info with action', actionText: 'Action'},
	{id: '3', type: ToastTypes.WARNING, text: 'Warning'},
	{id: '4', type: ToastTypes.ERROR, text: 'Error'},
];

export default {
	title: 'Components/Toast',
	component: Toast,
};

export const Default = {args: {messages}};
