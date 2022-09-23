import {TextInputField} from '@bluecateng/pelagos';
import {connect} from '@bluecateng/auto-forms';

export default connect(TextInputField, ({value, error, setValue}) => ({
	value,
	error,
	onChange: setValue,
}));
