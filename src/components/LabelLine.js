import PropTypes from 'prop-types';

import __ from '../strings';

import Label from './Label';
import './LabelLine.less';

/** The standard form input label line. */
const LabelLine = ({text, optional, notice, ...props}) => (
	<div className="LabelLine__label">
		<Label {...props} text={text} />
		{optional && <span className="LabelLine__optional">{__('P_OPTIONAL')}</span>}
		{notice && <span className="LabelLine__notice">{notice}</span>}
	</div>
);

LabelLine.propTypes = {
	/** The label text. */
	text: PropTypes.string,
	/** Whether to mark the field as optional. */
	optional: PropTypes.bool,
	/** The notice/warning text. */
	notice: PropTypes.string,
};

export default LabelLine;
