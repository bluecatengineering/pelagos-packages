import PropTypes from 'prop-types';
import ChevronDown from '@carbon/icons-react/es/ChevronDown';

import './SelectArrow.less';

/** Arrow for select components. */
export const SelectArrow = ({className, open}) => (
	<ChevronDown className={`SelectArrow${open ? ' SelectArrow--open' : ''} ${className}`} />
);

SelectArrow.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string.isRequired,
	/** Whether the select is open. */
	open: PropTypes.bool,
};

export default SelectArrow;
