import PropTypes from 'prop-types';

import './Label.less';

/** A label. */
const Label = ({text, ...props}) => (
	<label {...props} className="Label">
		{text}
	</label>
);

Label.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The identifier of the accompanying element. */
	htmlFor: PropTypes.string,
	/** The label text. */
	text: PropTypes.string.isRequired,
};

export default Label;
