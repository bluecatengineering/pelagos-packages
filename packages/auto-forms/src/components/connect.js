import {forwardRef, memo} from 'react';
import PropTypes from 'prop-types';

import useFormField from './useFormField';

export default (Component, mapState) => {
	const displayName = `Form(${Component.displayName || Component.name})`;
	const MemoizedComponent = memo(Component);
	const Wrapper = forwardRef(({name, ...props}, ref) => {
		const state = useFormField(name);
		const newProps = {name, ...props, ...mapState(state)};
		return <MemoizedComponent {...newProps} ref={ref} />;
	});
	Wrapper.displayName = displayName;
	Wrapper.propTypes = {
		name: PropTypes.string.isRequired,
	};
	return Wrapper;
};
