import {DropZone} from '../src';

const Template = (args) => <DropZone {...args} />;

export const Default = Template.bind({});
Default.args = {
	label: 'Default',
	emptyHint: 'No file',
	uploadedHint: 'File uploaded',
	editingHint: 'Editing',
	deleteTooltipText: 'Delete',
	helperText: 'Helper text',
};

export const Disabled = Template.bind({});
Disabled.args = {
	label: 'Disabled',
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
	decorators: [(story) => <div style={{width: '50vw'}}>{story()}</div>],
};
