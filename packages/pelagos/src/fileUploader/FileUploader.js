import {useCallback} from 'react';
import PropTypes from 'prop-types';

import LabelLine from '../components/LabelLine';
import useRandomId from '../hooks/useRandomId';
import FieldError from '../formFields/FieldError';
import FieldHelper from '../formFields/FieldHelper';

import FileUploaderDropZone from './FileUploaderDropZone';
import FileUploaderList from './FileUploaderList';
import FileUploaderItem from './FileUploaderItem';

import './FileUploader.less';

/** Accepts one or more files to upload. */
const FileUploader = ({
	id,
	className,
	label,
	required,
	dropZoneText,
	files,
	helperText,
	error,
	disabled,
	multiple,
	types,
	onChange,
}) => {
	id = useRandomId(id);
	const helperId = `${id}-helper`;
	const errorId = `${id}-error`;

	const handleAddFiles = useCallback(
		(addedFiles) => onChange(multiple ? [...files, ...addedFiles] : [addedFiles[0]]),
		[files, multiple, onChange]
	);

	const handleRemoveClick = useCallback(
		(event) => {
			const button = event.target.closest('button');
			if (button) {
				const index = +button.dataset.index;
				onChange(files.filter((_, i) => i !== index));
			}
		},
		[files, onChange]
	);

	return (
		<div className={`FileUploader${className ? ` ${className}` : ''}`}>
			<LabelLine htmlFor={id} text={label} required={required} error={!!error} />
			<FileUploaderDropZone
				id={id}
				label={label}
				text={dropZoneText}
				types={types}
				required={required}
				multiple={multiple}
				error={!!error}
				disabled={disabled}
				aria-describedby={error ? errorId : helperId}
				onAddFiles={handleAddFiles}
			/>
			{files?.length ? (
				<FileUploaderList onClick={handleRemoveClick}>
					{files.map(({name, error}, index) => (
						<FileUploaderItem
							key={index}
							name={name}
							error={error}
							disableDelete={disabled}
							data-testid="remove-file"
							data-index={index}
						/>
					))}
				</FileUploaderList>
			) : null}
			{error ? <FieldError id={errorId} text={error} /> : <FieldHelper id={helperId} text={helperText} />}
		</div>
	);
};

FileUploader.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The label text. */
	label: PropTypes.string,
	/** Whether the field is required. */
	required: PropTypes.bool,
	/** The text to display in the drop zone. */
	dropZoneText: PropTypes.string,
	/** The accepted file types. */
	types: PropTypes.array,
	/** Whether multiple files are allowed. */
	multiple: PropTypes.bool,
	/** The list of files already uploaded. */
	files: PropTypes.array,
	/** Additional information for the field. */
	helperText: PropTypes.string,
	/** The field level error text. */
	error: PropTypes.string,
	/** Whether the field is disabled. */
	disabled: PropTypes.bool,
	/** Function invoked when the list of files changes. */
	onChange: PropTypes.func.isRequired,
};

export default FileUploader;
