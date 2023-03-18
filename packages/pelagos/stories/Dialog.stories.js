import {Dialog, Button} from '../src';

import body from './LoremIpsum';

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
