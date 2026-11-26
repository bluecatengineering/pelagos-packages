import {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';
import CheckmarkFilled from '@carbon/icons-react/es/CheckmarkFilled';
import InformationFilled from '@carbon/icons-react/es/InformationFilled';
import WarningFilled from '@carbon/icons-react/es/WarningFilled';
import ErrorFilled from '@carbon/icons-react/es/ErrorFilled';
import Close from '@carbon/icons-react/es/Close';

import useRandomId from '../hooks/useRandomId';
import addResizeObserver from '../functions/addResizeObserver';
import getNextFocusTarget from '../functions/getNextFocusTarget';

import Button from './Button';
import './InlineNotification.less';

const icons = {
	success: CheckmarkFilled,
	info: InformationFilled,
	warning: WarningFilled,
	error: ErrorFilled,
};

// below this notification width the action moves under the text
const NARROW_WIDTH = 480;

/** A notification to be used inside other components. */
const InlineNotification = ({className, type, title, text, actionText, onAction, onClose, ...props}) => {
	const id = useRandomId();
	const ref = useRef(null);
	const [narrow, setNarrow] = useState(false);

	const titleId = `${id}-title`;
	const textId = `${id}-text`;
	const describedBy = title ? titleId : textId;

	const handleClose = useCallback(() => {
		// move focus before the parent removes the notification, otherwise the browser moves it to the body
		getNextFocusTarget(ref.current)?.focus();
		onClose();
	}, [onClose]);

	// a container query would need inline-size containment, which collapses the notification when it is sized by its content
	useEffect(() => {
		const element = ref.current;
		return addResizeObserver(element, () => setNarrow(element.offsetWidth < NARROW_WIDTH));
	}, []);

	const Icon = icons[type];
	return (
		<div
			role={type === 'error' ? 'alert' : 'status'}
			{...props}
			className={`InlineNotification InlineNotification--${type}${narrow ? ' InlineNotification--narrow' : ''}${className ? ` ${className}` : ''}`}
			ref={ref}>
			<Icon className="InlineNotification__icon" size={20} />
			<div className="InlineNotification__content">
				<div className="InlineNotification__wrapper">
					{title && (
						<span id={titleId} className="InlineNotification__title">
							{title}
						</span>
					)}
					<span id={textId}>{text}</span>
				</div>
				{actionText && (
					<Button
						className="InlineNotification__action"
						text={actionText}
						size="small"
						type="ghost"
						aria-describedby={describedBy}
						onClick={onAction}
					/>
				)}
			</div>
			{onClose && (
				<button
					className="InlineNotification__close"
					type="button"
					aria-label={t`Dismiss`}
					aria-describedby={describedBy}
					onClick={handleClose}>
					<Close size={20} />
				</button>
			)}
		</div>
	);
};

InlineNotification.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The notification type. When used as callout, only `info` and `warning` are valid. */
	type: PropTypes.oneOf(['success', 'info', 'warning', 'error']).isRequired,
	/** The notification title. */
	title: PropTypes.string,
	/** The notification text. */
	text: PropTypes.node.isRequired,
	/** The action button text, if set an action button is displayed. The notification never moves focus when it appears. */
	actionText: PropTypes.string,
	/** Function invoked when the action button is clicked, required if `actionText` is set. */
	onAction: PropTypes.func,
	/**
	 * Function invoked when the close button is clicked, if set a close button is displayed. Before it is invoked, focus
	 * moves to the next focusable element after the notification, or the nearest one before it. The parent is expected
	 * to remove the notification.
	 */
	onClose: PropTypes.func,
};

export default InlineNotification;
