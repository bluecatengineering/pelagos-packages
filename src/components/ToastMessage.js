import {useCallback, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

import ToastTypes from '../ToastTypes';
import timesThin from '../icons/timesThin';
import __ from '../strings';

import Button from './Button';
import SvgIcon from './SvgIcon';
import './ToastMessage.less';

const SHORT_DURATION = 3000;
const DEFAULT_DURATION = 8000;
const REQUIRES_CLOSE = [ToastTypes.INFO, ToastTypes.WARNING, ToastTypes.ERROR];

const ToastMessage = ({message, onRemove}) => {
	const progressRef = useRef(null);

	const handleActionClick = useCallback(() => (onRemove(message), message.onClick()), [message, onRemove]);

	const handleCloseClick = useCallback(() => onRemove(message), [message, onRemove]);

	useEffect(() => {
		const progress = progressRef.current;
		if (progress) {
			const parent = progress.parentNode;
			let animation = progress.animate(
				[{width: '100%'}, {width: '0'}],
				message.type === ToastTypes.SUCCESS ? SHORT_DURATION : DEFAULT_DURATION
			);
			animation.onfinish = () => ((animation = null), onRemove(message));
			parent.addEventListener('mouseenter', () => (animation ? animation.pause() : null));
			parent.addEventListener('mouseleave', () => (animation ? animation.play() : null));
			return () => (animation ? animation.cancel() : null);
		}
		return undefined;
	}, [message, onRemove]);

	const {id, type, text, actionText} = message;
	const requiresClose = REQUIRES_CLOSE.includes(type);
	return (
		<div id={`toast-${id}`} className={`ToastMessage ToastMessage--${type}`} role="alert" data-testid={`toast-${type}`}>
			<div
				data-testid="message"
				className={`ToastMessage__text${requiresClose ? ' ToastMessage__text--closeable' : ''}`}>
				{text}
			</div>
			{type === ToastTypes.ACTION && (
				<Button
					className="ToastMessage__button"
					text={actionText}
					size="small"
					type="primary"
					onClick={handleActionClick}
				/>
			)}
			{requiresClose && (
				<div
					data-testid="message-close"
					className="ToastMessage__close"
					role="button"
					aria-label={__('DISMISS')}
					onClick={handleCloseClick}>
					<SvgIcon icon={timesThin} />
				</div>
			)}
			{type !== ToastTypes.FATAL && type !== ToastTypes.ACTION && (
				<div className="ToastMessage__time" ref={progressRef} />
			)}
		</div>
	);
};

ToastMessage.propTypes = {
	message: PropTypes.shape({
		id: PropTypes.string,
		type: PropTypes.string,
		text: PropTypes.string,
		actionText: PropTypes.string,
		onClick: PropTypes.func,
	}).isRequired,
	onRemove: PropTypes.func,
};

export default ToastMessage;
