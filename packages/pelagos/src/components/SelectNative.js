import PropTypes from 'prop-types';

import Layer from './Layer';
import SelectArrow from './SelectArrow';

import './SelectNative.less';

/** Native select component. */
const SelectNative = ({className, children, ...props}) => (
	<span className="SelectNative">
		<Layer {...props} as="select" className={`SelectNative__select${className ? ` ${className}` : ''}`}>
			{children}
		</Layer>
		<SelectArrow className="SelectNative__arrow" />
	</span>
);

SelectNative.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The child elements. */
	children: PropTypes.node,
};

export default SelectNative;
