import MultiColumn from './MultiColumn';

const columns = [
	['a', 'b', 'c'],
	['1', '2', '3'],
	['foo', 'bar', 'baz'],
];
const path = [0, 1];
const getItemCount = (index) => columns[index].length;
const isLeaf = (path) => path.length === 3;
const renderItem = (path) => columns[path.length - 1][path[path.length - 1]];

export default {
	title: 'Components/MultiColumn',
	component: MultiColumn,
};

export const Default = {
	args: {path, getItemCount, isLeaf, renderItem},
};

export const Loading = {
	args: {style: {height: '80px'}, path: [0], getItemCount: () => new Promise(() => {}), isLeaf},
};

export const Empty = {
	args: {path: [], emptyText: 'No data available'},
};
