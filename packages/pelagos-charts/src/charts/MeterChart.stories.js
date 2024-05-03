import MeterChart from './MeterChart';

export default {
	title: 'Experimental Charts/MeterChart',
	component: MeterChart,
};

export const Default = {
	args: {
		className: 'Story__alignStretch',
		data: [{group: 'Alpha', value: 35}],
		meter: {peak: 90},
	},
};

export const DefaultWithStatusOk = {
	args: {
		className: 'Story__alignStretch',
		data: [{group: 'Alpha', value: 35}],
		meter: {peak: 90, status: {thresholds: {warning: 75, danger: 90}}},
	},
};

export const DefaultWithStatusWarning = {
	args: {
		className: 'Story__alignStretch',
		data: [{group: 'Alpha', value: 85}],
		meter: {peak: 90, status: {thresholds: {warning: 75, danger: 90}}},
	},
};

export const DefaultWithStatusDanger = {
	args: {
		className: 'Story__alignStretch',
		data: [{group: 'Alpha', value: 95}],
		meter: {peak: 97, status: {thresholds: {warning: 75, danger: 90}}},
	},
};

export const Proportional = {
	args: {
		className: 'Story__alignStretch',
		data: [
			{group: 'Alpha', value: 12},
			{group: 'Beta', value: 15},
			{group: 'Gamma', value: 6},
		],
		meter: {
			proportional: {total: 64, unit: 'GB'},
			peak: 58,
		},
	},
};

export const ProportionalWithStatus = {
	args: {
		className: 'Story__alignStretch',
		data: [
			{group: 'Alpha', value: 12},
			{group: 'Beta', value: 15},
			{group: 'Gamma', value: 6},
		],
		meter: {
			proportional: {total: 64, unit: 'GB'},
			peak: 58,
			status: {thresholds: {warning: 48, danger: 56}},
		},
	},
};

export const ProportionalWithFormatters = {
	args: {
		className: 'Story__alignStretch',
		data: [
			{group: 'Alpha', value: 12},
			{group: 'Beta', value: 15},
			{group: 'Gamma', value: 6},
		],
		meter: {
			proportional: {
				total: 64,
				unit: 'GB',
				breakdownFormatter: (used, available) =>
					`${used} used, ${available} available. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
				totalFormatter: (total) => `custom total ${total}`,
			},
			peak: 58,
		},
	},
};
