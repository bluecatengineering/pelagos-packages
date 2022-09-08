import {useCallback} from 'react';
import PropTypes from 'prop-types';
import {t} from '@bluecat/l10n.macro';
import {faFileLines, faTrashCan} from '@fortawesome/free-regular-svg-icons';
import {faCloudArrowUp} from '@fortawesome/free-solid-svg-icons';

import LabelLine from '../components/LabelLine';
import SvgIcon from '../components/SvgIcon';
import IconButton from '../components/IconButton';
import useRandomId from '../hooks/useRandomId';

import FieldError from './FieldError';
import FieldHelper from './FieldHelper';
import './DropZone.less';

const handleClick = (event) => {
	event.currentTarget.firstChild.click();
};

const handleDragOver = (event) => {
	event.preventDefault();
	const dt = event.dataTransfer;
	dt.effectAllowed = 'copy';
	dt.dropEffect = 'copy';
};

const handleDragOverDisabled = (event) => {
	event.preventDefault();
	const dt = event.dataTransfer;
	dt.effectAllowed = 'none';
	dt.dropEffect = 'none';
};

const handleDragEnter = (event) => {
	const relatedTarget = event.relatedTarget;
	const currentTarget = event.currentTarget;
	if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
		currentTarget.classList.add('DropZone__content--active');
	}
};

const handleDragLeave = (event) => {
	const relatedTarget = event.relatedTarget;
	const currentTarget = event.currentTarget;
	if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
		currentTarget.classList.remove('DropZone__content--active');
	}
};

/** Input component which accepts a dropped file. */
const DropZone = ({
	id,
	className,
	label,
	optional,
	emptyHint,
	editingHint,
	uploadedHint,
	deleteTooltipText,
	fileName,
	helperText,
	error,
	editing,
	disabled,
	asFile,
	onDrop,
	onDelete,
}) => {
	id = useRandomId(id);
	const readFile = useCallback(
		(file) => {
			if (file) {
				if (asFile) {
					onDrop(file);
				} else {
					const reader = new FileReader();
					reader.onload = () => onDrop(file.name, reader.result);
					reader.readAsText(file);
				}
			}
		},
		[asFile, onDrop]
	);
	const handleDrop = useCallback(
		(event) => {
			event.preventDefault();
			event.currentTarget.classList.remove('DropZone__content--active');
			const {items, files} = event.dataTransfer;
			readFile(items ? items[0].getAsFile() : files[0]);
		},
		[readFile]
	);
	const handleChange = useCallback(
		(event) => {
			readFile(event.target.files[0]);
		},
		[readFile]
	);
	const helperId = `${id}-helper`;
	const errorId = `${id}-error`;
	return (
		<div className={`DropZone${className ? ` ${className}` : ''}`}>
			<LabelLine htmlFor={id} text={label} optional={optional && !fileName && !editing} />
			<button
				id={id}
				className={'DropZone__content' + (error ? ' DropZone__content--error' : '')}
				type="button"
				disabled={disabled}
				aria-describedby={error ? errorId : helperId}
				onClick={handleClick}
				onDragOver={disabled ? handleDragOverDisabled : handleDragOver}
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
			>
				<input style={{display: 'none'}} type="file" onChange={handleChange} />
				{fileName ? (
					<div className="DropZone__uploaded">
						<div>{t`"${fileName}" attached.`}</div>
						<SvgIcon icon={faFileLines} className="DropZone__icon DropZone__icon--uploaded" />
						<div className="DropZone__hint">{uploadedHint}</div>
					</div>
				) : editing ? (
					<div className="DropZone__uploaded">
						<div>{editingHint}</div>
						<SvgIcon icon={faFileLines} className="DropZone__icon DropZone__icon--uploaded" />
						<div className="DropZone__hint">{uploadedHint}</div>
					</div>
				) : (
					<div className="DropZone__empty">
						<div className="DropZone__hint">{emptyHint}</div>
						<SvgIcon icon={faCloudArrowUp} className="DropZone__icon DropZone__icon--empty" />
					</div>
				)}
			</button>
			{editing && onDelete && (
				<IconButton
					className="DropZone__delete"
					icon={faTrashCan}
					tooltipText={deleteTooltipText}
					tooltipPlacement="top"
					disabled={disabled}
				/>
			)}
			{error ? <FieldError id={errorId} text={error} /> : <FieldHelper id={helperId} text={helperText} />}
		</div>
	);
};

DropZone.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The label text. */
	label: PropTypes.string,
	/** Whether the field is optional. */
	optional: PropTypes.bool,
	/** The text to display when no file has been selected. */
	emptyHint: PropTypes.string,
	/** The text to display when no file has been selected in edit mode. */
	editingHint: PropTypes.string,
	/** The text to display when a file has been selected. */
	uploadedHint: PropTypes.string,
	/** The text to display as tooltip in the delete button. */
	deleteTooltipText: PropTypes.string,
	/** The name of the selected file. */
	fileName: PropTypes.string,
	/** Additional information for the field. */
	helperText: PropTypes.string,
	/** The error text. */
	error: PropTypes.string,
	/** Whether the field is in edit mode (changes optional and empty messages). */
	editing: PropTypes.bool,
	/** Whether the field is disabled. */
	disabled: PropTypes.bool,
	/** Whether the dropped File object should be passed to onDrop rather than the name and content. */
	asFile: PropTypes.bool,
	/** Function invoked when a file is dropped. */
	onDrop: PropTypes.func,
	/** Function invoked when the delete button is clicked. Setting this property enables the delete button. */
	onDelete: PropTypes.func,
};

export default DropZone;
