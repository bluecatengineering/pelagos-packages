import React from 'react';
import PropTypes from 'prop-types';

import './Spinner.less';

const Spinner = ({className, size, ...props}) => (
	<div {...props} className={'Spinner CssSpinner Spinner--' + size + (className ? ' ' + className : '')} />
);

Spinner.propTypes = {
	className: PropTypes.string,
	size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large']),
};

Spinner.defaultProps = {
	size: 'medium',
};

export default Spinner;
