export default (data, selected, getGroup, getBottomValue, getLeftValue) => {
	const selectedSet = new Set(selected);
	const allSelected = selectedSet.size === 0;
	const bottomSet = new Set();
	const leftSet = new Set();
	const groups = new Map();
	const groupIndex = new Map();
	const hintValues = new Map();
	const pointList = [];
	for (const d of data) {
		const group = getGroup(d);
		if (!groupIndex.has(group)) {
			groupIndex.set(group, groupIndex.size);
		}
		if (allSelected || selectedSet.has(group)) {
			const bottomValue = getBottomValue(d);
			const leftValue = getLeftValue(d);
			bottomSet.add(bottomValue);
			if (leftValue !== null) {
				leftSet.add(leftValue);
				const value = [group, leftValue];
				const hintList = hintValues.get(bottomValue);
				if (hintList) {
					hintList.push(value);
				} else {
					hintValues.set(bottomValue, [value]);
				}
				pointList.push([group, bottomValue, leftValue]);
			}
			const groupList = groups.get(group);
			if (groupList) {
				groupList.push(leftValue);
			} else {
				groups.set(group, [leftValue]);
			}
		}
	}
	const bottomList = Array.from(bottomSet);
	const leftList = Array.from(leftSet);
	return {groups, groupIndex, hintValues, leftList, bottomList, pointList};
};
