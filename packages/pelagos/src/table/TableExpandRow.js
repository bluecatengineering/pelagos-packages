import {forwardRef} from 'react';
import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';
import ChevronDown from '@carbon/icons-react/es/ChevronDown';

/** Row element which controls an expandable row, a TableExpandableRow element must follow this element. */
const TableExpandRow = forwardRef(
	({className, selected, expanded, 'aria-controls': ariaControls, children, onExpand, ...props}, ref) => (
		<tr
			{...props}
			className={`Table__parentRow${expanded ? ' Table--expandedRow' : ''}${className ? ` ${className}` : ''}`}
			aria-selected={selected}
			ref={ref}>
			<td className="Table__expandCell">
				<button
					className="Table__expandBtn"
					type="button"
					aria-label={expanded ? t`Collapse current row` : t`Expand current row`}
					aria-expanded={expanded}
					aria-controls={ariaControls}
					onClick={onExpand}>
					<ChevronDown className="Table__expandArrow" />
				</button>
			</td>
			{children}
		</tr>
	)
);

TableExpandRow.displayName = 'TableExpandRow';

TableExpandRow.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** Whether this row is selected. */
	selected: PropTypes.bool,
	/** Whether this row is expanded. */
	expanded: PropTypes.bool,
	/** ID of the expandable row controlled by this row. */
	'aria-controls': PropTypes.string.isRequired,
	/** The child elements. */
	children: PropTypes.node,
	/** Function invoked when the expand button is clicked. */
	onExpand: PropTypes.func,
};

export default TableExpandRow;
