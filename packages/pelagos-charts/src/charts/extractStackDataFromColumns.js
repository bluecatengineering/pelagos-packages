import 'core-js/actual/iterator/filter';
import 'core-js/actual/iterator/map';

export default ({labels: labelSet, groups: groupData}, selectedGroups) => {
	const selectedSet = new Set(selectedGroups);
	const allGroups = new Map(groupData);
	const allSelected = selectedSet.size === 0 || selectedSet.size === allGroups.size;
	const groups = allSelected ? allGroups : new Map(allGroups.entries().filter(([key]) => selectedSet.has(key)));
	const groupSet = new Set(groups.keys());
	const groupIndex = new Map(allGroups.keys().map((key, index) => [key, index]));
	const stackData = new Map();
	const hintValues = new Map();
	if (labelSet) {
		labelSet.forEach((label, i) => {
			const groupMap = new Map();
			stackData.set(label, groupMap);
			const hintList = [];
			hintValues.set(label, hintList);
			for (const [group, list] of groups) {
				const value = list[i];
				if (value !== null) {
					groupMap.set(group, value);
					hintList.push([group, value]);
				}
			}
		});
	}
	return {stackData, groupSet, groupIndex, hintValues, labelSet};
};
