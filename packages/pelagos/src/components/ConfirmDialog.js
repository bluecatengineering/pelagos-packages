import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';
import WarningAltFilled from '@carbon/icons-react/es/WarningAltFilled';

import Dialog from './Dialog';
import Button from './Button';
import './ConfirmDialog.less';

/** A confirmation dialog. */
const ConfirmDialog = ({
	title,
	helpHref,
	body,
	confirmText,
	confirmBtnType = 'primary',
	size = 'sm',
	onClose,
	onConfirm,
}) => (
	<Dialog title={title} helpHref={helpHref} role="alertdialog" size={size}>
		<div className="ConfirmDialog__body">
			<WarningAltFilled className="ConfirmDialog__icon" size={20} />
			<p className="ConfirmDialog__text">{body}</p>
		</div>
		<div>
			<Button id="closeDialogBtn" text={t`Cancel`} onClick={onClose} />
			<Button id="confirmBtn" text={confirmText} type={confirmBtnType} onClick={onConfirm} />
		</div>
	</Dialog>
);

ConfirmDialog.propTypes = {
	/** The dialog title. */
	title: PropTypes.string,
	/** The URL to use in the help link, if specified a link will be added in the header. */
	helpHref: PropTypes.string,
	/** The text to display in the dialog body. */
	body: PropTypes.string,
	/** The text to display in the confirm button. */
	confirmText: PropTypes.string,
	/** The confirm button type. */
	confirmBtnType: PropTypes.oneOf(['primary', 'dangerPrimary']),
	/** The dialog size. */
	size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
	/** Function invoked when the close button is clicked. */
	onClose: PropTypes.func,
	/** Function invoked when the confirm button is clicked. */
	onConfirm: PropTypes.func,
};

export default ConfirmDialog;
