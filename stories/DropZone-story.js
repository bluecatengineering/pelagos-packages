import {DropZone} from '../src';

const Template = (args) => <DropZone {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	label: 'Normal',
	emptyHint: 'No file',
	uploadedHint: 'File uploaded',
	editingHint: 'Editing',
	helperText: 'Helper text',
};

export const Disabled = Template.bind({});
Disabled.args = {
	label: 'Normal',
	emptyHint: 'No file',
	uploadedHint: 'File uploaded',
	editingHint: 'Editing',
	helperText: 'Helper text',
	disabled: true,
};

export default {
	title: 'Components/DropZone',
	component: DropZone,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
