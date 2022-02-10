import {DropZone} from '../src';

const Template = (args) => <DropZone {...args} />;

export const Normal = Template.bind({});
Normal.args = {label: 'Normal', emptyHint: 'No file', uploadedHint: 'File uploaded', editingHint: 'Editing'};

export default {
	title: 'Components/DropZone',
	component: DropZone,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
