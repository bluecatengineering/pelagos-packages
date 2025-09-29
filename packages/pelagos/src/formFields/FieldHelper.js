import PropTypes from 'prop-types';

import './FieldHelper.less';

/** A field helper which displays either a helper text or an error message. */
const FieldHelper = ({text, error, ...props}) => (
	<div {...props} className={`FieldHelper${error ? ' error' : ''}`}>
		{error || text || '\u00a0'}
	</div>
);

FieldHelper.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The helper text. */
	text: PropTypes.string,
	/** The error text. */
	error: PropTypes.string,
};

export default FieldHelper;
