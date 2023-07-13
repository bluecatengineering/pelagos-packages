import {useState} from 'react';

import MultiColumn from './MultiColumn';
import LabelLine from './LabelLine';

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
	parameters: {
		controls: {hideNoControlsWarning: true},
	},
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

const getItemCountWired = () => new Promise((resolve) => setTimeout(() => resolve(26), 500));
const isLeafWired = (path) => path.length >= 5;
const renderItemWired = (path) => String.fromCharCode(...path.map((i) => 97 + i));

const WiredComponent = () => {
	const [path, setPath] = useState([0]);
	return (
		<div className="AppMulti">
			<LabelLine id="label" text="Letters" />
			<MultiColumn
				className="AppMulti__multi"
				path={path}
				colWidth="16em"
				emptyText="No letters available"
				getItemCount={getItemCountWired}
				isLeaf={isLeafWired}
				aria-labelledby="label"
				renderItem={renderItemWired}
				onChange={setPath}
			/>
		</div>
	);
};

export const TryItOut = {
	name: 'Try it out!',
	render: () => <WiredComponent />,
};
