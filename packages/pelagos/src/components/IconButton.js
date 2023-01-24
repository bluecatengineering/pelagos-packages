import {forwardRef} from 'react';
import PropTypes from 'prop-types';

import setRefs from '../functions/setRefs';
import useTooltip from '../hooks/useTooltip';

import SvgIcon from './SvgIcon';
import './IconButton.less';

/** An icon button. */
const IconButton = forwardRef(
	({id, icon, className, size, type, tooltipText, tooltipPlacement, overlay, disabled, onClick, ...props}, ref) => {
		const tooltip = useTooltip(tooltipText, tooltipPlacement);
		const refs = ref ? setRefs(ref, tooltip) : tooltip;
		return disabled ? (
			<span
				{...props}
				id={id}
				className={`IconButton IconButton--${size} IconButton--${type}${className ? ` ${className}` : ''}`}
				role="button"
				aria-disabled="true"
				ref={refs}>
				<SvgIcon icon={icon} />
				{overlay}
			</span>
		) : (
			<button
				{...props}
				id={id}
				className={`IconButton IconButton--${size} IconButton--${type}${className ? ` ${className}` : ''}`}
				type="button"
				ref={refs}
				onClick={onClick}>
				<SvgIcon icon={icon} />
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
