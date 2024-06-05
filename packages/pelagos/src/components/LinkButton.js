import {useCallback} from 'react';
import PropTypes from 'prop-types';

import useTooltip from '../hooks/useTooltip';

import './Button.less';
import './LinkButton.less';

/** A link styled as a button. */
const LinkButton = ({
	id,
	className,
	text,
	tooltipText,
	size = 'medium',
	type = 'tertiary',
	disabled,
	onClick,
	...props
}) => {
	const tooltip = useTooltip(tooltipText, 'top');
	const handleKeyDown = useCallback((event) => {
		if (event.key === ' ') {
			event.target.click();
		}
	}, []);
	return disabled ? (
		<span
			id={id}
			className={`Button Button--${size} Button--${type}${className ? ` ${className}` : ''}`}
			aria-disabled="true"
			ref={tooltip}>
			{text}
		</span>
	) : (
		<a
			{...props}
			id={id}
			className={`Button Button--${size} Button--${type}${className ? ` ${className}` : ''}`}
			ref={tooltip}
			onKeyDown={handleKeyDown}
			onClick={onClick}>
			{text}
		</a>
	);
};

LinkButton.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The link URL. */
	href: PropTypes.string,
	/** The text to display. */
	text: PropTypes.string,
	/** The tooltip text to display. */
	tooltipText: PropTypes.string,
	/** The size of the button. */
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	/** The button type. */
	type: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'ghost']),
	/** Whether the button is disabled. */
	disabled: PropTypes.bool,
	/** Function invoked when the button is clicked. */
	onClick: PropTypes.func,
};

export default LinkButton;
