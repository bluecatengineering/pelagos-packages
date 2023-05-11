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
	'high-contrast',
];

/** A tag. */
const Tag = ({className, size, type, children, onClick, ...props}) => {
	const fullClassName = `Tag Tag--${size} Tag--${type}${className ? ` ${className}` : ''}`;
	return onClick ? (
		<button {...props} className={fullClassName} onClick={onClick}>
			{children}
		</button>
	) : (
		<div {...props} className={fullClassName}>
			{children}
		</div>
	);
};

Tag.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The tag size. */
	size: PropTypes.oneOf(['sm', 'md']),
	/** The tag type. */
	type: PropTypes.oneOf(types),
	/** The child elements. */
	children: PropTypes.node,
	/** Function invoked when the tag is clicked. */
	onClick: PropTypes.func,
};

Tag.defaultProps = {
	size: 'md',
	type: 'gray',
};

export default Tag;
