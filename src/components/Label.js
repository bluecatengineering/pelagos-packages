import React from 'react';
import PropTypes from 'prop-types';

import './Label.less';

const Label = ({text, ...props}) => (
	<label {...props} className="Label">
		{text}
	</label>
);

Label.propTypes = {
	id: PropTypes.string,
	htmlFor: PropTypes.string,
	text: PropTypes.string,
};

export default Label;
