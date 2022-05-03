import PropTypes from 'prop-types';

/** Cell element for row selection. */
const TableSelectRow = ({radio, ...props}) => (
	<td className="Table--selectRow">
		<input {...props} type={radio ? 'radio' : 'checkbox'} />
	</td>
);

TableSelectRow.propTypes = {
	/** Whether the element should be a radio button or a checkbox. */
	radio: PropTypes.bool,
	/** The name for the input element. */
	name: PropTypes.string,
	/** The value for the input element. */
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	/** Whether the row is selected. */
	checked: PropTypes.bool,
	/** Whether the checkbox is disabled. */
	disabled: PropTypes.bool,
	/** The aria label for the input element */
	'aria-label': PropTypes.string.isRequired,
};

export default TableSelectRow;
