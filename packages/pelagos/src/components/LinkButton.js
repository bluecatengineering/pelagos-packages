import {useCallback} from 'react';
import PropTypes from 'prop-types';

import useTooltip from '../hooks/useTooltip';

import './Button.less';
import './LinkButton.less';

/** A link styled as a button. */
const LinkButton = ({
	as: BaseComponent = 'a',
	id,
	className,
	text,
	tooltipText,
	size = 'medium',
	type = 'tertiary',
	disabled,
	onKeyDown,
	...props
}) => {
	const tooltip = useTooltip(tooltipText, 'top');
	// The handler set by the caller runs first, it can call preventDefault to skip the default behaviour
	const handleKeyDown = useCallback(
		(event) => {
			onKeyDown?.(event);
			if (!event.defaultPrevented && event.key === ' ') {
				// Space would also scroll the page
				event.preventDefault();
				event.target.click();
			}
		},
		[onKeyDown]
	);
	return disabled ? (
		<span
			id={id}
			className={`Button Button--${size} Button--${type}${className ? ` ${className}` : ''}`}
			aria-disabled="true"
			ref={tooltip}>
			{text}
		</span>
	) : (
		<BaseComponent
			{...props}
			id={id}
			className={`Button Button--${size} Button--${type}${className ? ` ${className}` : ''}`}
			ref={tooltip}
			onKeyDown={handleKeyDown}>
			{text}
		</BaseComponent>
	);
};

LinkButton.propTypes = {
	/** Element or custom component to use as main element. */
	as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The link URL. */
	href: PropTypes.string,
	/** The text to display. */
	text: PropTypes.string.isRequired,
	/** The tooltip text to display. Custom components must support `ref` forwarding. */
	tooltipText: PropTypes.string,
	/** The size of the button. */
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	/** The button type. */
	type: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'ghost']),
	/** Whether the button is disabled. */
	disabled: PropTypes.bool,
	/** Function invoked when the button is clicked. */
	onClick: PropTypes.func,
	/** Function invoked when a key is pressed, before the default behaviour which is skipped if it calls preventDefault. */
	onKeyDown: PropTypes.func,
};

export default LinkButton;
