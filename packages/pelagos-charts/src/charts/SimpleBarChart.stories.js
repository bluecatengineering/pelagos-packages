import {Layer} from '@bluecateng/pelagos';
import {format} from 'd3-format';

import SimpleBarChart from './SimpleBarChart';

const siFormatter = format('.3s');

const markerHint = (item) => (
	<Layer as="ul" className="Chart__hint">
		<li>
			<span>{item.key}</span>
		</li>
		<li>
			<span>Value</span>
			<span>{siFormatter(item.value)}</span>
		</li>
		<li>
			<span>Marker</span>
			<span>{siFormatter(item.marker)}</span>
		</li>
	</Layer>
);

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
		hint: {custom: markerHint},
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
		hint: {custom: markerHint},
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
