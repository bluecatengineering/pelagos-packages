import PropTypes from 'prop-types';

import './Tag.less';

export const types = [
	'red',
	'magenta',
	'purple',
	'blue',
	'cyan',
	'teal',
	'green',
	'gray',
	'cool-gray',
	'warm-gray',
	'cyan-gray',
];

/** A tag. */
const Tag = ({className, size, type, children, ...props}) => (
	<div {...props} className={`Tag Tag--${size} Tag--${type}${className ? ` ${className}` : ''}`}>
		{children}
	</div>
);

Tag.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The tag size. */
	size: PropTypes.oneOf(['sm', 'md']),
	/** The tag type. */
	type: PropTypes.oneOf(types),
	/** The child elements. */
	children: PropTypes.node,
};

export default Tag;
