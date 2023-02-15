import PropTypes from 'prop-types';

/** A menu item. */
const MenuItem = ({className, children, ...props}) => (
	<li {...props} className={`Menu__item${className ? ` ${className}` : ''}`} tabIndex={-1} role="menuitem">
		{children}
	</li>
);

MenuItem.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The menu item text. */
	children: PropTypes.node,
};

export default MenuItem;
