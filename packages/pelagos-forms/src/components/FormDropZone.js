import {connect} from '@bluecateng/auto-forms';
import {DropZone} from '@bluecateng/pelagos';

export const mapState = ({extra, error, setValue, setExtra}) => ({
	fileName: extra,
	error,
	onDrop: (...args) =>
		args.length === 1 ? (setExtra(args[0].name), setValue(args[0])) : (setExtra(args[0]), setValue(args[1])),
});

/** @deprecated use FormFileUploader instead. */
export default connect(DropZone, mapState);
