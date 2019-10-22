import React from 'react';
import PropTypes from 'prop-types';

import './Hamburger.less';

const Hamburger = ({active, onClick, ...props}) => (
	<div {...props} className="Hamburger" role="button" tabIndex="0" onClick={onClick}>
		<div className={'Hamburger__inner' + (active ? ' Hamburger--active' : '')} />
	</div>
);

Hamburger.propTypes = {
	active: PropTypes.bool,
	onClick: PropTypes.func,
};

export default Hamburger;
