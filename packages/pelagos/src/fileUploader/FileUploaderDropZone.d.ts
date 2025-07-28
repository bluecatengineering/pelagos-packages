import type {FunctionComponent, HTMLProps} from 'react';

interface FileUploaderDropZoneProps extends HTMLProps<HTMLButtonElement> {
	/** The component id. */
	id?: string;
	/** The label text. */
	label?: string;
	/** The text to display. */
	text?: string;
	/** The accepted file types. */
	types?: Array<{description: string; accept: Record<string, string[]>}>;
	/** Whether the field is required. */
	required?: boolean;
	/** Whether multiple files are allowed. */
	multiple?: boolean;
	/** Whether the component is in error. */
	error?: boolean;
	/** Whether the field is disabled. */
	disabled?: boolean;
	/** Function invoked when the list of files changes. */
	onAddFiles: (files: File[]) => void;
}

/** Drop zone for a file uploader. */
declare const FileUploaderDropZone: FunctionComponent<FileUploaderDropZoneProps>;
export default FileUploaderDropZone;
