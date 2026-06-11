import PropTypes from 'prop-types';

import './Menu.less';

/** A menu item divider. */
const MenuItemDivider = ({className}) => (
	<div className={`Menu__divider${className ? ` ${className}` : ''}`} role="separator" />
);

MenuItemDivider.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
};

export default MenuItemDivider;
