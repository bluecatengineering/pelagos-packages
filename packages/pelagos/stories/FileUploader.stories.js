import {FileUploader} from '../src';

const Template = (args) => <FileUploader {...args} />;

export const Default = Template.bind({});
Default.args = {
	label: 'Default',
	dropZoneText: 'Drag and drop files here or click to upload',
	types: [{description: 'Text files', accept: {'text/plain': ['.txt']}}],
	files: [{name: 'file-1.txt'}, {name: 'file-2.txt'}],
	helperText: 'Only .txt files are supported.',
};

export const FileError = Template.bind({});
FileError.args = {
	label: 'File error',
	dropZoneText: 'Drag and drop files here or click to upload',
	types: [{description: 'Text files', accept: {'text/plain': ['.txt']}}],
	files: [{name: 'file-1.bin', error: 'File type not supported.'}, {name: 'file-2.txt'}],
	helperText: 'Only .txt files are supported.',
};

export const Error = Template.bind({});
Error.args = {
	label: 'Error',
	dropZoneText: 'Drag and drop files here or click to upload',
	types: [{description: 'Text files', accept: {'text/plain': ['.txt']}}],
	helperText: 'Only .txt files are supported.',
	error: 'Error message',
};

export const Disabled = Template.bind({});
Disabled.args = {
	label: 'Disabled',
	dropZoneText: 'Drag and drop files here or click to upload',
	helperText: 'Only .txt files are supported.',
	disabled: true,
};

export default {
	title: 'Components/FileUploader',
	component: FileUploader,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
