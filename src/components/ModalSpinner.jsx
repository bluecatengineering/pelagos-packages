import React from 'react';
import PropTypes from 'prop-types';

import Spinner from './Spinner';
import './ModalSpinner.less';

const ModalSpinner = ({...props}) => (
	<div {...props} className="ModalSpinner">
		<Spinner size="large" />
	</div>
);

ModalSpinner.propTypes = {
	id: PropTypes.string,
};

export default ModalSpinner;
