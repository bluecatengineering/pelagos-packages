import React from 'react';
import PropTypes from 'prop-types';

import useButtonKeyHandler from '../hooks/useButtonKeyHandler';

import './Hamburger.less';

/** A hamburger menu. */
const Hamburger = ({active, onClick, ...props}) => (
	<div
		{...props}
		className="Hamburger"
		role="button"
		tabIndex="0"
		onClick={onClick}
		onKeyDown={useButtonKeyHandler(onClick)}>
		<div className={'Hamburger__inner' + (active ? ' Hamburger--active' : '')} />
	</div>
);

Hamburger.propTypes = {
	/** Whether the button is active. */
	active: PropTypes.bool,
	/** Function invoked when the button is clicked. */
	onClick: PropTypes.func,
};

export default Hamburger;
