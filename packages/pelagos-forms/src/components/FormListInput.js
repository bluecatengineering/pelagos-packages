import {ListInput} from '@bluecateng/pelagos';
import {connect} from '@bluecateng/auto-forms';

export default connect(ListInput, ({value, error, setValue, setError, setExtra}) => ({
	list: value,
	error,
	onListChange: setValue,
	onTextChange: setExtra,
	onErrorChange: setError,
}));
