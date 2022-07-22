import {Dialog, Button} from '../src';

import body from './LoremIpsum';

const Template = (args) => <Dialog {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	title: 'Title',
	children: [
		<div key="body">
			<p>{body}</p>
		</div>,
		<div key="buttons">
			<Button text="Button" type="primary" />
		</div>,
	],
};

export default {
	title: 'Components/Dialog',
	component: Dialog,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
