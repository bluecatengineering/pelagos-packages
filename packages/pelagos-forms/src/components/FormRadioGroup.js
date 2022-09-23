import {RadioGroup} from '@bluecateng/pelagos';
import {connect} from '@bluecateng/auto-forms';

export default connect(RadioGroup, ({value, setValue}) => ({value, onChange: setValue}));
