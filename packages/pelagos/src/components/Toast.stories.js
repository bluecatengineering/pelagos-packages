import ToastTypes from '../toasts/ToastTypes';

import Toast from './Toast';

const messages = [
	{id: '0', type: ToastTypes.SUCCESS, text: 'Success'},
	{id: '1', type: ToastTypes.SUCCESS, text: 'Success with action', actionText: 'Action'},
	{id: '2', type: ToastTypes.INFO, text: 'Info'},
	{id: '3', type: ToastTypes.INFO, text: 'Info with action', actionText: 'Action'},
	{id: '4', type: ToastTypes.WARNING, text: 'Warning'},
	{id: '5', type: ToastTypes.ERROR, text: 'Error'},
];

export default {
	title: 'Components/Toast',
	component: Toast,
};

export const Default = {args: {messages}};
