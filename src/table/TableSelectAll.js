import {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

/** Header element for a checkbox selection column. */
const TableSelectAll = ({indeterminate, ...props}) => {
	const ref = useRef(null);
	useEffect(() => {
		ref.current.indeterminate = indeterminate;
	}, [indeterminate]);
	return (
		<th className="Table__selectAll">
			<input {...props} type="checkbox" ref={ref} />
		</th>
	);
};

TableSelectAll.propTypes = {
	/** The name for the input element. */
	name: PropTypes.string,
	/** Whether all rows are selected. */
	checked: PropTypes.bool,
	/** Whether a subset of the rows is selected. */
	indeterminate: PropTypes.bool,
	/** Whether the checkbox is disabled. */
	disabled: PropTypes.bool,
	/** The aria label for the input element */
	'aria-label': PropTypes.string.isRequired,
};

export default TableSelectAll;
