import React from 'react';
import PropTypes from 'prop-types';

import './Tooltip.less';

const Tooltip = ({
	id,
	className,
	placement,
	positionLeft,
	positionTop,
	arrowOffsetLeft,
	arrowOffsetTop,
	children,
	...props
}) => (
	<div
		id={id}
		className={'Tooltip Tooltip--' + placement + (className ? ' ' + className : '')}
		style={{left: positionLeft, top: positionTop}}
		{...props}>
		<div className="Tooltip__body">{children}</div>
		<div className="Tooltip__arrow" style={{left: arrowOffsetLeft, top: arrowOffsetTop}} />
	</div>
);

Tooltip.propTypes = {
	id: PropTypes.string.isRequired,
	className: PropTypes.string,
	placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
	positionLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	positionTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	arrowOffsetLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	arrowOffsetTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	children: PropTypes.any,
};

export default Tooltip;
