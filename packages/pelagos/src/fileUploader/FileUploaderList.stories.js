import FileUploaderList from './FileUploaderList';
import FileUploaderItem from './FileUploaderItem';

export default {
	title: 'Components/FileUploaderList',
	component: FileUploaderList,
};

export const Default = {
	args: {
		children: [
			<FileUploaderItem key="foo" name="foo.txt" />,
			<FileUploaderItem key="bar" name="bar.bin" error="File type not supported." />,
			<FileUploaderItem key="baz" name="baz.txt" disableDelete />,
		],
	},
};
