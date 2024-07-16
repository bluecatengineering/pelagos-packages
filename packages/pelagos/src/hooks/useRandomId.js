import {useMemo} from 'react';

/**
 * Returns either the specified string or a stable random string.
 * @param {string} [id] the ID to use.
 * @returns {string} the ID.
 */
const useRandomId = (id) =>
	useMemo(() => id || `e${performance.now().toString(36)}${Math.random().toString(36).slice(1)}`, [id]);

export default useRandomId;
