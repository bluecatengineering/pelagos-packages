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
const renderItem = (path) => {
	switch (path.length) {
		case 1:
			return columns[0][path[0]];
		case 2:
			return columns[0][path[0]] + columns[1][path[1]];
		case 3:
			return columns[0][path[0]] + columns[1][path[1]] + '-' + columns[2][path[2]];
	}
	return 'Error';
};

export default {
	title: 'Components/MultiColumn',
	component: MultiColumn,
	parameters: {
		controls: {hideNoControlsWarning: true},
	},
};

export const Default = {
	args: {path, getItemCount, isLeaf, renderItem},
	render: (args) => {
		const [path, setPath] = useState(args.path);
		return <MultiColumn {...args} path={path} onChange={setPath} />;
	},
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

export const LargeExample = {
	args: {path: [0], colWidth: '16em', emptyText: 'No letters available'},
	render: (args) => {
		const [path, setPath] = useState(args.path);
		return (
			<div className="AppMulti">
				<LabelLine id="label" text="Letters" />
				<MultiColumn
					{...args}
					className="AppMulti__multi"
					path={path}
					getItemCount={getItemCountWired}
					isLeaf={isLeafWired}
					aria-labelledby="label"
					renderItem={renderItemWired}
					onChange={setPath}
				/>
			</div>
		);
	},
};
