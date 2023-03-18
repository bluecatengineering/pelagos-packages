import {InlineNotification} from '../src';

import text from './LoremIpsum';

export default {
	title: 'Components/InlineNotification',
	component: InlineNotification,
};

export const Success = {
	args: {type: 'success', title: 'Success', text},
};

export const Info = {
	args: {type: 'info', title: 'Info', text},
};

export const Warning = {
	args: {type: 'warning', title: 'Warning', text},
};

export const Error = {
	args: {type: 'error', title: 'Error', text},
};
