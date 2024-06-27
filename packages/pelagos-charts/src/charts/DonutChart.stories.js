import {useState} from 'react';

import DonutChart from './DonutChart';

export default {
	title: 'Experimental Charts/DonutChart',
	component: DonutChart,
	parameters: {layout: 'fullscreen'},
	render: (args) => {
		const [selectedGroups, setSelectedGroups] = useState([]);
		return (
			<DonutChart
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
			{group: 'Alpha', value: 5},
			{group: 'Beta', value: 9},
			{group: 'Gamma', value: 3},
		],
		center: {label: 'Items', number: 17},
	},
};

export const LotsOfLabels = {
	args: {
		className: 'Story__chart',
		data: [
			{group: 'Alpha', value: 10},
			{group: 'Bravo', value: 10},
			{group: 'Charlie', value: 10},
			{group: 'Delta', value: 10},
			{group: 'Echo', value: 10},
			{group: 'Foxtrot', value: 10},
			{group: 'Golf', value: 10},
			{group: 'Hotel', value: 10},
			{group: 'India', value: 10},
			{group: 'Juliet', value: 10},
			{group: 'Kilo', value: 10},
			{group: 'Lima', value: 10},
			{group: 'Mike', value: 10},
			{group: 'November', value: 10},
		],
		center: {label: 'Items', number: 140},
	},
};

export const Zero = {
	args: {
		className: 'Story__chart',
		data: [
			{group: 'Alpha', value: 0},
			{group: 'Beta', value: 0},
			{group: 'Gamma', value: 0},
		],
		center: {label: 'Items'},
	},
};

export const Skeleton = {
	args: {
		className: 'Story__chart',
		dataOptions: {loading: true},
		center: {label: 'Items'},
	},
};
