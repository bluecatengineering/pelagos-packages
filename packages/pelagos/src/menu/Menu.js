import {forwardRef} from 'react';
import PropTypes from 'prop-types';

import './Menu.less';

/** A menu. This component can be used with useMenuHandler. */
const Menu = forwardRef(({className, children, ...props}, ref) => (
	<ul {...props} className={`Menu${className ? ` ${className}` : ''}`} role="menu" ref={ref}>
		{children}
	</ul>
));

Menu.displayName = 'Menu';

Menu.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The menu items. */
	children: PropTypes.node,
};

export default Menu;
