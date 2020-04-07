import React from 'react';
import PropTypes from 'prop-types';

import Spinner from './Spinner';
import './ModalSpinner.less';

/** A modal spinner. */
const ModalSpinner = ({...props}) => (
	<div {...props} className="ModalSpinner">
		<Spinner size="large" />
	</div>
);

ModalSpinner.propTypes = {
	/** The component id. */
	id: PropTypes.string,
};

export default ModalSpinner;
