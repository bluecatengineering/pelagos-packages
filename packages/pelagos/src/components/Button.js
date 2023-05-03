import PropTypes from 'prop-types';

import useTooltip from '../hooks/useTooltip';

import SvgIcon from './SvgIcon';

import './Button.less';

/** A button. */
const Button = ({id, className, text, icon, tooltipText, size, type, disabled, onClick, ...props}) => {
	const tooltip = useTooltip(tooltipText, 'top');
	return disabled ? (
		<span
			id={id}
			className={`Button Button--${size} Button--${type}${className ? ' ' + className : ''}`}
			aria-disabled="true"
			ref={tooltip}>
			{text}
			{icon && <SvgIcon className="Button__icon" icon={icon} />}
		</span>
	) : (
		<button
			{...props}
			type={onClick ? 'button' : 'submit'}
			id={id}
			className={`Button Button--${size} Button--${type}${className ? ' ' + className : ''}`}
			ref={tooltip}
			onClick={onClick}>
			{text}
			{icon && <SvgIcon className="Button__icon" icon={icon} />}
		</button>
	);
};

Button.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The text to display. */
	text: PropTypes.string,
	/** The object representing the icon. (using FontAwesome, etc.) */
	icon: PropTypes.object,
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
