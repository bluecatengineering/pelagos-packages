import {memo} from 'react';
import PropTypes from 'prop-types';

import useFormField from './useFormField';

export default (Component, mapState) => {
	const displayName = `Form(${Component.displayName || Component.name})`;
	const MemoizedComponent = memo(Component);
	const Wrapper = ({name, ...props}) => {
		const state = useFormField(name);
		const newProps = {name, ...props, ...mapState(state)};
		return <MemoizedComponent {...newProps} />;
	};
	Wrapper.displayName = displayName;
	Wrapper.propTypes = {
		name: PropTypes.string.isRequired,
	};
	return Wrapper;
};
