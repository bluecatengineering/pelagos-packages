import PropTypes from 'prop-types';

import './MenuArrow.less';

/** A small icon to indicate that the component has a popup. */
const MenuArrow = ({className}) => (
	<svg className={`MenuArrow${className ? ` ${className}` : ''}`} viewBox="0 0 7 5">
		<path d="m 0 1.5 l 1.1 -1.1 l 2.4 2.4 l 2.4 -2.4 l 1.1 1.1 l -3.5 3.5 z" />
	</svg>
);

MenuArrow.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
};

export default MenuArrow;
