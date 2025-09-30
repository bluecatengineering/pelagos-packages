import {DateInputField} from '@bluecateng/pelagos';
import {connect} from '@bluecateng/auto-forms';

export default connect(DateInputField, ({value, error, setValue}) => ({
	value,
	error,
	onChange: setValue,
}));
