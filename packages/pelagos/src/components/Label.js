import PropTypes from 'prop-types';

import './Label.less';

/** A label. */
const Label = ({className, text, ...props}) => (
	<label {...props} className={`Label${className ? ` ${className}` : ''}`}>
		{text}
	</label>
);

Label.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The identifier of the accompanying element. */
	htmlFor: PropTypes.string,
	/** The label text. */
	text: PropTypes.string.isRequired,
};

export default Label;
