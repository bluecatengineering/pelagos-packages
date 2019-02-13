import React from 'react';
import PropTypes from 'prop-types';

import './Label.less';

const Label = ({text, htmlFor}) => (
	<label className="Label" htmlFor={htmlFor}>
		{text}
	</label>
);

Label.propTypes = {
	text: PropTypes.string,
	htmlFor: PropTypes.string,
};

export default Label;
