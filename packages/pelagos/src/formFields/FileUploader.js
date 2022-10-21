import {useCallback} from 'react';
import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';

import LabelLine from '../components/LabelLine';
import SvgIcon from '../components/SvgIcon';
import Layer from '../components/Layer';
import useRandomId from '../hooks/useRandomId';
import rhombusExclamation from '../icons/rhombusExclamation';
import xmarkThin from '../icons/xmarkThin';

import FieldError from './FieldError';
import FieldHelper from './FieldHelper';

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

const invokeOnChange = (onChange, multiple, files, selectedFiles) => {
	if (multiple) {
		const tmp = files.slice();
		// only safe way to iterate the "list" of files which is not a JS array in most cases
		for (const file of selectedFiles) {
			tmp.push(file);
		}
		onChange(tmp);
	} else {
		onChange([selectedFiles[0]]);
	}
};

const convertToAccept = (types) =>
	Array.from(new Set(types.flatMap(({accept}) => Object.entries(accept).flatMap(([k, v]) => [k, ...v])))).join(',');

/** Accepts one or more files to upload. */
const FileUploader = ({
	id,
	className,
	label,
	optional,
	description,
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

	const handleClick = useCallback(
		(event) =>
			window.showOpenFilePicker
				? showOpenFilePicker({multiple, types})
						.then((handles) => Promise.all(handles.map((handle) => handle.getFile())))
						.then((selectedFiles) => invokeOnChange(onChange, multiple, files, selectedFiles))
						.catch(() => {
							/* ignore all errors */
						})
				: event.currentTarget.nextSibling.click(),
		[files, multiple, onChange, types]
	);
	const handleDrop = useCallback(
		(event) => {
			event.preventDefault();
			event.currentTarget.classList.remove('FileUploader__dropZone--active');
			invokeOnChange(onChange, multiple, files, event.dataTransfer.files);
		},
		[files, multiple, onChange]
	);
	const handleChange = useCallback(
		(event) => {
			invokeOnChange(onChange, multiple, files, event.target.files);
		},
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
			<LabelLine htmlFor={id} text={label} optional={optional && !files?.length} />
			<div className={`FileUploader__description${disabled ? ' FileUploader__description--disabled' : ''}`}>
				{description}
			</div>
			<button
				id={id}
				className={`FileUploader__dropZone${error ? ' FileUploader__dropZone--error' : ''}`}
				type="button"
				disabled={disabled}
				aria-describedby={error ? errorId : helperId}
				onClick={handleClick}
				onDragOver={disabled ? null : handleDragOver}
				onDragEnter={disabled ? null : handleDragEnter}
				onDragLeave={disabled ? null : handleDragLeave}
				onDrop={disabled ? null : handleDrop}>
				{dropZoneText}
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
			{files?.length ? (
				<div className="FileUploader__files" onClick={handleRemoveClick}>
					{files.map(({name, error}, index) => (
						<Layer key={index} className={`FileUploader__file${error ? ' FileUploader__file--error' : ''}`}>
							<p className="FileUploader__fileName" title={name}>
								{name}
							</p>
							<div className="FileUploader__fileIcons">
								{error && <SvgIcon className="FileUploader__errorIcon" icon={rhombusExclamation} />}
								<button
									className="FileUploader__fileRemove"
									type="button"
									aria-label={t`Remove ${name}`}
									data-testid="remove-file"
									data-index={index}>
									<SvgIcon icon={xmarkThin} />
								</button>
							</div>
							{error && <div className="FileUploader__fileError">{error}</div>}
						</Layer>
					))}
				</div>
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
	/** Whether the field is optional. */
	optional: PropTypes.bool,
	/** Description of the field's purpose. */
	description: PropTypes.string,
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
	onChange: PropTypes.func,
};

export default FileUploader;
