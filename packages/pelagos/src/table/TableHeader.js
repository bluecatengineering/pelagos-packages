import {forwardRef} from 'react';
import PropTypes from 'prop-types';
import ArrowDown from '@carbon/icons-react/es/ArrowDown';
import ArrowUp from '@carbon/icons-react/es/ArrowUp';
import ArrowsVertical from '@carbon/icons-react/es/ArrowsVertical';

/** Header element for a table component. */
const TableHeader = forwardRef(({className, align = 'left', sortable, sortOrder, radio, children, ...props}, ref) => {
	const Icon = sortOrder === 'a' ? ArrowUp : sortOrder === 'd' ? ArrowDown : ArrowsVertical;
	return sortable ? (
		<th
			{...props}
			className={`Table--sortable${className ? ` ${className}` : ''}`}
			aria-sort={sortOrder === 'a' ? 'ascending' : sortOrder === 'd' ? 'descending' : null}
			ref={ref}>
			<button className={`Table__sort${sortOrder ? ' Table__sort--active' : ''}`} type="button">
				<div className={`Table__sortLabel Table--${align}`}>{children}</div>
				<Icon className="Table__sortIcon" />
			</button>
		</th>
	) : (
		<th
			{...props}
			className={`Table--${align}${radio ? ' Table--radioHeader' : ''}${className ? ` ${className}` : ''}`}>
			{children}
		</th>
	);
});

TableHeader.displayName = 'TableHeader';

TableHeader.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The alignment for text in the cell. */
	align: PropTypes.oneOf(['left', 'center', 'right']),
	/** Whether the table can be sorted by this column. */
	sortable: PropTypes.bool,
	/** The current sort order for this column. */
	sortOrder: PropTypes.oneOf(['a', 'd']),
	/** Whether this header is for a radio selection column. */
	radio: PropTypes.bool,
	/** The child elements. */
	children: PropTypes.node,
};

export default TableHeader;
