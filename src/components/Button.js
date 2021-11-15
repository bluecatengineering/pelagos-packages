import PropTypes from 'prop-types';

import useTooltip from '../hooks/useTooltip';

import './Button.less';

/** A button. */
const Button = ({id, text, className, tooltipText, size, type, disabled, onClick, ...props}) => {
	const tooltip = useTooltip(tooltipText, 'top');
	return (
		<button
			{...props}
			type={onClick ? 'button' : 'submit'}
			id={id}
			className={`Button Button--${size} Button--${type}${className ? ' ' + className : ''}`}
			disabled={disabled}
			ref={tooltip}
			onClick={onClick}
		>
			{text}
		</button>
	);
};

Button.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The text to display. */
	text: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
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

Button.defaultProps = {
	size: 'medium',
	type: 'tertiary',
};

export default Button;
