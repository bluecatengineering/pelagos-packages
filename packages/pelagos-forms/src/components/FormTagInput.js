import {TagInputField} from '@bluecateng/pelagos';
import {connect} from '@bluecateng/auto-forms';

export default connect(TagInputField, ({value, error, setValue, setError}) => ({
	tags: value,
	error,
	onChange: setValue,
	onError: setError,
}));
