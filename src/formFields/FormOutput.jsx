import React from 'react';
import PropTypes from 'prop-types';

import Label from '../components/Label';
import './FormOutput.less';

const FormOutput = ({componentId, className, label, value, alignRight, active}) => (
	<div className={'FormOutput' + (alignRight ? ' FormOutput--alignRight' : '') + (className ? ' ' + className : '')}>
		<div>
			<Label text={label} />
		</div>
		<div data-bcn-id={componentId} className={'FormOutput--value' + (active ? ' FormOutput--active' : '')}>
			{value}
		</div>
	</div>
);

FormOutput.propTypes = {
	componentId: PropTypes.string.isRequired,
	className: PropTypes.string,
	label: PropTypes.string.isRequired,
	value: PropTypes.any,
	alignRight: PropTypes.bool,
	active: PropTypes.bool,
};

export default FormOutput;
