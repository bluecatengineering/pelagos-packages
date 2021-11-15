import PropTypes from 'prop-types';

import './FieldError.less';

/** An error message. */
const FieldError = ({text, ...props}) => (
	<div {...props} className="FieldError" aria-live="polite">
		{text || '\u00a0'}
	</div>
);

FieldError.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The error text. */
	text: PropTypes.string,
	/** @deprecated error messages are now always aligned to the left. */
	alignment: PropTypes.oneOf(['left', 'right']),
};

export default FieldError;
