import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import Label from '../components/Label';
import Toggle from '../components/Toggle';
import './ToggleField.less';

const ToggleField = ({id, className, label, value, onChange}) => {
	id = id || 'e' + ('' + Math.random()).substr(2);
	return (
		<div className={'ToggleField' + (className ? ' ' + className : '')}>
			<div>
				<Label text={label} htmlFor={id} />
			</div>

			<Toggle
				id={id}
				className="ToggleField__field"
				ariaLabel={label}
				checked={value}
				onChange={useCallback(() => onChange(!value), [value])}
			/>
		</div>
	);
};

ToggleField.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	label: PropTypes.string.isRequired,
	value: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
};

export default ToggleField;
