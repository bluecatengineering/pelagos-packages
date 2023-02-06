import PropTypes from 'prop-types';

/** An item inside a DetailsList component. */
const DetailsListItem = ({className, children, ...props}) => (
	<li {...props} className={`DetailsList__item${className ? ` ${className}` : ''}`}>
		{children}
	</li>
);

DetailsListItem.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The child elements. */
	children: PropTypes.node,
};

export default DetailsListItem;
