import {useState} from 'react';

import LineChart from './LineChart';

export default {
	title: 'Experimental Charts/LineChart',
	component: LineChart,
	render: (args) => {
		const [selectedGroups, setSelectedGroups] = useState([]);
		return (
			<LineChart {...args} dataOptions={{...args?.dataOptions, selectedGroups}} onSelectionChange={setSelectedGroups} />
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

export const TimeScale = {
	args: {
		className: 'Story__chart',
		data: [
			{group: 'Alpha', date: 1704085200000, value: 5},
			{group: 'Alpha', date: 1705294800000, value: 12},
			{group: 'Alpha', date: 1706763600000, value: 8},
			{group: 'Alpha', date: 1707973200000, value: 17},
			{group: 'Beta', date: 1704085200000, value: null},
			{group: 'Beta', date: 1705294800000, value: 9},
			{group: 'Beta', date: 1706763600000, value: 13},
			{group: 'Beta', date: 1707973200000, value: 1},
			{group: 'Gamma', date: 1704085200000, value: 3},
			{group: 'Gamma', date: 1705294800000, value: null},
			{group: 'Gamma', date: 1706763600000, value: 12},
			{group: 'Gamma', date: 1707973200000, value: 6},
		],
		curve: 'natural',
		leftAxis: {title: 'Value'},
		bottomAxis: {title: 'Time', scaleType: 'time'},
		points: {filled: true},
	},
};

export const LogScale = {
	args: {
		className: 'Story__chart',
		data: [
			{group: 'Alpha', key: 'a', value: 5},
			{group: 'Alpha', key: 'b', value: 9e1},
			{group: 'Alpha', key: 'c', value: 8e3},
			{group: 'Alpha', key: 'd', value: 17e1},
			{group: 'Beta', key: 'a', value: null},
			{group: 'Beta', key: 'b', value: 9e3},
			{group: 'Beta', key: 'c', value: 5e1},
			{group: 'Beta', key: 'd', value: 1e1},
			{group: 'Gamma', key: 'a', value: 3e2},
			{group: 'Gamma', key: 'b', value: null},
			{group: 'Gamma', key: 'c', value: 12e1},
			{group: 'Gamma', key: 'd', value: 6e3},
		],
		leftAxis: {scaleType: 'log'},
	},
};

export const BothScalesLinear = {
	args: {
		className: 'Story__chart',
		data: [
			{group: 'Alpha', x: 1, y: 5e3},
			{group: 'Alpha', x: 2, y: 12e3},
			{group: 'Alpha', x: 3, y: 8e3},
			{group: 'Alpha', x: 4, y: 17e3},
			{group: 'Beta', x: 1, y: null},
			{group: 'Beta', x: 2, y: 9e3},
			{group: 'Beta', x: 3, y: 13e3},
			{group: 'Beta', x: 4, y: 1e3},
			{group: 'Gamma', x: 1, y: 3e3},
			{group: 'Gamma', x: 2, y: null},
			{group: 'Gamma', x: 3, y: 12e3},
			{group: 'Gamma', x: 4, y: 6e3},
		],
		bottomAxis: {scaleType: 'linear', mapsTo: 'x'},
		leftAxis: {mapsTo: 'y'},
	},
};

export const BothScalesLabels = {
	args: {
		className: 'Story__chart',
		data: [
			{group: 'Alpha', x: 'a', y: 'One'},
			{group: 'Alpha', x: 'b', y: 'Two'},
			{group: 'Alpha', x: 'c', y: 'Three'},
			{group: 'Alpha', x: 'd', y: 'Four'},
			{group: 'Beta', x: 'a', y: null},
			{group: 'Beta', x: 'b', y: 'Five'},
			{group: 'Beta', x: 'c', y: 'Two'},
			{group: 'Beta', x: 'd', y: 'Four'},
			{group: 'Gamma', x: 'a', y: 'Three'},
			{group: 'Gamma', x: 'b', y: null},
			{group: 'Gamma', x: 'c', y: 'One'},
			{group: 'Gamma', x: 'd', y: 'Five'},
		],
		bottomAxis: {mapsTo: 'x'},
		leftAxis: {scaleType: 'labels', mapsTo: 'y'},
		hint: {showTotal: false},
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
