import PropTypes from 'prop-types';

import './FieldHelper.less';

/** A helper text. */
const FieldHelper = ({text, ...props}) => (
	<div {...props} className="FieldHelper">
		{text || '\u00a0'}
	</div>
);

FieldHelper.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The error text. */
	text: PropTypes.string,
};

export default FieldHelper;
