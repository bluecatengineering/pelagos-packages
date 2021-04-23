import {useCallback, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

import ToastTypes from '../toasts/ToastTypes';
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
			let animation = progress.animate([{transform: 'scaleX(1)'}, {transform: 'scaleX(0)'}], {
				duration: message.type === ToastTypes.SUCCESS ? SHORT_DURATION : DEFAULT_DURATION,
				fill: 'both',
			});
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
					data-testid="toast-button"
					onClick={handleActionClick}
				/>
			)}
			{requiresClose && (
				<div
					className="ToastMessage__close"
					role="button"
					aria-label={__('DISMISS')}
					data-testid="toast-close"
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
