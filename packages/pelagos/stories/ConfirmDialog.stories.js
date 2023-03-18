import {ConfirmDialog} from '../src';

import body from './LoremIpsum';

export default {
	title: 'Components/ConfirmDialog',
	component: ConfirmDialog,
};

export const Default = {
	args: {
		title: 'Title',
		body,
		confirmText: 'Confirm',
	},
};
