import React from 'react';
import PropTypes from 'prop-types';

import useButtonKeyHandler from '../hooks/useButtonKeyHandler';

import Tooltip from './Tooltip';
import OverlayTrigger from './OverlayTrigger';
import SvgIcon from './SvgIcon';
import './IconButton.less';

/** An icon button. */
const IconButton = ({id, icon, className, size, tooltipText, tooltipPlacement, disabled, onClick, ...props}) => {
	const handleKeyDown = useButtonKeyHandler(onClick);
	const button = (
		<span
			{...props}
			id={id}
			role="button"
			aria-disabled={disabled}
			tabIndex={disabled ? -1 : 0}
			className={'IconButton IconButton--' + size + (className ? ' ' + className : '')}
			onClick={disabled ? null : onClick}
			onKeyDown={disabled ? null : handleKeyDown}>
			<SvgIcon icon={icon} />
		</span>
	);
	if (!tooltipText) {
		return button;
	}

	const tooltipId = id + '-tooltip';
	const tooltip = <Tooltip id={tooltipId}>{tooltipText}</Tooltip>;
	return (
		<OverlayTrigger placement={tooltipPlacement} overlay={tooltip}>
			{button}
		</OverlayTrigger>
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
	tooltipPlacement: 'right',
};

export default IconButton;
