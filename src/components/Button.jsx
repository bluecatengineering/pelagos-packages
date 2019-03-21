import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from './Tooltip';
import OverlayTrigger from './OverlayTrigger';

import './Button.less';

const Button = ({id, componentId, text, className, tooltipText, size, active, disabled, onClick, onFocus, onBlur}) => {
	const button = disabled ? (
		<span
			id={id}
			data-bcn-id={componentId}
			className={'Button Button--' + size + (className ? ' ' + className : '')}
			aria-disabled="true">
			{text}
		</span>
	) : (
		<button
			type={onClick ? 'button' : 'submit'}
			id={id}
			data-bcn-id={componentId}
			className={'Button Button--' + size + (className ? ' ' + className : '') + (active ? ' Button--active' : '')}
			onClick={onClick}
			onFocus={onFocus}
			onBlur={onBlur}>
			{text}
		</button>
	);

	if (!tooltipText) {
		return button;
	}

	const tooltip = <Tooltip id={'tooltip-' + (id || componentId)}>{tooltipText}</Tooltip>;

	return (
		<OverlayTrigger placement="top" overlay={tooltip}>
			{button}
		</OverlayTrigger>
	);
};

Button.propTypes = {
	id: PropTypes.string,
	componentId: PropTypes.string,
	text: PropTypes.string,
	className: PropTypes.string,
	tooltipText: PropTypes.string,
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	active: PropTypes.bool,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
};

Button.defaultProps = {
	size: 'medium',
};

export default Button;
