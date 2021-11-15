import {createContext, forwardRef, useContext} from 'react';
import PropTypes from 'prop-types';

const {min} = Math;

export const LayerContext = createContext(0);

/** Starts a new layer. */
const Layer = forwardRef(({as: BaseComponent = 'div', children, ...props}, ref) => {
	const layer = min(useContext(LayerContext) + 1, 3);
	return (
		<LayerContext.Provider value={layer}>
			<BaseComponent {...props} data-layer={layer} ref={ref}>
				{children}
			</BaseComponent>
		</LayerContext.Provider>
	);
});

Layer.displayName = 'Layer';

Layer.propTypes = {
	/** Element or custom component to use as top-level element. */
	as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
	/** The child elements. */
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

export default Layer;
