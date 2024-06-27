import {useState} from 'react';

import StackedBarChart from './StackedBarChart';

export default {
	title: 'Experimental Charts/StackedBarChart',
	component: StackedBarChart,
	render: (args) => {
		const [selectedGroups, setSelectedGroups] = useState([]);
		return (
			<StackedBarChart
				{...args}
				dataOptions={{...args?.dataOptions, selectedGroups}}
				onSelectionChange={setSelectedGroups}
			/>
		);
	},
};

export const Default = {
	args: {
		className: 'Story__chart',
		data: [
			{group: 'Alpha', key: 'a', value: 5e3},
			{group: 'Alpha', key: 'b', value: 12e3},
			{group: 'Alpha', key: 'c', value: 8e3},
			{group: 'Alpha', key: 'd', value: 17e3},
			{group: 'Beta', key: 'a', value: 5e3},
			{group: 'Beta', key: 'b', value: 9e3},
			{group: 'Beta', key: 'c', value: 13e3},
			{group: 'Beta', key: 'd', value: null},
			{group: 'Gamma', key: 'a', value: 3e3},
			{group: 'Gamma', key: 'b', value: 16e3},
			{group: 'Gamma', key: 'c', value: 12e3},
			{group: 'Gamma', key: 'd', value: 6e3},
		],
	},
};

export const Expanded = {
	args: {
		className: 'Story__chart',
		data: [
			{group: 'Alpha', key: 'a', value: 5e3},
			{group: 'Alpha', key: 'b', value: 12e3},
			{group: 'Alpha', key: 'c', value: 8e3},
			{group: 'Alpha', key: 'd', value: 17e3},
			{group: 'Beta', key: 'a', value: 5e3},
			{group: 'Beta', key: 'b', value: 9e3},
			{group: 'Beta', key: 'c', value: 13e3},
			{group: 'Beta', key: 'd', value: 1e3},
			{group: 'Gamma', key: 'a', value: 3e3},
			{group: 'Gamma', key: 'b', value: 16e3},
			{group: 'Gamma', key: 'c', value: 12e3},
			{group: 'Gamma', key: 'd', value: 6e3},
		],
		stack: {offset: 'expand'},
		leftAxis: {ticks: {formatter: (n) => n * 100}},
	},
};

export const Diverging = {
	args: {
		className: 'Story__chart',
		data: [
			{group: 'Alpha', key: 'a', value: -5e3},
			{group: 'Alpha', key: 'b', value: -12e3},
			{group: 'Alpha', key: 'c', value: -8e3},
			{group: 'Alpha', key: 'd', value: -17e3},
			{group: 'Beta', key: 'a', value: 5e3},
			{group: 'Beta', key: 'b', value: 9e3},
			{group: 'Beta', key: 'c', value: 13e3},
			{group: 'Beta', key: 'd', value: 1e3},
			{group: 'Gamma', key: 'a', value: 3e3},
			{group: 'Gamma', key: 'b', value: 16e3},
			{group: 'Gamma', key: 'c', value: 12e3},
			{group: 'Gamma', key: 'd', value: 6e3},
		],
		stack: {offset: 'diverging'},
	},
};

export const Horizontal = {
	args: {
		className: 'Story__chart',
		data: [
			{group: 'Alpha', key: 'a', value: 5e3},
			{group: 'Alpha', key: 'b', value: 12e3},
			{group: 'Alpha', key: 'c', value: 8e3},
			{group: 'Alpha', key: 'd', value: 17e3},
			{group: 'Beta', key: 'a', value: 5e3},
			{group: 'Beta', key: 'b', value: 9e3},
			{group: 'Beta', key: 'c', value: 13e3},
			{group: 'Beta', key: 'd', value: 1e3},
			{group: 'Gamma', key: 'a', value: 3e3},
			{group: 'Gamma', key: 'b', value: 16e3},
			{group: 'Gamma', key: 'c', value: 12e3},
			{group: 'Gamma', key: 'd', value: 6e3},
		],
		bottomAxis: {scaleType: 'linear'},
		leftAxis: {scaleType: 'labels'},
	},
};

export const Empty = {
	args: {
		className: 'Story__chart',
		data: [],
	},
};

export const Skeleton = {
	args: {
		className: 'Story__chart',
		dataOptions: {loading: true},
	},
};
