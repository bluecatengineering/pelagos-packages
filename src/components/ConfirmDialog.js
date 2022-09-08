import PropTypes from 'prop-types';
import {t} from '@bluecat/l10n.macro';
import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';

import Dialog from './Dialog';
import SvgIcon from './SvgIcon';
import Button from './Button';
import './ConfirmDialog.less';

const ConfirmDialog = ({title, body, confirmText, size, onClose, onConfirm}) => (
	<Dialog title={title} role="alertdialog" size={size}>
		<div className="ConfirmDialog__body">
			<SvgIcon className="ConfirmDialog__icon" icon={faTriangleExclamation} />
			<p className="ConfirmDialog__text">{body}</p>
		</div>
		<div>
			<Button id="closeDialogBtn" text={t`Cancel`} onClick={onClose} />
			<Button id="confirmBtn" text={confirmText} type="primary" onClick={onConfirm} />
		</div>
	</Dialog>
);

ConfirmDialog.propTypes = {
	/** The dialog title. */
	title: PropTypes.string,
	/** The text to display in the dialog body. */
	body: PropTypes.string,
	/** The text to display in the confirm button. */
	confirmText: PropTypes.string,
	/** The dialog size. */
	size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
	/** Function invoked when the close button is clicked. */
	onClose: PropTypes.func,
	/** Function invoked when the confirm button is clicked. */
	onConfirm: PropTypes.func,
};

ConfirmDialog.defaultProps = {
	size: 'sm',
};

export default ConfirmDialog;
