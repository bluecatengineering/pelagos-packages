import {useCallback} from 'react';

import handleButtonKeyDown from '../functions/handleButtonKeyDown';

/** @deprecated use handleButtonKeyDown instead. */
export default () => useCallback(handleButtonKeyDown, []);
