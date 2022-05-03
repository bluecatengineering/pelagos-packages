import {forwardRef} from 'react';
import PropTypes from 'prop-types';

const TableScrollWrapper = forwardRef(({className, children, ...props}, ref) => (
	<div {...props} className={`Table__wrapper${className ? ` ${className}` : ''}`} ref={ref}>
		{children}
	</div>
));

TableScrollWrapper.displayName = 'TableScrollWrapper';

TableScrollWrapper.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The child elements. */
	children: PropTypes.node,
};

export default TableScrollWrapper;
