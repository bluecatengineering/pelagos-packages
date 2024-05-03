import 'core-js/actual/iterator/filter';
import 'core-js/actual/iterator/map';

export default ({labels: bottomList, groups: groupData}, selectedGroups) => {
	const selectedSet = new Set(selectedGroups);
	const allGroups = new Map(groupData);
	const allSelected = selectedSet.size === 0 || selectedSet.size === allGroups.size;
	const groups = allSelected ? allGroups : new Map(allGroups.entries().filter(([key]) => selectedSet.has(key)));
	const groupIndex = new Map(allGroups.keys().map((key, index) => [key, index]));
	const hintValues = new Map();
	const leftSet = new Set();
	const pointList = [];
	if (bottomList) {
		bottomList.forEach((bottomValue, i) => {
			const hintList = [];
			hintValues.set(bottomValue, hintList);
			for (const [group, list] of groups) {
				const leftValue = list[i];
				if (leftValue !== null) {
					leftSet.add(leftValue);
					hintList.push([group, leftValue]);
					pointList.push([group, bottomValue, leftValue]);
				}
			}
		});
	}
	const leftList = Array.from(leftSet);
	return {groups, groupIndex, hintValues, leftList, bottomList, pointList};
};
