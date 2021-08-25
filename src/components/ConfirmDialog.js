import PropTypes from 'prop-types';
import {t} from '@bluecat/l10n.macro';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';

import Dialog from './Dialog';
import SvgIcon from './SvgIcon';
import Button from './Button';
import './ConfirmDialog.less';

const ConfirmDialog = ({title, body, confirmText, onClose, onConfirm}) => (
	<Dialog title={title} role="alertdialog">
		<div className="ConfirmDialog__body">
			<SvgIcon className="ConfirmDialog__icon" icon={faExclamationTriangle} />
			{body}
		</div>
		<div>
			<Button id="closeDialogBtn" text={t`Cancel`} onClick={onClose} />
			<Button id="confirmBtn" text={confirmText} type="primary" onClick={onConfirm} />
		</div>
	</Dialog>
);

ConfirmDialog.propTypes = {
	title: PropTypes.string,
	body: PropTypes.string,
	confirmText: PropTypes.string,
	onClose: PropTypes.func,
	onConfirm: PropTypes.func,
};

export default ConfirmDialog;
