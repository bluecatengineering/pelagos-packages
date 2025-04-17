import PropTypes from 'prop-types';

export const dataPropType = PropTypes.shape({
	format: PropTypes.oneOf(['tidy', 'columns', 'native']),
	groupFormatter: PropTypes.func,
	groupMapsTo: PropTypes.string,
	loading: PropTypes.bool,
	selectedGroups: PropTypes.array,
});

export const colorPropType = PropTypes.shape({
	pairing: PropTypes.shape({groupCount: PropTypes.number, option: PropTypes.number}),
});

export const axisPropType = PropTypes.shape({
	domain: PropTypes.array,
	mapsTo: PropTypes.string,
	extendLinearDomainBy: PropTypes.string,
	scaleType: PropTypes.oneOf(['labels', 'time', 'linear', 'log']),
	ticks: PropTypes.shape({formatter: PropTypes.func}),
	title: PropTypes.string,
});

export const legendPropType = PropTypes.shape({
	alignment: PropTypes.oneOf(['start', 'center', 'end']),
	clickable: PropTypes.bool,
	enabled: PropTypes.bool,
	order: PropTypes.arrayOf(PropTypes.string),
	position: PropTypes.oneOf(['right', 'left', 'top', 'bottom']),
});

export const hintPropType = PropTypes.shape({
	custom: PropTypes.func,
	enabled: PropTypes.bool,
	groupLabel: PropTypes.string,
	headerFormatter: PropTypes.func,
	showTotal: PropTypes.bool,
	title: PropTypes.string,
	totalLabel: PropTypes.string,
	valueFormatter: PropTypes.func,
});

export const pointsPropType = PropTypes.shape({
	enabled: PropTypes.bool,
	fillOpacity: PropTypes.number,
	filled: PropTypes.bool,
	radius: PropTypes.number,
});
