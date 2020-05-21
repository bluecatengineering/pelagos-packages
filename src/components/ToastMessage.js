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
	}, [type, message, onRemove, onClick]);

	let closeButton;
	let toastMessageClass = '';

	if (REQUIRES_CLOSE.includes(type)) {
		closeButton = (
			<div data-testid="message-close" className="ToastMessage__close" role="button" aria-label={__('DISMISS')}>
				<SvgIcon icon={faTimes} />
			</div>
		);
		toastMessageClass = ' ToastMessage__text--closeable';
	}
	return (
		<div
			data-testid={'toast-' + type}
			className={'ToastMessage ToastMessage--' + type}
			role="alert"
			onClick={handleClick}>
			<div data-testid="message" className={'ToastMessage__text' + toastMessageClass}>
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
