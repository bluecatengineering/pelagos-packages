import {useCallback} from 'react';
import PropTypes from 'prop-types';
import {t} from '@bluecat/l10n.macro';
import {faFileAlt} from '@fortawesome/free-regular-svg-icons';
import {faCloudUploadAlt} from '@fortawesome/free-solid-svg-icons';

import LabelLine from '../components/LabelLine';
import SvgIcon from '../components/SvgIcon';

import FieldError from './FieldError';
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
	fileName,
	error,
	editing,
	onDrop,
}) => {
	const readFile = useCallback(
		(file) => {
			if (file) {
				const reader = new FileReader();
				reader.onload = () => onDrop(file.name, reader.result);
				reader.readAsText(file);
			}
		},
		[onDrop]
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
	return (
		<div className={`DropZone${className ? ` ${className}` : ''}`}>
			<LabelLine htmlFor={id} text={label} optional={optional && !fileName && !editing} />
			<div
				id={id}
				className={'DropZone__content' + (error ? ' DropZone__content--error' : '')}
				tabIndex={0}
				role="button"
				onClick={handleClick}
				onDragOver={handleDragOver}
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
			>
				<input style={{display: 'none'}} type="file" onChange={handleChange} />
				{fileName ? (
					<div className="DropZone__uploaded">
						<div>{t`"${fileName}" attached.`}</div>
						<SvgIcon icon={faFileAlt} className="DropZone__icon DropZone__icon--uploaded" />
						<div className="DropZone__hint">{uploadedHint}</div>
					</div>
				) : editing ? (
					<div className="DropZone__uploaded">
						<div>{editingHint}</div>
						<SvgIcon icon={faFileAlt} className="DropZone__icon DropZone__icon--uploaded" />
						<div className="DropZone__hint">{uploadedHint}</div>
					</div>
				) : (
					<div className="DropZone__empty">
						<div className="DropZone__hint">{emptyHint}</div>
						<SvgIcon icon={faCloudUploadAlt} className="DropZone__icon DropZone__icon--empty" />
					</div>
				)}
			</div>
			<FieldError text={error} />
		</div>
	);
};

DropZone.propTypes = {
	/** The component id. */
	id: PropTypes.string.isRequired,
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
	/** The name of the selected file. */
	fileName: PropTypes.string,
	/** The error text. */
	error: PropTypes.string,
	/** Whether the field is in edit mode (changes optional and empty messages). */
	editing: PropTypes.bool,
	/** Function invoked when a file is dropped. */
	onDrop: PropTypes.func,
};

export default DropZone;
