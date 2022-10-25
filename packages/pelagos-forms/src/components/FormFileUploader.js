import {FileUploader} from '@bluecateng/pelagos';
import {connect} from '@bluecateng/auto-forms';

export default connect(FileUploader, ({value, error, setValue}) => ({
	files: value,
	error,
	onChange: setValue,
}));
