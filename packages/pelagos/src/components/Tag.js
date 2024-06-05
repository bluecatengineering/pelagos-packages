import PropTypes from 'prop-types';
import Close from '@carbon/icons-react/es/Close';

import useRandomId from '../hooks/useRandomId';

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
const Tag = ({id, className, size = 'md', type = 'gray', removeTitle, children, onClick, onRemove, ...props}) => {
	id = useRandomId(id);
	const fullClassName = `Tag Tag--${size} Tag--${type}${onRemove ? ' Tag--removable' : ''}${
		className ? ` ${className}` : ''
	}`;
	return onClick ? (
		<button {...props} id={id} className={fullClassName} type="button" onClick={onClick}>
			{children}
		</button>
	) : (
		<div {...props} id={id} className={fullClassName}>
			{children}
			{onRemove && (
				<button className="Tag__remove" type="button" title={removeTitle} aria-labelledby={id} onClick={onRemove}>
					<Close />
				</button>
			)}
		</div>
	);
};

Tag.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The tag size. */
	size: PropTypes.oneOf(['sm', 'md']),
	/** The tag type. */
	type: PropTypes.oneOf(types),
	/** The title for the remove button. */
	removeTitle: PropTypes.string,
	/** The child elements. */
	children: PropTypes.node,
	/** Function invoked when the tag is clicked. */
	onClick: PropTypes.func,
	/** Function invoked when the remove button is clicked. Can't be used at the same time as onClick. The remove button is displayed only when this property is not null. */
	onRemove: PropTypes.func,
};

export default Tag;
