import PropTypes from 'prop-types';

import useTooltip from '../hooks/useTooltip';

import SvgIcon from './SvgIcon';
import './IconButton.less';

/** An icon button. */
const IconButton = ({id, icon, className, size, type, tooltipText, tooltipPlacement, disabled, onClick, ...props}) => {
	const tooltip = useTooltip(tooltipText, tooltipPlacement);
	return disabled ? (
		<span
			{...props}
			id={id}
			className={`IconButton IconButton--${size} IconButton--${type}${className ? ` ${className}` : ''}`}
			aria-disabled="true"
			ref={tooltip}
		>
			<SvgIcon icon={icon} />
		</span>
	) : (
		<button
			{...props}
			id={id}
			className={`IconButton IconButton--${size} IconButton--${type}${className ? ` ${className}` : ''}`}
			type="button"
			ref={tooltip}
			onClick={onClick}
		>
			<SvgIcon icon={icon} />
		</button>
	);
};

IconButton.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The object representing the icon. (using FontAwesome, etc.) */
	icon: PropTypes.object.isRequired,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The component size. */
	size: PropTypes.oneOf(['medium', 'large']),
	/** The button type. */
	type: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'ghost']),
	/** The tooltip text to display. */
	tooltipText: PropTypes.string,
	/** The placement of the tooltip relative to the button. */
	tooltipPlacement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
	/** Whether the button is disabled. */
	disabled: PropTypes.bool,
	/** Function invoked when the button is clicked. */
	onClick: PropTypes.func,
};

IconButton.defaultProps = {
	size: 'medium',
	type: 'ghost',
	tooltipPlacement: 'right',
};

export default IconButton;
