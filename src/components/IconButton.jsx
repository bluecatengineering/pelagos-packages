import React from 'react';
import PropTypes from 'prop-types';

import useButtonKeyHandler from '../hooks/useButtonKeyHandler';

import Tooltip from './Tooltip';
import OverlayTrigger from './OverlayTrigger';
import SvgIcon from './SvgIcon';
import './IconButton.less';

const IconButton = ({id, icon, className, tooltipText, large, disabled, onClick, ...props}) => {
	const keyHandker = useButtonKeyHandler(onClick);
	const button = (
		<span
			{...props}
			id={id}
			role="button"
			aria-disabled={disabled}
			tabIndex={disabled ? -1 : 0}
			className={'IconButton' + (className ? ' ' + className : '') + (large ? ' IconButton--large' : '')}
			onClick={disabled ? null : onClick}
			onKeyDown={disabled ? null : keyHandker}>
			<SvgIcon icon={icon} />
		</span>
	);
	if (!tooltipText) {
		return button;
	}

	const tooltipId = id + '-tooltip';
	const tooltip = <Tooltip id={tooltipId}>{tooltipText}</Tooltip>;
	return (
		<OverlayTrigger placement={large ? 'left' : 'right'} overlay={tooltip}>
			{button}
		</OverlayTrigger>
	);
};

IconButton.propTypes = {
	id: PropTypes.string,
	icon: PropTypes.object.isRequired,
	className: PropTypes.string,
	tooltipText: PropTypes.string,
	large: PropTypes.bool,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
};

export default IconButton;
