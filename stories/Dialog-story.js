import {Dialog, Button} from '../src';

import body from './LoremIpsum';

const Template = (args) => <Dialog {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	title: 'Title',
	children: [
		<div key="body">{body}</div>,
		<div key="buttons">
			<Button text="Button" active />
		</div>,
	],
};

export default {
	title: 'Components/Dialog',
	component: Dialog,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
