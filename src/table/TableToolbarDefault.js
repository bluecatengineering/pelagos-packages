import {cloneElement, forwardRef} from 'react';
import PropTypes from 'prop-types';

const hide = (child, index) => cloneElement(child, {tabIndex: -1, key: child.key || index});

/** Table toolbar for default actions. */
const TableToolbarDefault = forwardRef(({className, hidden, children}, ref) => (
	<div className={`Table__toolbarDefault${className ? ` ${className}` : ''}`} aria-hidden={hidden} ref={ref}>
		{hidden ? (Array.isArray(children) ? children.map(hide) : hide(children, 0)) : children}
	</div>
));

TableToolbarDefault.displayName = 'TableToolbarDefault';

TableToolbarDefault.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** Whether this toolbar should be hidden (when TableToolbarBatch is visible). */
	hidden: PropTypes.bool,
	/** The child elements. */
	children: PropTypes.node,
};

export default TableToolbarDefault;
