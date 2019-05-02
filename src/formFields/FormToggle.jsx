import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import Label from '../components/Label';
import Toggle from '../components/Toggle';
import './FormToggle.less';

const FormToggle = ({id, componentId, className, label, value, onChange}) => {
	id = id || 'e' + ('' + Math.random()).substr(2);
	return (
		<div className={'FormToggle' + (className ? ' ' + className : '')}>
			<div>
				<Label text={label} htmlFor={id} />
			</div>

			<Toggle
				id={id}
				componentId={componentId}
				className="FormToggle__field"
				ariaLabel={label}
				checked={value}
				onChange={useCallback(() => onChange(!value), [value])}
			/>
		</div>
	);
};

FormToggle.propTypes = {
	id: PropTypes.string,
	componentId: PropTypes.string,
	className: PropTypes.string,
	label: PropTypes.string.isRequired,
	value: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
};

export default FormToggle;
