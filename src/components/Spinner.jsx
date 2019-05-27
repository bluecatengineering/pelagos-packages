import React from 'react';
import PropTypes from 'prop-types';

import './Spinner.less';

const Spinner = ({size, ...props}) => <div {...props} className={'Spinner CssSpinner Spinner--' + size} />;

Spinner.propTypes = {
	size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large']),
};

Spinner.defaultProps = {
	size: 'medium',
};

export default Spinner;
