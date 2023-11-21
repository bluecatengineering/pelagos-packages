import {useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import {select, t} from '@bluecateng/l10n.macro';

import './FileUploader.less';

const handleDragOver = (event) => {
	event.preventDefault();
	const dt = event.dataTransfer;
	dt.effectAllowed = 'copy';
	dt.dropEffect = 'copy';
};

const handleDragEnter = (event) => {
	const relatedTarget = event.relatedTarget;
	const currentTarget = event.currentTarget;
	if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
		currentTarget.classList.add('FileUploader__dropZone--active');
	}
};

const handleDragLeave = (event) => {
	const relatedTarget = event.relatedTarget;
	const currentTarget = event.currentTarget;
	if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
		currentTarget.classList.remove('FileUploader__dropZone--active');
	}
};

const invokeOnAddFiles = (onAddFiles, liveRef, selectedFiles) => {
	liveRef.current.textContent =
		selectedFiles.length === 1
			? t`File ${selectedFiles[0].name} uploaded`
			: t`Files ${selectedFiles.map((file) => file.name).join(', ')} uploaded`;
	onAddFiles(selectedFiles);
};

const convertToAccept = (types) =>
	types
		? Array.from(new Set(types.flatMap(({accept}) => Object.entries(accept).flatMap(([k, v]) => [k, ...v])))).join(',')
		: null;

/** Drop zone for a file uploader. */
const FileUploaderDropZone = ({id, label, text, types, required, multiple, error, disabled, onAddFiles, ...props}) => {
	const liveRef = useRef();

	const handleClick = useCallback(
		(event) =>
			window.showOpenFilePicker
				? showOpenFilePicker({multiple, types})
						.then((handles) => Promise.all(handles.map((handle) => handle.getFile())))
						.then((selectedFiles) => invokeOnAddFiles(onAddFiles, liveRef, selectedFiles))
						.catch(() => {
							/* ignore all errors */
						})
				: event.currentTarget.nextSibling.click(),
		[multiple, onAddFiles, types]
	);
	const handleDrop = useCallback(
		(event) => {
			event.preventDefault();
			event.currentTarget.classList.remove('FileUploader__dropZone--active');
			const files = event.dataTransfer.files;
			if (files?.length) {
				invokeOnAddFiles(onAddFiles, liveRef, Array.from(files));
			}
		},
		[onAddFiles]
	);
	const handleChange = useCallback(
		(event) => {
			invokeOnAddFiles(onAddFiles, liveRef, Array.from(event.target.files));
		},
		[onAddFiles]
	);
	return (
		<div>
			<div className="sr-only" aria-live="polite" ref={liveRef} />
			<button
				{...props}
				id={id}
				className="FileUploader__dropZone"
				type="button"
				disabled={disabled}
				aria-invalid={error}
				aria-label={select(required, {true: `${label}, required. ${text}`, other: `${label}. ${text}`})}
				onClick={handleClick}
				onDragOver={disabled ? null : handleDragOver}
				onDragEnter={disabled ? null : handleDragEnter}
				onDragLeave={disabled ? null : handleDragLeave}
				onDrop={disabled ? null : handleDrop}>
				{text}
			</button>
			{window.showOpenFilePicker ? null : (
				<input
					type="file"
					className="FileUploader__input"
					multiple={multiple}
					accept={convertToAccept(types)}
					onChange={handleChange}
				/>
			)}
		</div>
	);
};

FileUploaderDropZone.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The label text. */
	label: PropTypes.string,
	/** The text to display. */
	text: PropTypes.string,
	/** The accepted file types. */
	types: PropTypes.array,
	/** Whether the field is required. */
	required: PropTypes.bool,
	/** Whether multiple files are allowed. */
	multiple: PropTypes.bool,
	/** Whether the component is in error. */
	error: PropTypes.bool,
	/** Whether the field is disabled. */
	disabled: PropTypes.bool,
	/** Function invoked when files are added. */
	onAddFiles: PropTypes.func,
};

export default FileUploaderDropZone;
