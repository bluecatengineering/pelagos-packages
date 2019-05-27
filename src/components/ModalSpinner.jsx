import React from 'react';
import PropTypes from 'prop-types';

import Spinner from './Spinner';
import './ModalSpinner.less';

const ModalSpinner = ({id, componentId}) => (
	<div id={id} data-bcn-id={componentId} className="ModalSpinner">
		<Spinner size="large" />
	</div>
);

ModalSpinner.propTypes = {
	id: PropTypes.string,
	componentId: PropTypes.string,
};

export default ModalSpinner;
