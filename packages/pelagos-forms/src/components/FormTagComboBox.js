import {TagComboBoxField} from '@bluecateng/pelagos';
import {connect} from '@bluecateng/auto-forms';

export default connect(TagComboBoxField, ({value, error, setValue, setError}) => ({
	tags: value,
	error,
	onChange: setValue,
	onError: setError,
}));
