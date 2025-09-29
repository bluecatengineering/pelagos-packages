import PropTypes from 'prop-types';

import LabelLine from '../components/LabelLine';

import FieldHelper from './FieldHelper';

import './FieldWrapper.less';

/** Standard wrapper for form field components. */
const FieldWrapper = ({className, label, counter, required, helperId, helperText, error, children, ...props}) => (
	<div className={`FieldWrapper${className ? ` ${className}` : ''}`}>
		<LabelLine {...props} text={label} counter={counter} required={required} error={!!error} />
		{children}
		<FieldHelper id={helperId} text={helperText} error={error} />
	</div>
);

FieldWrapper.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The label text. */
	label: PropTypes.string.isRequired,
	/** The character counter. */
	counter: PropTypes.string,
	/** Whether to mark the field as required. */
	required: PropTypes.bool,
	/** The field helper component identifier. */
	helperId: PropTypes.string,
	/** Additional information for the field. */
	helperText: PropTypes.string,
	/** The error text. */
	error: PropTypes.string,
	/** The child elements. */
	children: PropTypes.node,
};

export default FieldWrapper;
