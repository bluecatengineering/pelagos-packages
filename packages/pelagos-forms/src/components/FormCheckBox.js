import {useCallback} from 'react';
import {CheckBox} from '@bluecateng/pelagos';
import {connect} from '@bluecateng/auto-forms';

export default connect(CheckBox, ({value, setValue}) => ({
	checked: value,
	onChange: useCallback(() => setValue(!value), [value, setValue]),
}));
