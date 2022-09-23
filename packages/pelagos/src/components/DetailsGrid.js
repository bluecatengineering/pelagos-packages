import PropTypes from 'prop-types';

import './DetailsGrid.less';

/** Grid component for detail panels. */
const DetailsGrid = ({className, children}) => <div className={`DetailsGrid ${className}`}>{children}</div>;

DetailsGrid.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The child elements. */
	children: PropTypes.any,
};

export default DetailsGrid;
