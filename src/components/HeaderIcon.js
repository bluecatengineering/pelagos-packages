import PropTypes from 'prop-types';

import SvgIcon from './SvgIcon';

import './HeaderIcon.less';

/** An icon with a label underneath. */
const HeaderIcon = ({className, icon, label, underline, ...props}) => (
	<div {...props} className={`HeaderIcon${className ? ` ${className}` : ''}`}>
		<SvgIcon className="HeaderIcon__icon" icon={icon} />
		<span className={`HeaderIcon__label${underline ? ' HeaderIcon--underlined' : ''}`}>{label}</span>
	</div>
);

HeaderIcon.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The icon to display. */
	icon: PropTypes.object,
	/** The label text. */
	label: PropTypes.string,
	/** Whether the first letter of the label is underlined. */
	underline: PropTypes.bool,
};

export default HeaderIcon;
