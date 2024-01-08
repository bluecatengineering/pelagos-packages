import {forwardRef} from 'react';
import PropTypes from 'prop-types';

import SvgIcon from '../components/SvgIcon';
import sort from '../icons/sort';
import sortUp from '../icons/sortUp';
import sortDown from '../icons/sortDown';

/** Header element for a table component. */
const TableHeader = forwardRef(({className, align, sortable, sortOrder, radio, children, ...props}, ref) =>
	sortable ? (
		<th
			{...props}
			className={`Table--sortable${className ? ` ${className}` : ''}`}
			aria-sort={sortOrder === 'a' ? 'ascending' : sortOrder === 'd' ? 'descending' : null}
			ref={ref}>
			<button className={`Table__sort${sortOrder ? ' Table__sort--active' : ''}`} type="button">
				<div className={`Table__sortLabel Table--${align}`}>{children}</div>
				<SvgIcon className="Table__sortIcon" icon={sortOrder === 'a' ? sortUp : sortOrder === 'd' ? sortDown : sort} />
			</button>
		</th>
	) : (
		<th
			{...props}
			className={`Table--${align}${radio ? ' Table--radioHeader' : ''}${className ? ` ${className}` : ''}`}>
			{children}
		</th>
	)
);

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

TableHeader.defaultProps = {
	align: 'left',
};

export default TableHeader;
