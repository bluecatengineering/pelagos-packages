import {forwardRef, useCallback} from 'react';
import PropTypes from 'prop-types';

/** Expandable row element, it must follow a TableExpandRow element. */
const TableExpandableRow = forwardRef(({className, colSpan, children, ...props}, ref) => {
	const handleEnterLeave = useCallback((event) => {
		const parentRow = event.currentTarget.previousSibling;
		if (parentRow) {
			if (event.type === 'mouseenter') {
				parentRow.classList.add('Table--parentRowHover');
			} else {
				parentRow.classList.remove('Table--parentRowHover');
			}
		}
	}, []);
	return (
		<tr
			{...props}
			className={`Table__expandableRow${className ? ` ${className}` : ''}`}
			ref={ref}
			onMouseEnter={handleEnterLeave}
			onMouseLeave={handleEnterLeave}>
			<td colSpan={colSpan}>
				<div className="Table__childContainer">{children}</div>
			</td>
		</tr>
	);
});

TableExpandableRow.displayName = 'TableExpandableRow';

TableExpandableRow.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The width of the expanded row's internal cell. */
	colSpan: PropTypes.number.isRequired,
	/** The child elements. */
	children: PropTypes.node,
};

export default TableExpandableRow;
