import PropTypes from 'prop-types';

import IconButton from './IconButton';

import './ToolbarButton.less';

const ToolbarButton = ({className, ...props}) => (
	<IconButton {...props} className={`ToolbarButton${className ? ' ' + className : ''}`} />
);

ToolbarButton.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	icon: PropTypes.object,
	tooltipText: PropTypes.string,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
};

export default ToolbarButton;
