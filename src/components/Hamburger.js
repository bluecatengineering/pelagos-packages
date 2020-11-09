import PropTypes from 'prop-types';

import handleButtonKeyDown from '../functions/handleButtonKeyDown';

import './Hamburger.less';

/** A hamburger menu. */
const Hamburger = ({active, onClick, ...props}) => (
	<div {...props} className="Hamburger" role="button" tabIndex="0" onClick={onClick} onKeyDown={handleButtonKeyDown}>
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
