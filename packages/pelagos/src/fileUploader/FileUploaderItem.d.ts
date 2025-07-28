import type {FunctionComponent, MouseEventHandler} from 'react';

interface FileUploaderItemProps {
	/** The component class name(s). */
	className?: string;
	/** The file name. */
	name?: string;
	/** The error message. */
	error?: string;
	/** Whether the delete button is disabled. */
	disableDelete?: boolean;
	/** Function invoked when the delete button is clicked. */
	onDelete: MouseEventHandler<HTMLButtonElement>;
}

/** An uploaded file in a file uploader. */
declare const FileUploaderItem: FunctionComponent<FileUploaderItemProps>;
export default FileUploaderItem;
