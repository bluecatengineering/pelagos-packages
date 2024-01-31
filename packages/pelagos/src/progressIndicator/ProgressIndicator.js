import {cloneElement} from 'react';
import PropTypes from 'prop-types';

import './ProgressIndicator.less';

/** Indicates progress on a multi-step process. */
const ProgressIndicator = ({className, current, children}) => (
	<ul className={`ProgressIndicator${className ? ` ${className}` : ''}`}>
		{children.map((child, index) =>
			cloneElement(child, {key: index, complete: index < current, current: current === index})
		)}
	</ul>
);

ProgressIndicator.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The index of the current step. */
	current: PropTypes.number,
	/** The steps, must be instances of `ProgressStep`. */
	children: PropTypes.arrayOf(PropTypes.node),
};

export default ProgressIndicator;
