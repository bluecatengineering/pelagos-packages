import {forwardRef} from 'react';
import PropTypes from 'prop-types';

import hideChild from './hideChild';

const alignClass = {start: 'toolbarStart', end: 'toolbarEnd'};

/** Table toolbar for default actions. */
const TableToolbarDefault = forwardRef(({className, hidden, align = 'end', children}, ref) => (
	<div
		className={`Table__toolbarDefault Table--${alignClass[align]}${className ? ` ${className}` : ''}`}
		aria-hidden={hidden}
		ref={ref}>
		{hidden ? (Array.isArray(children) ? children.map(hideChild) : hideChild(children, 0)) : children}
	</div>
));

TableToolbarDefault.displayName = 'TableToolbarDefault';

TableToolbarDefault.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** Whether this toolbar should be hidden (when TableToolbarBatch is visible). */
	hidden: PropTypes.bool,
	/** The alignment for children. */
	align: PropTypes.oneOf(['start', 'end']),
	/** The child elements. */
	children: PropTypes.node,
};

export default TableToolbarDefault;
