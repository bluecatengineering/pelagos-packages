import React from 'react';
import PropTypes from 'prop-types';

import './FieldError.less';

/** An error message. */
const FieldError = ({text, alignment, ...props}) => (
	<div {...props} className="FieldError" style={{textAlign: alignment}}>
		{text}
	</div>
);

FieldError.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The error text. */
	text: PropTypes.string,
	/** The text alignment. */
	alignment: PropTypes.oneOf(['left', 'right']),
};

FieldError.defaultProps = {
	alignment: 'right',
};

export default FieldError;
