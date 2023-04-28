import {forwardRef} from 'react';
import PropTypes from 'prop-types';

import './FilterArea.less';

/** Displays a list of filters. */
const FilterArea = forwardRef(({className, children, ...props}, ref) => (
	<ul {...props} className={`FilterArea${className ? ` ${className}` : ''}`} ref={ref}>
		{children}
	</ul>
));

FilterArea.displayName = 'FilterArea';

FilterArea.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The buttons. */
	children: PropTypes.node,
};

export default FilterArea;
