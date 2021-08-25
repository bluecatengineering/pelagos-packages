import PropTypes from 'prop-types';

import SvgIcon from './SvgIcon';
import './LabeledIcon.less';

/** An icon with a label underneath. */
const LabeledIcon = ({className, icon, label, underline, ...props}) => (
	<div {...props} className={'LabeledIcon' + (className ? ` ${className}` : '')} role="button">
		<SvgIcon className="LabeledIcon__icon" icon={icon} />
		<span className={'LabeledIcon__label' + (underline ? ' LabeledIcon--underlined' : '')}>{label}</span>
	</div>
);

LabeledIcon.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The icon to display. */
	icon: PropTypes.object,
	/** The label text. */
	label: PropTypes.string,
	/** Whether the first letter of the label is underlined. */
	underline: PropTypes.bool,
};

export default LabeledIcon;
