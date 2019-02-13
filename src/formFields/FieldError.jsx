import React from 'react';
import PropTypes from 'prop-types';

import './FieldError.less';

const FieldError = ({text, alignment}) => (
	<div className="FieldError" data-bcn-id="input-error" style={{textAlign: alignment}}>
		{text}
	</div>
);

FieldError.propTypes = {
	text: PropTypes.string,
	alignment: PropTypes.oneOf(['left', 'right']),
};

FieldError.defaultProps = {
	alignment: 'right',
};

export default FieldError;
