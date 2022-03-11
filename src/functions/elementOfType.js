/** Ensures an instance of a specific component is passed.
 * Adapted from: https://github.com/facebook/react/issues/2979#issuecomment-789320781
 *
 * @param {function|string} type The expected component type.
 * @returns {function}
 */
export default (type) => {
	if (process.env.NODE_ENV === 'production') {
		return () => null;
	}

	const expectedName = type.displayName || type.name || type;
	return (props, propName, componentName, location, propFullName) => {
		const prop = props[propName];
		const actualType = prop.type;
		return actualType === type
			? null
			: new Error(
					`Invalid ${location} \`${propFullName || propName}\` of type \`${
						actualType?.displayName || actualType?.name || actualType || typeof prop
					}\` supplied to \`${componentName}\`, expected instance of \`${expectedName}\`.`
			  );
	};
};
