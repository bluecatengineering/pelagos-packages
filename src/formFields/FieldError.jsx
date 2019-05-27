import React from 'react';
import PropTypes from 'prop-types';

import './FieldError.less';

const FieldError = ({text, alignment, ...props}) => (
	<div {...props} className="FieldError" style={{textAlign: alignment}}>
		{text}
	</div>
);

FieldError.propTypes = {
	id: PropTypes.string,
	text: PropTypes.string,
	alignment: PropTypes.oneOf(['left', 'right']),
};

FieldError.defaultProps = {
	alignment: 'right',
};

export default FieldError;
