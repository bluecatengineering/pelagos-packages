import {forwardRef} from 'react';
import PropTypes from 'prop-types';

/** Row element for a table component. */
const TableRow = forwardRef(({selected, children, ...props}, ref) => (
	<tr {...props} aria-selected={selected} ref={ref}>
		{children}
	</tr>
));

TableRow.displayName = 'TableRow';

TableRow.propTypes = {
	/** Whether this row is selected. */
	selected: PropTypes.bool,
	/** The child elements. */
	children: PropTypes.node,
};

export default TableRow;
