import {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

import './CheckBox.less';

/* A checkbox. */
const CheckBox = ({className, label, indeterminate, error, ...props}) => {
	const inputRef = useRef();
	useEffect(() => (inputRef.current.indeterminate = indeterminate), [indeterminate]);
	return (
		<label className={`CheckBox${className ? ` ${className}` : ''}`}>
			<input {...props} className={error ? 'error' : ''} type="checkbox" ref={inputRef} />
			{label}
		</label>
	);
};

CheckBox.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The check box label. */
	label: PropTypes.node,
	/** Whether the box is checked. */
	checked: PropTypes.bool,
	/** Whether the box state is indeterminate. */
	indeterminate: PropTypes.bool,
	/** Whether the box is disabled. */
	disabled: PropTypes.bool,
	/** Whether the box is in error. */
	error: PropTypes.bool,
	/** Function invoked when the checked status is changed. */
	onChange: PropTypes.func,
};

export default CheckBox;
