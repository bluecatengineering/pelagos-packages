import {forwardRef} from 'react';
import PropTypes from 'prop-types';

import useCollapse from '../hooks/useCollapse';
import setRefs from '../functions/setRefs';

import './FilterArea.less';

/** Displays a list of filters. */
const FilterArea = forwardRef(({className, expanded = true, children, ...props}, ref) => {
	const collapse = useCollapse(expanded);
	const refs = ref ? setRefs(ref, collapse) : collapse;
	return (
		<ul {...props} className={`FilterArea${className ? ` ${className}` : ''}`} ref={refs}>
			{children}
		</ul>
	);
});

FilterArea.displayName = 'FilterArea';

FilterArea.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** Whether the area is expanded. */
	expanded: PropTypes.bool,
	/** The buttons. */
	children: PropTypes.node,
};

export default FilterArea;
