import {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {select} from 'd3-selection';
import identity from 'lodash-es/identity';
import {addResizeObserver, useRandomId} from '@bluecateng/pelagos';
import 'core-js/actual/iterator/map';

import {
	axisPropType,
	colorPropType,
	dataPropType,
	hintPropType,
	pointsPropType,
	legendPropType,
} from './ChartPropTypes';
import getDefaultClass from './getDefaultClass';
import getDomain from './getDomain';
import getColorClass from './getColorClass';
import getColorVariant from './getColorVariant';
import createScale from './createScale';
import getPlotBottom from './getPlotBottom';
import getTicks from './getTicks';
import drawLeftAxis from './drawLeftAxis';
import drawBottomAxis from './drawBottomAxis';
import drawGrid from './drawGrid';
import scaleProperties from './scaleProperties';
import tickFormatters from './tickFormatters';
import hintFormatters from './hintFormatters';
import SingleHint from './SingleHint';
import useSetHintPosition from './useSetHintPosition';
import legendDirections from './legendDirections';
import Legend from './Legend';
import drawLoadingGrid from './drawLoadingGrid';
import ChartAxes from './ChartAxes';
import LoadingGrid from './LoadingGrid';
import './Chart.less';

const defaultExtractor = (data, selected, groupMapsTo, bottomMapsTo, leftMapsTo) => {
	const selectedSet = new Set(selected);
	const allSelected = selectedSet.size === 0;
	const bottomSet = new Set();
	const leftSet = new Set();
	const groupIndex = new Map();
	const pointList = [];
	for (const d of data) {
		const group = d[groupMapsTo];
		if (!groupIndex.has(group)) {
			groupIndex.set(group, groupIndex.size);
		}
		if (allSelected || selectedSet.has(group)) {
			const bottomValue = d[bottomMapsTo];
			const leftValue = d[leftMapsTo];
			bottomSet.add(bottomValue);
			if (leftValue !== null) {
				leftSet.add(leftValue);
				pointList.push([group, bottomValue, leftValue, d]);
			}
		}
	}
	const bottomList = Array.from(bottomSet);
	const leftList = Array.from(leftSet);
	return {groupIndex, leftList, bottomList, pointList};
};

const defaultHint = (_, node) => node;

const ScatterChart = ({
	id,
	className,
	data,
	dataOptions,
	color,
	bottomAxis,
	leftAxis,
	points,
	legend,
	hint,
	getStrokeClass = getDefaultClass,
	getFillClass = getDefaultClass,
	getBgClass = getDefaultClass,
	onClick,
	onLegendClick,
	onSelectionChange,
	...props
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
	const {domain: bottomDomain, scaleType: bottomScaleType, title: bottomTitle} = {scaleType: 'labels', ...bottomAxis};
	const bottomMapsTo = bottomAxis?.mapsTo || scaleProperties[bottomScaleType];
	const {formatter: bottomTickFormatter} = {formatter: tickFormatters[bottomScaleType], ...bottomAxis?.ticks};
	const {domain: leftDomain, scaleType: leftScaleType, title: leftTitle} = {scaleType: 'linear', ...leftAxis};
	const leftMapsTo = leftAxis?.mapsTo || scaleProperties[leftScaleType];
	const {formatter: leftTickFormatter} = {formatter: tickFormatters[leftScaleType], ...leftAxis?.ticks};
	const {
		enabled: pointsEnabled,
		fillOpacity: pointsFillOpacity,
		filled: pointsFilled,
		radius: pointsRadius,
	} = {enabled: true, fillOpacity: 0.3, filled: true, radius: 4, ...points};
	const {
		alignment: legendAlignment,
		clickable: legendClickable,
		enabled: legendEnabled,
		order: legendOrder,
		position: legendPosition,
	} = {alignment: 'start', clickable: true, enabled: true, position: 'bottom', ...legend};
	const {
		custom: hintCustom,
		enabled: hintEnabled,
		groupLabel: hintGroupLabel,
		headerFormatter: hintHeaderFormatter,
		valueFormatter: hintValueFormatter,
	} = {
		custom: defaultHint,
		enabled: true,
		groupLabel: `Group`, // TODO translate
		headerFormatter: hintFormatters[bottomScaleType],
		valueFormatter: hintFormatters[leftScaleType],
		...hint,
	};

	const gradientId = `${id}-loading`;
	const state = useMemo(() => {
		if (dataLoading) {
			return {groupIndex: new Map()};
		}
		const {groupIndex, leftList, bottomList, pointList} = defaultExtractor(
			data,
			dataSelectedGroups,
			dataGroupMapsTo,
			bottomMapsTo,
			leftMapsTo
		);
		return {
			groupIndex,
			pointList,
			leftDomain: getDomain(leftDomain, leftScaleType, leftList),
			bottomDomain: getDomain(bottomDomain, bottomScaleType, bottomList),
		};
	}, [
		bottomDomain,
		bottomMapsTo,
		bottomScaleType,
		data,
		dataGroupMapsTo,
		dataLoading,
		dataSelectedGroups,
		leftDomain,
		leftMapsTo,
		leftScaleType,
	]);

	const ref = useRef(null);
	const drawRef = useRef(null);
	const hintRef = useRef(null);
	const [hintData, setHintData] = useState({});
	useLayoutEffect(() => {
		const {groupIndex, pointList, leftDomain, bottomDomain} = state;
		const colorVariant = getColorVariant(colorGroupCount, groupIndex.size);
		const bottomTickFormatterFn = bottomTickFormatter || identity;

		const draw = (drawRef.current = ({width, height}) => {
			const svg = ref.current;

			if (dataLoading) {
				drawLoadingGrid(svg, width, height);
				return;
			}

			const nodes = svg.childNodes;
			const axes = nodes[1];

			const plotBottom = getPlotBottom(height, bottomTitle);
			const leftScale = createScale(leftScaleType, leftDomain, [plotBottom, 0], 0.25);
			const leftTickCount = height / 80;
			const leftTicks = getTicks(leftScale, leftTickCount);
			const plotLeft = drawLeftAxis(
				axes.firstChild,
				leftScale,
				leftTitle,
				leftTickCount,
				leftTicks,
				leftTickFormatter,
				plotBottom
			);

			const bottomScale = createScale(bottomScaleType, bottomDomain, [plotLeft, width], 0.25);
			const bottomTickCount = width / 80;
			const bottomTicks = getTicks(bottomScale, bottomTickCount);
			drawBottomAxis(
				axes.lastChild,
				bottomScale,
				bottomTitle,
				bottomTickCount,
				bottomTicks,
				bottomTickFormatter,
				width,
				height,
				plotBottom,
				plotLeft
			);

			drawGrid(nodes[0], leftTicks, leftScale, bottomTicks, bottomScale, width, plotLeft, plotBottom);

			const needsZero = leftScaleType === 'linear' && leftDomain[0] < 0;
			const zero = needsZero ? leftScale(0) : 0;
			select(nodes[3])
				.selectAll('line')
				.data(needsZero ? [1] : [])
				.join('line')
				.attr('x1', plotLeft)
				.attr('x2', width)
				.attr('y1', zero)
				.attr('y2', zero);

			if (pointsEnabled) {
				const modifier = pointsFilled ? 'filled' : 'hollow';
				const point = select(nodes[2])
					.selectAll('circle')
					.data(pointList)
					.join('circle')
					.attr('class', (d) => {
						const [group, key, value] = d;
						const index = groupIndex.get(group);
						const strokeClass = getStrokeClass(
							group,
							key,
							value,
							getColorClass('stroke', colorVariant, colorOption, index)
						);
						const fillClass = getFillClass(group, key, value, getColorClass('fill', colorVariant, colorOption, index));
						return `${modifier} ${strokeClass} ${fillClass}`;
					})
					.attr('fill-opacity', pointsFillOpacity)
					.attr('r', pointsRadius)
					.attr('cx', (d) => bottomScale(d[1]))
					.attr('cy', (d) => leftScale(d[2]))
					.attr('role', 'graphics-symbol')
					.attr('aria-roledescription', `point`) // TODO translate
					.attr('aria-label', (d) => `${dataGroupFormatter(d[0]) || ''}, ${bottomTickFormatterFn(d[1])}, ${d[2]}`);

				if (onClick) {
					point.on('click', (_, d) => onClick(d[3]));
				} else {
					point.on('click', null);
				}

				if (hintEnabled) {
					point
						.on('mousemove', (event, [group, bottomValue, leftValue, data]) => {
							event.target.setAttribute('fill-opacity', 1);
							setHintData({
								visible: true,
								x: event.clientX,
								y: event.clientY,
								content: hintCustom(
									[data],
									<SingleHint
										bottomTitle={bottomTitle}
										bottomValue={bottomValue}
										bottomFormatter={hintHeaderFormatter}
										leftTitle={leftTitle}
										leftValue={leftValue}
										leftFormatter={hintValueFormatter}
										groupLabel={hintGroupLabel}
										group={group}
										groupFormatter={dataGroupFormatter}
										groupIndex={groupIndex}
										variant={colorVariant}
										option={colorOption}
										getBgClass={getBgClass}
									/>
								),
							});
						})
						.on('mouseleave', (event) => {
							event.target.setAttribute('fill-opacity', pointsFillOpacity);
							setHintData((hintData) => ({...hintData, visible: false}));
						});
				} else {
					point.on('mousemove', null).on('mouseleave', null);
				}
			} else {
				nodes[2].replaceChildren();
			}
		});
		draw(ref.current.getBoundingClientRect());
	}, [
		bottomScaleType,
		bottomTickFormatter,
		bottomTitle,
		colorGroupCount,
		colorOption,
		dataGroupFormatter,
		dataLoading,
		getBgClass,
		getFillClass,
		getStrokeClass,
		hintCustom,
		hintEnabled,
		hintGroupLabel,
		hintHeaderFormatter,
		hintValueFormatter,
		leftScaleType,
		leftTickFormatter,
		leftTitle,
		onClick,
		pointsEnabled,
		pointsFillOpacity,
		pointsFilled,
		pointsRadius,
		state,
	]);
	useEffect(() => addResizeObserver(ref.current, (r) => drawRef.current(r)), []);

	useSetHintPosition(hintData, hintRef, ref);

	return (
		<div {...props} id={id} className={`Chart Chart__wrapper${className ? ` ${className}` : ''}`}>
			{useMemo(
				() => (
					<svg className="Chart__chart" data-chromatic="ignore" ref={ref}>
						<g className="Chart__grid">
							<rect />
							<g />
							<g />
						</g>
						<ChartAxes />
						<g className="Chart__dots" role="group" aria-label={/* TODO translate */ `data`} />
						<g className="Chart__zero" />
						{dataLoading && <LoadingGrid gradientId={gradientId} />}
					</svg>
				),
				[dataLoading, gradientId]
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

ScatterChart.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	data: PropTypes.any,
	dataOptions: dataPropType,
	color: colorPropType,
	bottomAxis: axisPropType,
	leftAxis: axisPropType,
	points: pointsPropType,
	legend: legendPropType,
	hint: hintPropType,
	getStrokeClass: PropTypes.func,
	getFillClass: PropTypes.func,
	getBgClass: PropTypes.func,
	onClick: PropTypes.func,
	onLegendClick: PropTypes.func,
	onSelectionChange: PropTypes.func,
};

export default ScatterChart;
