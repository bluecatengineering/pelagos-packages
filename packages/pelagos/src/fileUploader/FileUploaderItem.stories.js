import FileUploaderItem from './FileUploaderItem';

export default {
	title: 'Components/FileUploaderItem',
	component: FileUploaderItem,
};

export const Default = {
	args: {name: 'foo.txt'},
};

export const Error = {
	args: {name: 'foo.bin', error: 'File type not supported.'},
};

export const DisableDelete = {
	args: {name: 'foo.txt', disableDelete: true},
};
