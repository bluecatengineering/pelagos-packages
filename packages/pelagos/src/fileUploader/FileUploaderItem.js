import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';
import Close from '@carbon/icons-react/es/Close';
import WarningFilled from '@carbon/icons-react/es/WarningFilled';

import Layer from '../components/Layer';

import './FileUploader.less';

/** An uploaded file in a file uploader. */
const FileUploaderItem = ({className, name, error, disableDelete, onDelete, ...props}) => (
	<Layer
		as="li"
		className={`FileUploader__file${error ? ' FileUploader__file--error' : ''}${className ? ` ${className}` : ''}`}>
		<div className="FileUploader__fileName" title={name}>
			{name}
		</div>
		<div className="FileUploader__fileIcons">
			{error && <WarningFilled className="FileUploader__errorIcon" />}
			<button
				{...props}
				className="FileUploader__fileRemove"
				type="button"
				disabled={disableDelete}
				aria-label={t`Delete ${name}`}
				onClick={onDelete}>
				<Close />
			</button>
		</div>
		{error && <div className="FileUploader__fileError">{error}</div>}
	</Layer>
);

FileUploaderItem.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The file name. */
	name: PropTypes.string,
	/** The error message. */
	error: PropTypes.string,
	/** Whether the delete button is disabled. */
	disableDelete: PropTypes.bool,
	/** Function invoked when the delete button is clicked. */
	onDelete: PropTypes.func,
};

export default FileUploaderItem;
