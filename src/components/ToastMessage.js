import {useCallback, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {t} from '@bluecat/l10n.macro';
import {faCircleCheck, faTriangleExclamation, faCircleInfo} from '@fortawesome/free-solid-svg-icons';

import ToastTypes from '../toasts/ToastTypes';
import rhombusExclamation from '../icons/rhombusExclamation';
import xmarkThin from '../icons/xmarkThin';

import Button from './Button';
import SvgIcon from './SvgIcon';
import './ToastMessage.less';

const SHORT_DURATION = 3000;
const DEFAULT_DURATION = 8000;
const REQUIRES_CLOSE = [ToastTypes.INFO, ToastTypes.WARNING, ToastTypes.ERROR];

const icons = {
	success: faCircleCheck,
	info: faCircleInfo,
	warning: faTriangleExclamation,
	error: rhombusExclamation,
	fatal: rhombusExclamation,
};

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

	const {id, type: tmp, text, actionText} = message;
	const type = tmp === ToastTypes.ACTION ? ToastTypes.INFO : tmp;
	const requiresClose = REQUIRES_CLOSE.includes(type);
	return (
		<div id={`toast-${id}`} className={`ToastMessage ToastMessage--${type}`} role="alert" data-testid={`toast-${type}`}>
			<SvgIcon className="ToastMessage__icon" icon={icons[type]} />
			<div data-testid="message" className="ToastMessage__text">
				{text}
			</div>
			{actionText && (
				<Button
					className="ToastMessage__button"
					text={actionText}
					size="small"
					type="ghost"
					data-testid="toast-button"
					onClick={handleActionClick}
				/>
			)}
			{requiresClose && (
				<button
					className="ToastMessage__close"
					type="button"
					aria-label={t`Dismiss`}
					data-testid="toast-close"
					onClick={handleCloseClick}
				>
					<SvgIcon icon={xmarkThin} />
				</button>
			)}
			{type !== ToastTypes.FATAL && !actionText && <div className="ToastMessage__time" ref={progressRef} />}
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
