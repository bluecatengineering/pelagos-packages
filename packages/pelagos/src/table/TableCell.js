import {forwardRef} from 'react';
import PropTypes from 'prop-types';

/** Cell element for a table component. */
const TableCell = forwardRef(({className, align = 'left', children, ...props}, ref) => (
	<td {...props} className={`Table--${align}${className ? ` ${className}` : ''}`} ref={ref}>
		{children}
	</td>
));

TableCell.displayName = 'TableCell';

TableCell.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The alignment for text in the cell. */
	align: PropTypes.oneOf(['left', 'center', 'right']),
	/** The child elements. */
	children: PropTypes.node,
};

export default TableCell;
