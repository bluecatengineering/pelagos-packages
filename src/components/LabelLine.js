import React from 'react';
import PropTypes from 'prop-types';

import __ from '../strings';

import Label from './Label';
import './LabelLine.less';

/** The standard form input label line. */
const LabelLine = ({text, optional, optionalText, showOptionalText, notice, ...props}) => (
	<div className="LabelLine__label">
		<Label {...props} text={text} />
		{(optional || (optionalText && showOptionalText)) && (
			<span className="LabelLine__optional">{optionalText || __('P_OPTIONAL')}</span>
		)}
		{notice && <span className="LabelLine__notice">{notice}</span>}
	</div>
);

LabelLine.propTypes = {
	/** The label text. */
	text: PropTypes.string,
	/** Whether to mark the field as optional. */
	optional: PropTypes.bool,
	/** @deprecated use optional instead. */
	optionalText: PropTypes.string,
	/** @deprecated use optional instead. */
	showOptionalText: PropTypes.bool,
	/** The notice/warning text. */
	notice: PropTypes.string,
};

export default LabelLine;
