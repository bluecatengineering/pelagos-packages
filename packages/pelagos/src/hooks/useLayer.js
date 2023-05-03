import {useContext} from 'react';

import LayerContext from './LayerContext';

/**
 * Returns the current layer number.
 * @returns {number}
 *
 * @example
 * import {useLayer} from '@bluecateng/pelagos';
 *
 * const Example = () => {
 *   const layer = useLayer();
 *   return <div />;
 * }
 */
const useLayer = () => useContext(LayerContext);

export default useLayer;
