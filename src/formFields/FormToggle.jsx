import React from 'react';
import PropTypes from 'prop-types';

import Label from '../components/Label';
import Toggle from '../components/Toggle';
import './FormToggle.less';

const FormToggle = ({componentId, className, label, value, onChange}) => (
	<div className={'FormToggle' + (className ? ' ' + className : '')}>
		<div>
			<Label text={label} />
		</div>

		<Toggle
			componentId={componentId}
			className="Toggle__field"
			ariaLabel={label}
			checked={value}
			onChange={() => onChange(!value)}
		/>
	</div>
);

FormToggle.propTypes = {
	componentId: PropTypes.string,
	className: PropTypes.string,
	label: PropTypes.string.isRequired,
	value: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
};

export default FormToggle;
