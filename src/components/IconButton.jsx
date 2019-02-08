import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import Tooltip from './Tooltip';
import OverlayTrigger from './OverlayTrigger';
import SvgIcon from './SvgIcon';
import './IconButton.less';

const IconButton = ({componentId, icon, className, ariaLabel, tooltipText, large, disabled, onClick}) => {
	const keyHandker = useCallback(
		event => (event.keyCode === 13 || event.keyCode === 32 ? (event.preventDefault(), onClick(event)) : null),
		[onClick]
	);
	const button = (
		<span
			role="button"
			aria-disabled={disabled}
			aria-label={ariaLabel}
			tabIndex={disabled ? -1 : 0}
			className={'IconButton' + (className ? ' ' + className : '') + (large ? ' IconButton--large' : '')}
			data-bcn-id={'btn-' + componentId}
			onClick={disabled ? null : onClick}
			onKeyDown={disabled ? null : keyHandker}>
			<SvgIcon icon={icon} />
		</span>
	);
	if (!tooltipText) {
		return button;
	}

	const tooltipId = 'tooltip-' + componentId;
	const tooltip = <Tooltip id={tooltipId}>{tooltipText}</Tooltip>;
	return (
		<OverlayTrigger placement={large ? 'left' : 'right'} overlay={tooltip}>
			{button}
		</OverlayTrigger>
	);
};

IconButton.propTypes = {
	componentId: PropTypes.string.isRequired,
	icon: PropTypes.object.isRequired,
	className: PropTypes.string,
	ariaLabel: PropTypes.string,
	tooltipText: PropTypes.string,
	large: PropTypes.bool,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
};

export default IconButton;
