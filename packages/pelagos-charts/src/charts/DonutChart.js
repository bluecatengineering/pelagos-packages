import {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {sum} from 'd3-array';
import {format} from 'd3-format';
import {select} from 'd3-selection';
import {arc, pie} from 'd3-shape';
import identity from 'lodash-es/identity';
import {addResizeObserver, Layer, useRandomId} from '@bluecateng/pelagos';

import {colorPropType, dataPropType, hintPropType, legendPropType} from './ChartPropTypes';
import getDefaultClass from './getDefaultClass';
import getColorClass from './getColorClass';
import getColorVariant from './getColorVariant';
import useSetHintPosition from './useSetHintPosition';
import legendDirections from './legendDirections';
import Legend from './Legend';
import setGradientParameters from './setGradientParameters';
import LoadingGradient from './LoadingGradient';
import './Chart.less';

const {PI, floor, min} = Math;

const emptyArcs = [{startAngle: 0, endAngle: 2 * PI}];

const siFormatter = format('.3s');

const getChartValue = (d) => d[1];

const DonutChart = ({
	id,
	className,
	data,
	dataOptions,
	color,
	center,
	donut,
	legend,
	hint,
	getFillClass = getDefaultClass,
	getBgClass = getDefaultClass,
	onClick,
	onLegendClick,
	onSelectionChange,
}) => {
	id = useRandomId(id);

	const {
		groupFormatter: dataGroupFormatter,
		groupMapsTo: dataGroupMapsTo,
		loading: dataLoading,
		selectedGroups: dataSelectedGroups,
	} = {
		groupFormatter: identity,
		groupMapsTo: 'group',
		loading: false,
		...dataOptions,
	};
	const {groupCount: colorGroupCount, option: colorOption} = {groupCount: null, option: 1, ...color?.pairing};
	const {
		label: centerLabel,
		number: centerNumber,
		numberFormatter: centerNumberFormatter,
	} = {numberFormatter: siFormatter, ...center};
	const {valueMapsTo: donutValueMapsTo} = {valueMapsTo: 'value', ...donut};
	const {
		alignment: legendAlignment,
		clickable: legendClickable,
		enabled: legendEnabled,
		order: legendOrder,
		position: legendPosition,
	} = {alignment: 'start', clickable: true, enabled: true, position: 'bottom', ...legend};
	const {enabled: hintEnabled, valueFormatter: hintValueFormatter} = {
		enabled: true,
		valueFormatter: siFormatter,
		...hint,
	};

	const gradientId = `${id}-loading`;
	const state = useMemo(() => {
		if (dataLoading) {
			return {groupIndex: new Map(), empty: true};
		}
		const selectedSet = new Set(dataSelectedGroups);
		const chartData = data.map((d) => [d[dataGroupMapsTo], d[donutValueMapsTo], d]);
		const groupIndex = new Map(chartData.map((d, index) => [d[0], index]));
		const filteredData = selectedSet.size === 0 ? chartData : chartData.filter((d) => selectedSet.has(d[0]));
		const empty = sum(filteredData, getChartValue) === 0;
		const arcs = empty ? null : pie().value(getChartValue).padAngle(0.01)(filteredData);
		return {arcs, groupIndex, empty};
	}, [data, dataGroupMapsTo, dataLoading, dataSelectedGroups, donutValueMapsTo]);

	const ref = useRef(null);
	const drawRef = useRef(null);
	const hintRef = useRef(null);
	const [hintData, setHintData] = useState({});
	useLayoutEffect(() => {
		const {arcs, groupIndex, empty} = state;
		const colorVariant = getColorVariant(colorGroupCount, groupIndex.size);

		const draw = (drawRef.current = ({width, height}) => {
			const size = min(width, height);
			const radius = floor(size / 2);
			const innerRadius = radius * 0.75;
			const centerX = radius;
			const centerY = floor(height / 2);

			const arcGenerator = arc().innerRadius(innerRadius).outerRadius(radius);

			const wrapper = ref.current.firstChild;
			wrapper.setAttribute('x', centerX);
			wrapper.setAttribute('y', centerY);

			if (dataLoading) {
				setGradientParameters(wrapper, size, 1);
			}

			if (empty) {
				select(wrapper.firstChild)
					.selectAll('path')
					.data(emptyArcs)
					.join('path')
					.attr('class', dataLoading ? null : 'Chart--donutEmpty')
					.attr('fill', dataLoading ? `url('#${gradientId}')` : null)
					.attr('d', (d) => arcGenerator(d))
					.attr('aria-hidden', 'true')
					.on('click', null)
					.on('mousemove', null);
			} else {
				const path = select(wrapper.firstChild)
					.selectAll('path')
					.data(arcs)
					.join('path')
					.attr('class', (d) =>
						getFillClass(
							d.data[0],
							null,
							d.data[1],
							getColorClass('fill', colorVariant, colorOption, groupIndex.get(d.data[0]))
						)
					)
					.attr('d', (d) => arcGenerator(d))
					.attr('role', 'graphics-symbol')
					.attr('aria-roledescription', `slice`) // TODO translate
					.attr('aria-label', (d) => `${dataGroupFormatter(d.data[0])}, ${d.data[1]}`);

				if (onClick) {
					path.on('click', (_, d) => onClick(d.data[2]));
				} else {
					path.on('click', null);
				}

				if (hintEnabled) {
					path.on('mousemove', (event, d) =>
						setHintData({
							visible: true,
							x: event.clientX,
							y: event.clientY,
							content: (
								<Layer className="Chart__simpleHint">
									<span>{dataGroupFormatter(d.data[0])}</span>
									<span>{hintValueFormatter(d.data[1])}</span>
								</Layer>
							),
						})
					);
				} else {
					path.on('mousemove', null);
				}
			}
		});
		draw(ref.current.getBoundingClientRect());
	}, [
		colorGroupCount,
		colorOption,
		dataGroupFormatter,
		dataLoading,
		getFillClass,
		gradientId,
		hintEnabled,
		hintValueFormatter,
		onClick,
		state,
	]);
	useEffect(() => addResizeObserver(ref.current, (r) => drawRef.current(r)), []);

	useSetHintPosition(hintData, hintRef, ref);

	const handleMouseLeave = useCallback(() => setHintData((hintData) => ({...hintData, visible: false})), []);

	const hasCenterNumber = centerNumber !== undefined && centerNumber !== null;
	return (
		<div id={id} className={`Chart Chart__wrapper${className ? ` ${className}` : ''}`}>
			{useMemo(
				() => (
					<svg className="Chart__chart" ref={ref}>
						<svg className="Chart__donutWrapper">
							<g onMouseLeave={handleMouseLeave} role="group" aria-label={/* TODO translate */ `data`} />
							{dataLoading ? (
								<LoadingGradient id={gradientId} className="Chart__loadingAreas" />
							) : (
								<g role="group" aria-label={/* TODO translate */ `center`}>
									{hasCenterNumber && (
										<text className="Chart__donutNumber" textAnchor="middle" dominantBaseline="middle" y="-10">
											{centerNumberFormatter(centerNumber)}
										</text>
									)}
									<text
										className="Chart__donutTitle"
										textAnchor="middle"
										dominantBaseline="middle"
										y={hasCenterNumber ? 10 : 0}>
										{centerLabel}
									</text>
								</g>
							)}
						</svg>
					</svg>
				),
				[centerLabel, centerNumber, centerNumberFormatter, dataLoading, gradientId, handleMouseLeave, hasCenterNumber]
			)}
			{legendEnabled && (
				<Legend
					className={`${legendAlignment} ${legendPosition}`}
					groups={legendOrder || Array.from(state.groupIndex.keys())}
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
			<div className={`Chart__hintContainer${hintData.visible ? ' visible' : ''}`} ref={hintRef}>
				{hintData.content}
			</div>
		</div>
	);
};

DonutChart.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	data: PropTypes.array,
	dataOptions: dataPropType,
	color: colorPropType,
	center: PropTypes.shape({label: PropTypes.string, number: PropTypes.number, numberFormatter: PropTypes.func}),
	donut: PropTypes.shape({valueMapsTo: PropTypes.string}),
	legend: legendPropType,
	hint: hintPropType,
	getFillClass: PropTypes.func,
	getBgClass: PropTypes.func,
	onClick: PropTypes.func,
	onLegendClick: PropTypes.func,
	onSelectionChange: PropTypes.func,
};

export default DonutChart;
