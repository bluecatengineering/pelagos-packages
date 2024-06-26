import {forwardRef} from 'react';
import PropTypes from 'prop-types';

/** Scrolling wrapper element for a table component. */
const TableScrollWrapper = forwardRef(({className, direction = 'vertical', children, ...props}, ref) => (
	<div {...props} className={`Table__wrapper ${direction}${className ? ` ${className}` : ''}`} tabIndex={0} ref={ref}>
		{children}
	</div>
));

TableScrollWrapper.displayName = 'TableScrollWrapper';

TableScrollWrapper.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The scroll direction. */
	direction: PropTypes.oneOf(['vertical', 'both']),
	/** The child elements. */
	children: PropTypes.node,
};

export default TableScrollWrapper;
