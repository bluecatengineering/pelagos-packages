import PropTypes from 'prop-types';

import './SvgIcon.less';

/** An SVG icon. */
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
	/** The component class name(s). */
	className: PropTypes.string,
	/** The icon to display. */
	icon: PropTypes.object.isRequired,
	/** The animation. */
	animation: PropTypes.oneOf(['spin']),
};

export default SvgIcon;
