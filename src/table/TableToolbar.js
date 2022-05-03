import {forwardRef} from 'react';
import PropTypes from 'prop-types';

/** Table toolbar container. Must contain an optional TableToolbarBatch and/or a TableToolbarDefault in that order. */
const TableToolbar = forwardRef(({className, children}, ref) => (
	<div className={`Table__toolbar${className ? ` ${className}` : ''}`} ref={ref}>
		{children}
	</div>
));

TableToolbar.displayName = 'TableToolbar';

TableToolbar.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The child elements. */
	children: PropTypes.node.isRequired,
};

export default TableToolbar;
