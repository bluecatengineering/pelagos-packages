import type {FunctionComponent} from 'react';

interface FileUploaderProps {
	/** The component id. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The label text. */
	label?: string;
	/** Whether the field is required. */
	required?: boolean;
	/** The text to display in the drop zone. */
	dropZoneText?: string;
	/** The accepted file types. */
	types?: Array<{description: string; accept: Record<string, string[]>}>;
	/** Whether multiple files are allowed. */
	multiple?: boolean;
	/** The list of files already uploaded. */
	files: File[];
	/** Additional information for the field. */
	helperText?: string;
	/** The field level error text. */
	error?: string;
	/** Whether the field is disabled. */
	disabled?: boolean;
	/** Function invoked when the list of files changes. */
	onChange: (files: File[]) => void;
}

/** Accepts one or more files to upload. */
declare const FileUploader: FunctionComponent<FileUploaderProps>;
export default FileUploader;
