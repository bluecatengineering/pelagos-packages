import {useCallback} from 'react';

export default (...refs) =>
	useCallback((current) => {
		for (const ref of refs) {
			if (typeof ref === 'function') {
				ref(current);
			} else if (ref) {
				ref.current = current;
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps -- the dependency is on the references and not on the array
	}, refs);
