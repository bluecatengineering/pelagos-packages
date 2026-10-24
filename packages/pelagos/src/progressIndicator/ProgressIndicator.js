import {Children, cloneElement} from 'react';
import PropTypes from 'prop-types';

import './ProgressIndicator.less';

/** Indicates progress on a multi-step process. */
const ProgressIndicator = ({className, current, children}) => (
	<ul className={`ProgressIndicator${className ? ` ${className}` : ''}`}>
		{Children.toArray(children).map((child, index) =>
			cloneElement(child, {complete: index < current, current: current === index})
		)}
	</ul>
);

ProgressIndicator.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The index of the current step. */
	current: PropTypes.number,
	/** The steps, must be instances of `ProgressStep`. */
	children: PropTypes.node,
};

export default ProgressIndicator;
