import {forwardRef} from 'react';
import PropTypes from 'prop-types';

import './EditorGrid.less';

/** Grid component for editor forms. */
const EditorGrid = forwardRef(({className, children, ...props}, ref) => (
	<div {...props} className={`EditorGrid ${className}`} ref={ref}>
		{children}
	</div>
));

EditorGrid.displayName = 'EditorGrid';

EditorGrid.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The child elements. */
	children: PropTypes.any,
};

export default EditorGrid;
