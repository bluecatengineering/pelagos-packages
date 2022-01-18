import PropTypes from 'prop-types';

import Label from './Label';
import './DetailEntry.less';

/** An entry in the details panel. */
const DetailEntry = ({id, className, label, value, direction, valueClass, valueTitle, children, ...props}) => (
	<div className={`DetailEntry${className ? ` ${className}` : ''}`}>
		<Label text={label} htmlFor={id} />
		<div
			{...props}
			id={id}
			className={`DetailEntry__value DetailEntry--${direction}${valueClass ? ` ${valueClass}` : ''}`}
			title={valueTitle}
		>
			{children || value}
		</div>
	</div>
);

DetailEntry.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.any,
	/** The label text. */
	label: PropTypes.string.isRequired,
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
