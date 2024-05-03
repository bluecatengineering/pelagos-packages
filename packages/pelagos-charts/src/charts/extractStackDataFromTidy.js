export default (data, selected, getGroup, getLabel, getValue) => {
	const selectedSet = new Set(selected);
	const allSelected = selectedSet.size === 0;
	const groupSet = new Set();
	const labelSet = new Set();
	const stackData = new Map();
	const groupIndex = new Map();
	const hintValues = new Map();
	for (const d of data) {
		const group = getGroup(d);
		if (!groupIndex.has(group)) {
			groupIndex.set(group, groupIndex.size);
		}
		if (allSelected || selectedSet.has(group)) {
			const value = getValue(d);
			groupSet.add(group);
			if (value !== null) {
				const label = getLabel(d);
				labelSet.add(label);
				const hintValue = [group, value];
				const hintList = hintValues.get(label);
				if (hintList) {
					hintList.push(hintValue);
				} else {
					hintValues.set(label, [hintValue]);
				}
				const groupMap = stackData.get(label);
				if (groupMap) {
					groupMap.set(group, value);
				} else {
					stackData.set(label, new Map([[group, value]]));
				}
			}
		}
	}
	return {stackData, groupSet, groupIndex, hintValues, labelSet};
};
