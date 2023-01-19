import {forwardRef} from 'react';
import PropTypes from 'prop-types';

/** Element displayed when a table is empty. */
const TableEmpty = forwardRef(({className, children, ...props}, ref) => (
	<div {...props} className={`Table__empty${className ? ` ${className}` : ''}`} aria-live="polite" ref={ref}>
		{children}
	</div>
));

TableEmpty.displayName = 'TableEmpty';

TableEmpty.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The child elements. */
	children: PropTypes.node,
};

export default TableEmpty;
