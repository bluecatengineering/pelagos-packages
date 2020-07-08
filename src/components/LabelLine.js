import React from 'react';
import PropTypes from 'prop-types';

import Label from './Label';
import './LabelLine.less';

/** The standard form input label line. */
const LabelLine = ({text, optionalText, showOptionalText, notice, ...props}) => (
	<div className="LabelLine__label">
		<Label {...props} text={text} />
		{optionalText && showOptionalText && <span className="LabelLine__optional">{optionalText}</span>}
		{notice && <span className="LabelLine__notice">{notice}</span>}
	</div>
);

LabelLine.propTypes = {
	/** The label text. */
	text: PropTypes.string,
	/** The hint text when list is empty. */
	optionalText: PropTypes.string,
	/** Whether the optional text should be displayed. */
	showOptionalText: PropTypes.bool,
	/** The notice/warning text. */
	notice: PropTypes.string,
};

export default LabelLine;
