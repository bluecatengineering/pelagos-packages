import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import Label from '../components/Label';
import Toggle from '../components/Toggle';
import './ToggleField.less';

const ToggleField = ({id, className, label, value, disabled, onChange}) => {
	id = id || 'e' + ('' + Math.random()).substr(2);
	const labelId = `${id}-label`;
	return (
		<div className={'ToggleField' + (className ? ' ' + className : '')}>
			<div className="ToggleField__label">
				<Label id={labelId} text={label} />
			</div>

			<Toggle
				id={id}
				className="ToggleField__field"
				checked={value}
				disabled={disabled}
				aria-labelledby={labelId}
				onChange={useCallback(() => onChange(!value), [value, onChange])}
			/>
		</div>
	);
};

ToggleField.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	label: PropTypes.string.isRequired,
	value: PropTypes.bool,
	disabled: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
};

export default ToggleField;
