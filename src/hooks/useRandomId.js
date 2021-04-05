import {useMemo} from 'react';

export default (id) => useMemo(() => id || 'e' + ('' + Math.random()).substr(2), [id]);
