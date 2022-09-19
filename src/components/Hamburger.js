import PropTypes from 'prop-types';

import './Hamburger.less';

/** A hamburger button. */
const Hamburger = ({active, onClick, ...props}) => (
	<button {...props} className="Hamburger" type="button" onClick={onClick}>
		<span className={`Hamburger__inner${active ? ' Hamburger--active' : ''}`} />
	</button>
);

Hamburger.propTypes = {
	/** Whether the button is active. */
	active: PropTypes.bool,
	/** Function invoked when the button is clicked. */
	onClick: PropTypes.func,
};

export default Hamburger;
