import {FileUploader} from '../src';

const Template = (args) => <FileUploader {...args} />;

export const Default = Template.bind({});
Default.args = {
	label: 'Default',
	description: 'Only .txt files are supported.',
	dropZoneText: 'Drag and drop files here or click to upload',
	types: [{description: 'Text files', accept: {'text/plain': ['.txt']}}],
	files: [{name: 'file-1.txt'}, {name: 'file-2.txt'}],
	helperText: 'Helper text',
};

export const FileError = Template.bind({});
FileError.args = {
	label: 'File error',
	description: 'Only .txt files are supported.',
	dropZoneText: 'Drag and drop files here or click to upload',
	types: [{description: 'Text files', accept: {'text/plain': ['.txt']}}],
	files: [{name: 'file-1.bin', error: 'File type not supported.'}, {name: 'file-2.txt'}],
	helperText: 'Helper text',
};

export const Error = Template.bind({});
Error.args = {
	label: 'Error',
	description: 'Only .txt files are supported.',
	dropZoneText: 'Drag and drop files here or click to upload',
	types: [{description: 'Text files', accept: {'text/plain': ['.txt']}}],
	helperText: 'Helper text',
	error: 'Error message',
};

export const Disabled = Template.bind({});
Disabled.args = {
	label: 'Disabled',
	description: 'Only .txt files are supported.',
	dropZoneText: 'Drag and drop files here or click to upload',
	helperText: 'Helper text',
	disabled: true,
};

export default {
	title: 'Components/FileUploader',
	component: FileUploader,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
