import {useMemo} from 'react';

export default (id) => useMemo(() => id || `e${('' + Math.random()).slice(2)}`, [id]);
