import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

import ToastTypes from '../ToastTypes';
import __ from '../strings';

import SvgIcon from './SvgIcon';
import './ToastMessage.less';

const REQUIRES_CLOSE = [ToastTypes.INFO, ToastTypes.WARNING, ToastTypes.ERROR];

const ToastMessage = ({message, onRemove}) => {
	const {type, text, onClick} = message;

	const handleClick = useCallback(() => {
		if (type !== ToastTypes.FATAL) {
			onRemove(message);
		}

		if (onClick) {
			onClick();
		}
	}, [message, onRemove]);

	let closeButton;
	let toastMessageClass = '';

	if (REQUIRES_CLOSE.includes(type)) {
		closeButton = (
			<div data-bcn-id="message-close" className="ToastMessage__close" role="button" aria-label={__('DISMISS')}>
				<SvgIcon icon={faTimes} />
			</div>
		);
		toastMessageClass = ' ToastMessage__text--closeable';
	}
	return (
		<div data-bcn-id={'toast-' + type} className={'ToastMessage ToastMessage--' + type} onClick={handleClick}>
			<div data-bcn-id="message" className={'ToastMessage__text' + toastMessageClass}>
				{text}
			</div>
			{closeButton}
		</div>
	);
};

ToastMessage.propTypes = {
	message: PropTypes.shape({
		type: PropTypes.string,
		text: PropTypes.string,
		onClick: PropTypes.func,
	}).isRequired,
	onRemove: PropTypes.func,
};

export default ToastMessage;
