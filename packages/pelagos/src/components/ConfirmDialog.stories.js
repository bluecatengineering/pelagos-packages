import body from '../../stories/LoremIpsum';

import ConfirmDialog from './ConfirmDialog';

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
