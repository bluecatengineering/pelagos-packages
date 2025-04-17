import SimpleBarChart from './SimpleBarChart';

export default {
	title: 'Experimental Charts/SimpleBarChart',
	component: SimpleBarChart,
};

export const Default = {
	args: {
		className: 'Story__chart',
		data: [
			{key: 'Alpha', value: 5e3},
			{key: 'Beta', value: 9e3},
			{key: 'Gamma', value: 6e3},
			{key: 'Delta', value: 2e3},
		],
	},
};

export const WithNegativeValues = {
	args: {
		className: 'Story__chart',
		data: [
			{key: 'Alpha', value: 5e3},
			{key: 'Beta', value: 1e-3},
			{key: 'Gamma', value: 0},
			{key: 'Delta', value: -1e-3},
			{key: 'Kappa', value: -3e3},
		],
	},
};

export const WithMarker = {
	args: {
		className: 'Story__chart',
		data: [
			{key: 'Alpha', value: 5e3, marker: 6e3},
			{key: 'Beta', value: 9e3, marker: 9.5e3},
			{key: 'Gamma', value: 6e3, marker: 5e3},
			{key: 'Delta', value: 2e3, marker: 2.5e3},
		],
		leftAxis: {extendLinearDomainBy: 'marker'},
	},
};

export const Horizontal = {
	args: {
		className: 'Story__chart',
		data: [
			{key: 'Alpha', value: 5e3},
			{key: 'Beta', value: 9e3},
			{key: 'Gamma', value: 6e3},
			{key: 'Delta', value: 2e3},
		],
		bottomAxis: {scaleType: 'linear'},
		leftAxis: {scaleType: 'labels'},
	},
};

export const HorizontalWithNegativeValues = {
	args: {
		className: 'Story__chart',
		data: [
			{key: 'Alpha', value: 5e3},
			{key: 'Beta', value: 1e-3},
			{key: 'Gamma', value: 0},
			{key: 'Delta', value: -1e-3},
			{key: 'Kappa', value: -3e3},
		],
		bottomAxis: {scaleType: 'linear'},
		leftAxis: {scaleType: 'labels'},
	},
};

export const HorizontalWithMarker = {
	args: {
		className: 'Story__chart',
		data: [
			{key: 'Alpha', value: 5e3, marker: 6e3},
			{key: 'Beta', value: 9e3, marker: 9.5e3},
			{key: 'Gamma', value: 6e3, marker: 5e3},
			{key: 'Delta', value: 2e3, marker: 2.5e3},
		],
		bottomAxis: {scaleType: 'linear', extendLinearDomainBy: 'marker'},
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
