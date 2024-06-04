/**
 * Moves the item in `fromIndex` to `toIndex`, returning a new array.
 * @param {Array} array the source array.
 * @param {number} fromIndex the source index.
 * @param {number} toIndex the target index.
 * @returns {Array} a new array with the item in the specified index.
 */
const moveListItem = (array, fromIndex, toIndex) => {
	const item = array[fromIndex];
	const copy = array.slice(0);
	copy.splice(fromIndex, 1);
	copy.splice(toIndex, 0, item);
	return copy;
};

export default moveListItem;
