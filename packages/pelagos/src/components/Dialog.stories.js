import body from '../../stories/LoremIpsum';

import Dialog from './Dialog';
import Button from './Button';

export default {
	title: 'Components/Dialog',
	component: Dialog,
};

export const Default = {
	args: {
		title: 'Title',
		children: [
			<div key="body">
				<p>{body}</p>
			</div>,
			<div key="buttons">
				<Button text="Button" type="primary" />
			</div>,
		],
	},
};
