import {forwardRef} from 'react';
import PropTypes from 'prop-types';

import setRefs from '../functions/setRefs';
import useTooltip from '../hooks/useTooltip';

import SvgIcon from './SvgIcon';
import './IconButton.less';

/** An icon button. */
const IconButton = forwardRef(
	({id, icon, className, size, type, tooltipText, tooltipPlacement, overlay, disabled, onClick, ...props}, ref) => {
		const tooltip = useTooltip(tooltipText, tooltipPlacement, 'labelledby');
		const refs = ref ? setRefs(ref, tooltip) : tooltip;
		const finalClassName = `IconButton IconButton--${size} IconButton--${type}${
			overlay ? ' IconButton--container' : ''
		}${className ? ` ${className}` : ''}`;
		return disabled ? (
			<span {...props} id={id} className={finalClassName} role="button" aria-disabled="true" ref={refs}>
				<SvgIcon icon={icon} aria-hidden />
				{overlay}
			</span>
		) : (
			<button {...props} id={id} className={finalClassName} type="button" ref={refs} onClick={onClick}>
				<SvgIcon icon={icon} aria-hidden />
				{overlay}
			</button>
		);
	}
);

IconButton.displayName = 'IconButton';

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
	/** An overlay element. */
	overlay: PropTypes.node,
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
