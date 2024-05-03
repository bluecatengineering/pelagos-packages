import {useState} from 'react';

import ScatterChart from './ScatterChart';

export default {
	title: 'Experimental Charts/ScatterChart',
	component: ScatterChart,
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks -- story
		const [selectedGroups, setSelectedGroups] = useState([]);
		return (
			<ScatterChart
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
			{group: 'Beta', key: 'a', value: null},
			{group: 'Beta', key: 'b', value: 9e3},
			{group: 'Beta', key: 'c', value: 13e3},
			{group: 'Beta', key: 'd', value: 1e3},
			{group: 'Gamma', key: 'a', value: 3e3},
			{group: 'Gamma', key: 'b', value: null},
			{group: 'Gamma', key: 'c', value: 12e3},
			{group: 'Gamma', key: 'd', value: 6e3},
		],
	},
};

export const WithNegativeValues = {
	args: {
		className: 'Story__chart',
		data: [
			{group: 'Alpha', key: 'a', value: 0},
			{group: 'Alpha', key: 'b', value: 7000},
			{group: 'Alpha', key: 'c', value: 3000},
			{group: 'Alpha', key: 'd', value: 12000},
			{group: 'Beta', key: 'a', value: null},
			{group: 'Beta', key: 'b', value: 4000},
			{group: 'Beta', key: 'c', value: 8000},
			{group: 'Beta', key: 'd', value: -4000},
			{group: 'Gamma', key: 'a', value: -2000},
			{group: 'Gamma', key: 'b', value: null},
			{group: 'Gamma', key: 'c', value: 7000},
			{group: 'Gamma', key: 'd', value: 1000},
		],
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
