import FileUploader from './FileUploader';

export default {
	title: 'Components/FileUploader',
	component: FileUploader,
};

export const Default = {
	args: {
		label: 'Default',
		dropZoneText: 'Drag and drop files here or click to upload',
		types: [{description: 'Text files', accept: {'text/plain': ['.txt']}}],
		files: [{name: 'file-1.txt'}, {name: 'file-2.txt'}],
		helperText: 'Only .txt files are supported.',
	},
};

export const FileError = {
	args: {
		label: 'File error',
		dropZoneText: 'Drag and drop files here or click to upload',
		types: [{description: 'Text files', accept: {'text/plain': ['.txt']}}],
		files: [{name: 'file-1.bin', error: 'File type not supported.'}, {name: 'file-2.txt'}],
		helperText: 'Only .txt files are supported.',
	},
};

export const Error = {
	args: {
		label: 'Error',
		dropZoneText: 'Drag and drop files here or click to upload',
		types: [{description: 'Text files', accept: {'text/plain': ['.txt']}}],
		helperText: 'Only .txt files are supported.',
		error: 'Error message',
	},
};

export const Disabled = {
	args: {
		label: 'Disabled',
		dropZoneText: 'Drag and drop files here or click to upload',
		helperText: 'Only .txt files are supported.',
		disabled: true,
	},
};
