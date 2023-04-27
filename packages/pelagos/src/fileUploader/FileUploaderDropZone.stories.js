import FileUploaderDropZone from './FileUploaderDropZone';

export default {
	title: 'Components/FileUploaderDropZone',
	component: FileUploaderDropZone,
};

export const Default = {
	args: {
		label: 'Default',
		text: 'Drag and drop files here or click to upload',
		types: [{description: 'Text files', accept: {'text/plain': ['.txt']}}],
	},
};

export const Error = {
	args: {
		label: 'Default',
		text: 'Drag and drop files here or click to upload',
		types: [{description: 'Text files', accept: {'text/plain': ['.txt']}}],
		error: true,
	},
};

export const Disabled = {
	args: {
		label: 'Default',
		text: 'Drag and drop files here or click to upload',
		types: [{description: 'Text files', accept: {'text/plain': ['.txt']}}],
		disabled: true,
	},
};
