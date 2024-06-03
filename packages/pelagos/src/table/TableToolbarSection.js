import {forwardRef} from 'react';
import PropTypes from 'prop-types';

import './Table.less';

/** Table toolbar section. */
const TableToolbarSection = forwardRef(({className, area = 'start', children}, ref) => (
	<div className={`Table__toolbarSection Table__toolbarSection--${area} ${className ? ` ${className}` : ''}`} ref={ref}>
		{children}
	</div>
));

TableToolbarSection.displayName = 'TableToolbarSection';

TableToolbarSection.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The toolbar type. */
	area: PropTypes.oneOf(['start', 'middle', 'end']),
	/** The child elements. */
	children: PropTypes.node.isRequired,
};

export default TableToolbarSection;
