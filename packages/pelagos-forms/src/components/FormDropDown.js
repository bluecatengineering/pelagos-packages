import {DropDownField} from '@bluecateng/pelagos';
import {connect} from '@bluecateng/auto-forms';

export default connect(DropDownField, ({value, error, setValue}) => ({
	value,
	error,
	onChange: setValue,
}));
