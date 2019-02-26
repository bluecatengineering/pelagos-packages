import React from 'react';
import PropTypes from 'prop-types';

import './FieldError.less';

const FieldError = ({componentId, text, alignment}) => (
	<div className="FieldError" data-bcn-id={componentId || 'input-error'} style={{textAlign: alignment}}>
		{text}
	</div>
);

FieldError.propTypes = {
	componentId: PropTypes.string,
	text: PropTypes.string,
	alignment: PropTypes.oneOf(['left', 'right']),
};

FieldError.defaultProps = {
	alignment: 'right',
};

export default FieldError;
