import React from 'react';
import PropTypes from 'prop-types';

import Label from '../components/Label';
import './FormOutput.less';

const FormOutput = ({id, componentId, className, label, value, alignRight, active}) => {
	id = id || 'e' + ('' + Math.random()).substr(2);
	return (
		<div className={'FormOutput' + (alignRight ? ' FormOutput--alignRight' : '') + (className ? ' ' + className : '')}>
			<div>
				<Label text={label} htmlFor={id} />
			</div>
			<output id={id} data-bcn-id={componentId} className={'FormOutput__value' + (active ? ' FormOutput--active' : '')}>
				{value}
			</output>
		</div>
	);
};

FormOutput.propTypes = {
	id: PropTypes.string,
	componentId: PropTypes.string,
	className: PropTypes.string,
	label: PropTypes.string.isRequired,
	value: PropTypes.any,
	alignRight: PropTypes.bool,
	active: PropTypes.bool,
};

export default FormOutput;
