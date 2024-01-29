import PropTypes from 'prop-types';

import './SvgIcon.less';

const renderFontAwesomeIcon = (className, {icon: [width, height, , , path]}, props) => (
	<svg
		{...props}
		className={`SvgIcon${className ? ` ${className}` : ''}`}
		style={{width: `${width / height}em`}}
		focusable="false"
		viewBox={`0 0 ${width} ${height}`}>
		<path fill="currentColor" d={path} />
	</svg>
);

/** @deprecated use a Carbon icon instead. */
// eslint-disable-next-line no-unused-vars -- used to remove "animation" from "props"
const SvgIcon = ({icon: Icon, className, animation, ...props}) =>
	Icon.icon ? renderFontAwesomeIcon(className, Icon, props) : <Icon {...props} className={className} />;

SvgIcon.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The icon to display. */
	icon: PropTypes.oneOfType([PropTypes.object, PropTypes.elementType]).isRequired,
	/** @deprecated no replacement. */
	animation: PropTypes.oneOf(['spin']),
};

export default SvgIcon;
