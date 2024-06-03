import {forwardRef} from 'react';
import PropTypes from 'prop-types';

import './Table.less';

/**
 * Table toolbar container.
 * Default toolbars must contain an optional TableToolbarBatch and/or a TableToolbarDefault in that order.
 * Sectioned toolbars must contain one, two, or three TableToolbarSection.
 */
const TableToolbar = forwardRef(({className, type = 'default', children}, ref) => (
	<div className={`Table__toolbar Table__toolbar--${type} ${className ? ` ${className}` : ''}`} ref={ref}>
		{children}
	</div>
));

TableToolbar.displayName = 'TableToolbar';

TableToolbar.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The toolbar type. */
	type: PropTypes.oneOf(['default', 'sectioned']),
	/** The child elements. */
	children: PropTypes.node.isRequired,
};

export default TableToolbar;
