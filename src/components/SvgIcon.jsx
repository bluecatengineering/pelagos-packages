import React from 'react';
import PropTypes from 'prop-types';

import './SvgIcon.less';

const SvgIcon = ({
	icon: {
		icon: [width, height, , , path],
	},
	className,
	animation,
}) => (
	<svg
		className={'SvgIcon' + (animation ? ' SvgIcon--' + animation : '') + (className ? ' ' + className : '')}
		style={{width: width / height + 'em'}}
		focusable="false"
		viewBox={'0 0 ' + width + ' ' + height}>
		<path fill="currentColor" d={path} />
	</svg>
);

SvgIcon.propTypes = {
	icon: PropTypes.object.isRequired,
	className: PropTypes.string,
	animation: PropTypes.oneOf(['spin']),
};

export default SvgIcon;
