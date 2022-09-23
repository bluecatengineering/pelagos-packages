import {ToggleField} from '@bluecateng/pelagos';
import {connect} from '@bluecateng/auto-forms';

export default connect(ToggleField, ({value, setValue}) => ({
	value,
	onChange: setValue,
}));
