import PropTypes from 'prop-types';

import Label from './Label';
import './LabelLine.less';

/** The standard form input label line. */
const LabelLine = ({text, counter, required, error, ...props}) => (
	<div className="LabelLine">
		<div className="LabelLine__label">
			<Label {...props} text={text} title={text} />
			{required && (
				<span className={`LabelLine__required${error ? ' LabelLine--error' : ''}`} aria-hidden>
					*
				</span>
			)}
		</div>
		{counter && <div className="LabelLine__counter">{counter}</div>}
	</div>
);

LabelLine.propTypes = {
	/** The label text. */
	text: PropTypes.string.isRequired,
	/** The character counter. */
	counter: PropTypes.string,
	/** Whether to mark the field as required. */
	required: PropTypes.bool,
	/** Whether the field is in error. */
	error: PropTypes.bool,
};

export default LabelLine;
