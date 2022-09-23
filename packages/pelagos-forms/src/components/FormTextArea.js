import {TextAreaField} from '@bluecateng/pelagos';
import {connect} from '@bluecateng/auto-forms';

export default connect(TextAreaField, ({value, error, setValue}) => ({
	value,
	error,
	onChange: setValue,
}));
