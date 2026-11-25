import text from '../../stories/LoremIpsum';

import InlineNotification from './InlineNotification';

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

export const WithLink = {
	args: {
		type: 'warning',
		title: 'Limited resources',
		text: (
			<>
				Creating a report will reduce your resource <a href="#">availability</a>.
			</>
		),
	},
};
