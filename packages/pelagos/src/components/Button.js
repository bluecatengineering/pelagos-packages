import {forwardRef} from 'react';
import PropTypes from 'prop-types';

import setRefs from '../functions/setRefs';
import useTooltip from '../hooks/useTooltip';

import SvgIcon from './SvgIcon';

import './Button.less';

/** A button. */
const Button = forwardRef(
	({id, className, text, children, icon, tooltipText, size, type, disabled, onClick, ...props}, ref) => {
		const tooltip = useTooltip(tooltipText, 'top');
		const refs = ref ? setRefs(ref, tooltip) : tooltip;
		return disabled ? (
			<span
				id={id}
				className={`Button Button--${size} Button--${type}${className ? ' ' + className : ''}`}
				aria-disabled="true"
				ref={refs}>
				{children || text}
				{icon && <SvgIcon className="Button__icon" icon={icon} />}
			</span>
		) : (
			<button
				{...props}
				type={onClick ? 'button' : 'submit'}
				id={id}
				className={`Button Button--${size} Button--${type}${className ? ' ' + className : ''}`}
				ref={refs}
				onClick={onClick}>
				{children || text}
				{icon && <SvgIcon className="Button__icon" icon={icon} />}
			</button>
		);
	}
);

Button.displayName = 'Button';

Button.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The text to display. */
	text: PropTypes.string,
	/** The child elements, can be provided instead of text. */
	children: PropTypes.node,
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
