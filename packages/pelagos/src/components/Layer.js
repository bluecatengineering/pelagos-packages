import {forwardRef, useContext} from 'react';
import PropTypes from 'prop-types';

import LayerContext from '../hooks/LayerContext';

const {min} = Math;

/** Starts a new layer. Usually used with a class which has `background-color` using either `--layer` or `--input`. */
const Layer = forwardRef(({as: BaseComponent = 'div', level, children, ...props}, ref) => {
	const currentLevel = useContext(LayerContext);
	const nextLevel = level || min(currentLevel + 1, 3);
	return (
		<LayerContext.Provider value={nextLevel}>
			<BaseComponent {...props} data-layer={nextLevel} ref={ref}>
				{children}
			</BaseComponent>
		</LayerContext.Provider>
	);
});

Layer.displayName = 'Layer';

Layer.propTypes = {
	/** Element or custom component to use as top-level element. */
	as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
	/** The level for this layer, if specified overrides the hierarchy based level. */
	level: PropTypes.oneOf([1, 2, 3]),
	/** The child elements. */
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

export default Layer;
