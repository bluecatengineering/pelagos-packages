import PropTypes from 'prop-types';
import {Button} from '@bluecateng/pelagos';
import {useFormState} from '@bluecateng/auto-forms';

const FormSubmit = ({...props}) => {
	const {isChanged, hasErrors} = useFormState();
	return <Button {...props} type={isChanged() ? 'primary' : 'tertiary'} disabled={hasErrors()} />;
};

FormSubmit.propTypes = {
	id: PropTypes.string,
	componentId: PropTypes.string,
	text: PropTypes.string,
	className: PropTypes.string,
	tooltipText: PropTypes.string,
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
};

export default FormSubmit;
