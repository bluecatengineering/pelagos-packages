import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from './Tooltip';
import OverlayTrigger from './OverlayTrigger';

import './Button.less';

/** A button. */
const Button = ({id, text, className, tooltipText, size, active, disabled, onClick, ...props}) => {
	const button = disabled ? (
		<span id={id} className={'Button Button--' + size + (className ? ' ' + className : '')} aria-disabled="true">
			{text}
		</span>
	) : (
		<button
			{...props}
			type={onClick ? 'button' : 'submit'}
			id={id}
			className={'Button Button--' + size + (className ? ' ' + className : '') + (active ? ' Button--active' : '')}
			onClick={onClick}>
			{text}
		</button>
	);

	if (!tooltipText) {
		return button;
	}

	const tooltip = <Tooltip id={id + '-tooltip'}>{tooltipText}</Tooltip>;

	return (
		<OverlayTrigger placement="top" overlay={tooltip}>
			{button}
		</OverlayTrigger>
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
	/** Whether the button is active. */
	active: PropTypes.bool,
	/** Whether the button is disabled. */
	disabled: PropTypes.bool,
	/** Function invoked when the button is clicked. */
	onClick: PropTypes.func,
};

Button.defaultProps = {
	size: 'medium',
};

export default Button;
