import {useCallback} from 'react';

import setLiveText from '../functions/setLiveText';

/** @deprecated use setLiveText instead. */
export default () => useCallback(setLiveText, []);
