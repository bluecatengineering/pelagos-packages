import PropTypes from 'prop-types';

import useRandomId from '../hooks/useRandomId';

import Label from './Label';
import InfoTooltip from './InfoTooltip';
import './DetailEntry.less';

/** An entry in the details panel. */
const DetailEntry = ({
	id,
	className,
	label,
	infoText,
	infoTextPlacement,
	value,
	direction,
	valueClass,
	valueTitle,
	children,
	...props
}) => {
	id = useRandomId(id);
	const labelId = `${id}-label`;
	return (
		<div className={`DetailEntry${className ? ` ${className}` : ''}`} role="region" aria-labelledby={labelId}>
			<div className="DetailEntry__label">
				<Label id={labelId} text={label} htmlFor={id} />
				{infoText && <InfoTooltip text={infoText} placement={infoTextPlacement} />}
			</div>
			<div
				{...props}
				id={id}
				className={`DetailEntry__value DetailEntry--${direction}${valueClass ? ` ${valueClass}` : ''}`}
				title={valueTitle}>
				{children || value}
			</div>
		</div>
	);
};

DetailEntry.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.any,
	/** The label text. */
	label: PropTypes.string.isRequired,
	/** The text of the info tooltip to display. */
	infoText: PropTypes.string,
	/** The placement of the info tooltip relative to the icon. */
	infoTextPlacement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
	/** The value to be displayed. */
	value: PropTypes.any,
	/** The layout direction for the value. */
	direction: PropTypes.oneOf(['row', 'column']),
	/** The value class name(s). */
	valueClass: PropTypes.string,
	/** The title for the value. */
	valueTitle: PropTypes.string,
	/** The child elements, can be provided instead of the value. */
	children: PropTypes.any,
};

DetailEntry.defaultProps = {
	direction: 'column',
};

export default DetailEntry;
