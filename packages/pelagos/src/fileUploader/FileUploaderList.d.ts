import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

interface FileUploaderListProps extends HTMLProps<HTMLUListElement> {
	/** The component class name(s). */
	className?: string;
	/** The child elements. */
	children?: ReactNode;
}

/** A list of files in a file uploader. */
declare const FileUploaderList: FunctionComponent<FileUploaderListProps>;
export default FileUploaderList;
