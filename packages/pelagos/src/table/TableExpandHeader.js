import {forwardRef} from 'react';
import PropTypes from 'prop-types';

/** Header element for the expandable column. */
const TableExpandHeader = forwardRef(({className, ...props}, ref) => (
	<th {...props} className={`Table__expandHeader${className ? ` ${className}` : ''}`} ref={ref} />
));

TableExpandHeader.displayName = 'TableExpandHeader';

TableExpandHeader.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
};

export default TableExpandHeader;
