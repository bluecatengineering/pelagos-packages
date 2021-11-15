import PropTypes from 'prop-types';

import IconButton from './IconButton';

/** @deprecated use IconButton instead. */
const ToolbarButton = ({...props}) => <IconButton {...props} type="primary" />;

ToolbarButton.propTypes = {
	/** The component ID. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The icon to display. */
	icon: PropTypes.object,
	/** The tooltip text to display. */
	tooltipText: PropTypes.string,
	/** Whether the button is disabled */
	disabled: PropTypes.bool,
	/** Function invoked when the button is clicked. */
	onClick: PropTypes.func,
};

export default ToolbarButton;
