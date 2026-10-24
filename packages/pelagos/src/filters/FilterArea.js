import {forwardRef} from 'react';
import PropTypes from 'prop-types';

import useCollapse from '../hooks/useCollapse';
import useSetRefs from '../hooks/useSetRefs';

import './FilterArea.less';

/** Displays a list of filters. A ref set on it must be stable (for example created with useRef or wrapped in useCallback), a new ref stops the running animation. */
const FilterArea = forwardRef(({className, expanded = true, children, ...props}, ref) => {
	const collapse = useCollapse(expanded);
	const setRefs = useSetRefs(collapse, ref);
	return (
		<ul {...props} className={`FilterArea${className ? ` ${className}` : ''}`} ref={setRefs}>
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
