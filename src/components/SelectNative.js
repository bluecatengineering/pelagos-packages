import PropTypes from 'prop-types';

import SelectArrow from './SelectArrow';

import './SelectNative.less';

/** Native select component. */
const SelectNative = ({className, children, ...props}) => (
	<span className="SelectNative">
		<select {...props} className={`SelectNative__select${className ? ` ${className}` : ''}`}>
			{children}
		</select>
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
