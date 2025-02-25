import {useMemo} from 'react';
import PropTypes from 'prop-types';
import {sum} from 'd3-array';
import identity from 'lodash-es/identity';
import {Layer, useRandomId} from '@bluecateng/pelagos';
import CheckmarkFilled from '@carbon/icons-react/es/CheckmarkFilled';
import WarningFilled from '@carbon/icons-react/es/WarningFilled';
import ErrorFilled from '@carbon/icons-react/es/ErrorFilled';

import {colorPropType, dataPropType, legendPropType} from './ChartPropTypes';
import {getDefaultClass, getGroup, getValue} from './Getters';
import legendDirections from './legendDirections';
import Legend from './Legend';
import getColorClass from './getColorClass';
import getColorVariant from './getColorVariant';
import './Chart.less';

const getChartValue = (d) => d[1];

const numberFormats = {
	default: new Intl.NumberFormat(undefined, {}),
	percent: new Intl.NumberFormat(undefined, {style: 'percent'}),
};
const number = (value, style = 'default') => numberFormats[style].format(value);

const formatStandardTitle = (group, value) => `${group} ${number(value, 'percent')}`; // TODO translate

const defaultBreakdownFormatter = (used, available, unit) =>
	`${number(used)} ${unit} used (${number(available)} ${unit} available)`; // TODO translate

const defaultTotalFormatter = (total, unit) => `${number(total)} ${unit} total`; // TODO translate

const getStateBg = (stateTotal, thresholdWarning, thresholdDanger) =>
	stateTotal < thresholdWarning
		? 'Chart__meterSuccessBg'
		: stateTotal < thresholdDanger
			? 'Chart__meterWarningBg'
			: 'Chart__meterDangerBg';

const MeterChart = ({
	id,
	className,
	data,
	dataOptions,
	color,
	meter,
	legend,
	getBgClass = getDefaultClass,
	onLegendClick,
	onSelectionChange,
}) => {
	id = useRandomId(id);
	const {
		groupFormatter: dataGroupFormatter,
		groupMapper: dataGroupMapper,
		selectedGroups: dataSelectedGroups,
	} = {
		groupFormatter: identity,
		groupMapper: getGroup,
		...dataOptions,
	};
	const {groupCount: colorGroupCount, option: colorOption} = {groupCount: null, option: 1, ...color?.pairing};
	const {
		height: meterHeight,
		peak: meterPeak,
		proportional: meterProportional,
		showLabels: meterShowLabels,
		status: meterStatus,
		valueMapper: meterValueMapper,
	} = {height: 8, showLabels: true, valueMapper: getValue, ...meter};
	const {
		total: proportionalTotal,
		unit: proportionalUnit,
		breakdownFormatter: proportionalBreakdownFormatter,
		totalFormatter: proportionalTotalFormatter,
	} = {
		total: 0,
		unit: '',
		breakdownFormatter: defaultBreakdownFormatter,
		totalFormatter: defaultTotalFormatter,
		...meterProportional,
	};
	const {warning: thresholdWarning, danger: thresholdDanger} = {...meterStatus?.thresholds};
	const {
		alignment: legendAlignment,
		clickable: legendClickable,
		enabled: legendEnabled,
		order: legendOrder,
		position: legendPosition,
	} = {alignment: 'start', clickable: false, enabled: !!meterProportional, position: 'bottom', ...legend};

	const {
		total: stateTotal,
		data: stateData,
		groupIndex: stateGroupIndex,
	} = useMemo(() => {
		const selectedSet = new Set(dataSelectedGroups);
		const chartData = data.map((d) => [dataGroupMapper(d), meterValueMapper(d), d]);
		const groupIndex = new Map(chartData.map((d, index) => [d[0], index]));
		const filteredData = selectedSet.size === 0 ? chartData : chartData.filter((d) => selectedSet.has(d[0]));
		return {groupIndex, data: filteredData, total: sum(filteredData, getChartValue)};
	}, [data, dataGroupMapper, dataSelectedGroups, meterValueMapper]);

	const colorVariant = getColorVariant(colorGroupCount, stateGroupIndex.size);

	const title = !meterShowLabels
		? null
		: meterProportional
			? proportionalBreakdownFormatter(stateTotal, proportionalTotal - stateTotal, proportionalUnit)
			: formatStandardTitle(dataGroupFormatter(stateData[0][0]), stateData[0][1] / 100);

	return (
		<div id={id} className={`Chart Chart__wrapper${className ? ` ${className}` : ''}`}>
			<div className="Chart__meter">
				{meterShowLabels && (
					<div className="Chart__meterLabels">
						<div className="Chart__meterTitle" title={title}>
							{title}
						</div>
						<div className="Chart__meterEndLabel">
							{meterProportional && (
								<span className="Chart__meterTotal">
									{proportionalTotalFormatter(proportionalTotal, proportionalUnit)}
								</span>
							)}
							{meterStatus?.thresholds &&
								(stateTotal < thresholdWarning ? (
									<CheckmarkFilled className="Chart__meterSuccess" />
								) : stateTotal < thresholdDanger ? (
									<WarningFilled className="Chart__meterWarning" />
								) : (
									<ErrorFilled className="Chart__meterDanger" />
								))}
						</div>
					</div>
				)}
				<Layer className="Chart__meterTrack" style={{height: `${meterHeight}px`}}>
					{stateData.map(([group, value], index) => (
						<div
							key={index}
							className={getBgClass(
								group,
								null,
								value,
								meterProportional || !meterStatus?.thresholds
									? getColorClass('bg', colorVariant, colorOption, index)
									: getStateBg(stateTotal, thresholdWarning, thresholdDanger)
							)}
							style={{width: meterProportional ? `${(100 * value) / proportionalTotal}%` : `${value}%`}}
						/>
					))}
					{Number.isFinite(meterPeak) && (
						<div
							className="Chart__meterPeak"
							style={{left: meterProportional ? `${(100 * meterPeak) / proportionalTotal}%` : `${meterPeak}%`}}
						/>
					)}
				</Layer>
			</div>
			{legendEnabled && (
				<Legend
					className={`${legendAlignment} ${legendPosition}`}
					groups={legendOrder || Array.from(stateGroupIndex.keys())}
					formatter={dataGroupFormatter}
					direction={legendDirections[legendPosition]}
					clickable={legendClickable}
					selected={dataSelectedGroups}
					color={color}
					getBgClass={getBgClass}
					onClick={onLegendClick}
					onChange={onSelectionChange}
				/>
			)}
		</div>
	);
};

MeterChart.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	data: PropTypes.array,
	dataOptions: dataPropType,
	color: colorPropType,
	meter: PropTypes.shape({
		height: PropTypes.number,
		peak: PropTypes.number,
		proportional: PropTypes.shape({
			total: PropTypes.number,
			unit: PropTypes.string,
			breakdownFormatter: PropTypes.func,
			totalFormatter: PropTypes.func,
		}),
		showLabels: PropTypes.bool,
		status: PropTypes.shape({
			thresholds: PropTypes.shape({
				warning: PropTypes.number.isRequired,
				danger: PropTypes.number.isRequired,
			}),
		}),
		valueMapper: PropTypes.func,
	}),
	legend: legendPropType,
	getBgClass: PropTypes.func,
	onLegendClick: PropTypes.func,
	onSelectionChange: PropTypes.func,
};

export default MeterChart;
