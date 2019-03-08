import React from 'react';
import PropTypes from 'prop-types';

import './FieldError.less';

const FieldError = ({id, componentId, text, alignment}) => (
	<div id={id} className="FieldError" data-bcn-id={componentId || 'input-error'} style={{textAlign: alignment}}>
		{text}
	</div>
);

FieldError.propTypes = {
	id: PropTypes.string,
	componentId: PropTypes.string,
	text: PropTypes.string,
	alignment: PropTypes.oneOf(['left', 'right']),
};

FieldError.defaultProps = {
	alignment: 'right',
};

export default FieldError;
