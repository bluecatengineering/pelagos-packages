import React from 'react';
import PropTypes from 'prop-types';

import IconButton from './IconButton';

import './ToolbarButton.less';

const ToolbarButton = ({componentId, className, icon, ariaLabel, tooltipText, disabled, active, onClick}) => (
	<IconButton
		componentId={componentId}
		icon={icon}
		className={'ToolbarButton' + (active ? ' ToolbarButton--active' : '') + (className ? ' ' + className : '')}
		ariaLabel={ariaLabel}
		tooltipText={tooltipText}
		disabled={disabled}
		onClick={onClick}
	/>
);

ToolbarButton.propTypes = {
	componentId: PropTypes.string,
	className: PropTypes.string,
	icon: PropTypes.object,
	ariaLabel: PropTypes.string,
	tooltipText: PropTypes.string,
	disabled: PropTypes.bool,
	active: PropTypes.bool,
	onClick: PropTypes.func,
};

export default ToolbarButton;
