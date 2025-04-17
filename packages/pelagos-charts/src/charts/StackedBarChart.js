import {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {scaleQuantize} from 'd3-scale';
import {select} from 'd3-selection';
import {
	stack as d3Stack,
	stackOffsetDiverging,
	stackOffsetExpand,
	stackOffsetNone,
	stackOffsetSilhouette,
	stackOffsetWiggle,
	stackOrderAppearance,
	stackOrderAscending,
	stackOrderDescending,
	stackOrderInsideOut,
	stackOrderNone,
	stackOrderReverse,
} from 'd3-shape';
import identity from 'lodash-es/identity';
import {addResizeObserver, useRandomId} from '@bluecateng/pelagos';
import 'core-js/actual/array/to-reversed';

import {axisPropType, colorPropType, dataPropType, hintPropType, legendPropType} from './ChartPropTypes';
import getDefaultClass from './getDefaultClass';
import extractStackDataFromTidy from './extractStackDataFromTidy';
import extractStackDataFromColumns from './extractStackDataFromColumns';
import scaleProperties from './scaleProperties';
import tickFormatters from './tickFormatters';
import hintFormatters from './hintFormatters';
import extendDomain from './extendDomain';
import getPlotBottom from './getPlotBottom';
import createScale from './createScale';
import getTicks from './getTicks';
import drawLeftAxis from './drawLeftAxis';
import drawBottomAxis from './drawBottomAxis';
import drawGrid from './drawGrid';
import getColorVariant from './getColorVariant';
import getColorClass from './getColorClass';
import MultiHint from './MultiHint';
import updateHint from './updateHint';
import legendDirections from './legendDirections';
import Legend from './Legend';
import drawLoadingGrid from './drawLoadingGrid';
import ChartAxes from './ChartAxes';
import LoadingGrid from './LoadingGrid';
import './Chart.less';

const {min} = Math;

const minBarWidth = 48;

const stackOrders = {
	appearance: stackOrderAppearance,
	ascending: stackOrderAscending,
	descending: stackOrderDescending,
	insideOut: stackOrderInsideOut,
	none: stackOrderNone,
	reverse: stackOrderReverse,
};

const stackOffsets = {
	expand: stackOffsetExpand,
	diverging: stackOffsetDiverging,
	none: stackOffsetNone,
	silhouette: stackOffsetSilhouette,
	wiggle: stackOffsetWiggle,
};

const dataExtractors = {tidy: extractStackDataFromTidy, columns: extractStackDataFromColumns, native: identity};

const seriesExtent = (series) => {
	let min = 0;
	let max = 0;
	for (const list of series) {
		for (const [a, b] of list) {
			if (a < min) min = a;
			if (b > max) max = b;
		}
	}
	return extendDomain([min, max]);
};

const StackedBarChart = ({
	id,
	className,
	data,
	dataOptions,
	stack,
	color,
	bottomAxis,
	leftAxis,
	legend,
	hint,
	getFillClass = getDefaultClass,
	getBgClass = getDefaultClass,
	onClick,
	onLegendClick,
	onSelectionChange,
	...props
}) => {
	id = useRandomId(id);

	const {
		format: dataFormat,
		groupFormatter: dataGroupFormatter,
		groupMapsTo: dataGroupMapsTo,
		loading: dataLoading,
		selectedGroups: dataSelectedGroups,
	} = {
		format: 'tidy',
		groupFormatter: identity,
		groupMapsTo: 'group',
		loading: false,
		...dataOptions,
	};
	const dataExtract = dataExtractors[dataFormat];
	const {order: stackOrder, offset: stackOffset} = {order: 'none', offset: 'none', ...stack};
	const {groupCount: colorGroupCount, option: colorOption} = {groupCount: null, option: 1, ...color?.pairing};
	const {domain: bottomDomain, scaleType: bottomScaleType, title: bottomTitle} = {scaleType: 'labels', ...bottomAxis};
	const bottomMapsTo = bottomAxis?.mapsTo || scaleProperties[bottomScaleType];
	const {formatter: bottomTickFormatter} = {formatter: tickFormatters[bottomScaleType], ...bottomAxis?.ticks};
	const {domain: leftDomain, scaleType: leftScaleType, title: leftTitle} = {scaleType: 'linear', ...leftAxis};
	const leftMapsTo = leftAxis?.mapsTo || scaleProperties[leftScaleType];
	const {formatter: leftTickFormatter} = {formatter: tickFormatters[leftScaleType], ...leftAxis?.ticks};
	const vertical = bottomScaleType === 'labels';
	const {
		alignment: legendAlignment,
		clickable: legendClickable,
		enabled: legendEnabled,
		order: legendOrder,
		position: legendPosition,
	} = {alignment: 'start', clickable: true, enabled: true, position: 'bottom', ...legend};
	const {
		enabled: hintEnabled,
		headerFormatter: hintHeaderFormatter,
		showTotal: hintShowTotal,
		title: hintTitle,
		totalLabel: hintTotalLabel,
		valueFormatter: hintValueFormatter,
	} = {
		enabled: true,
		headerFormatter: hintFormatters[vertical ? bottomScaleType : leftScaleType],
		showTotal: true,
		title: vertical ? bottomTitle || 'x' : leftTitle || 'y',
		totalLabel: `Total`, // TODO translate
		valueFormatter: hintFormatters[vertical ? leftScaleType : bottomScaleType],
		...hint,
	};

	const gradientId = `${id}-loading`;
	const state = useMemo(() => {
		if (dataLoading) {
			return {groupIndex: new Map()};
		}
		const {stackData, groupSet, groupIndex, hintValues, labelSet} = dataExtract(
			data,
			dataSelectedGroups,
			dataGroupMapsTo,
			vertical ? bottomMapsTo : leftMapsTo,
			vertical ? leftMapsTo : bottomMapsTo
		);
		const series = d3Stack()
			.keys(groupSet)
			.value(([, group], key) => group.get(key) ?? 0)
			.order(stackOrders[stackOrder])
			.offset(stackOffsets[stackOffset])(stackData);
		return {
			series,
			groupIndex,
			hintValues,
			labelSet,
			leftDomain: leftDomain || (vertical ? seriesExtent(series) : labelSet),
			bottomDomain: bottomDomain || (vertical ? labelSet : seriesExtent(series)),
		};
	}, [
		bottomDomain,
		bottomMapsTo,
		data,
		dataExtract,
		dataGroupMapsTo,
		dataLoading,
		dataSelectedGroups,
		leftDomain,
		leftMapsTo,
		stackOffset,
		stackOrder,
		vertical,
	]);

	const ref = useRef(null);
	const drawRef = useRef(null);
	const hintRef = useRef(null);
	const [hintData, setHintData] = useState({});
	useLayoutEffect(() => {
		const {series, groupIndex, hintValues, labelSet, leftDomain, bottomDomain} = state;
		const hasData = !!series?.length;
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
			const leftScale = createScale(leftScaleType, leftDomain, [plotBottom, 0], 0.5);
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

			const bottomScale = createScale(bottomScaleType, bottomDomain, [plotLeft, width], 0.5);
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

			if (vertical) {
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
			} else {
				const needsZero = bottomScaleType === 'linear' && bottomDomain[0] < 0;
				const zero = needsZero ? bottomScale(0) : 0;
				select(nodes[3])
					.selectAll('line')
					.data(needsZero ? [1] : [])
					.join('line')
					.attr('x1', zero)
					.attr('x2', zero)
					.attr('y1', 0)
					.attr('y2', plotBottom);
			}

			const ruler = nodes[4];
			if (vertical) {
				ruler.setAttribute('y2', plotBottom);
			} else {
				ruler.setAttribute('x1', plotLeft);
				ruler.setAttribute('x2', width);
			}

			const barWidth = min(minBarWidth, (vertical ? bottomScale : leftScale).step() / 2);
			const offset = barWidth / 2;
			const buildPath = vertical
				? (d) => {
						const [d0, d1] = d;
						const x = bottomScale(d.data[0]) - offset;
						const y0 = leftScale(d0);
						const y1 = leftScale(d1);
						return `m${x},${y1}h${barWidth}v${y0 - y1}h${-barWidth}z`;
					}
				: (d) => {
						const [d0, d1] = d;
						const y = leftScale(d.data[0]) - offset;
						const x0 = bottomScale(d0);
						const x1 = bottomScale(d1);
						return `m${x1},${y}v${barWidth}h${x0 - x1}v${-barWidth}z`;
					};
			select(nodes[2])
				.selectAll('g')
				.data(series)
				.join('g')
				.attr('class', (d) =>
					getFillClass(d.key, null, null, getColorClass('fill', colorVariant, colorOption, groupIndex.get(d.key)))
				)
				.selectAll('path')
				.data((D) => D.filter((d) => d.data[1].has(D.key)).map((d) => ((d.group = D.key), d)))
				.join('path')
				.attr('d', buildPath)
				.attr('role', 'graphics-symbol')
				.attr('aria-roledescription', `bar`) // TODO translate
				.attr('aria-label', (d) => {
					const {
						group,
						data: [key, map],
					} = d;
					return `${dataGroupFormatter(group)}, ${bottomTickFormatterFn(key)}, ${map.get(group)}`;
				});

			const grid = select(nodes[0]);
			if (hasData) {
				const quantize = vertical
					? scaleQuantize().domain(bottomScale.range()).range(labelSet)
					: scaleQuantize().domain(leftScale.range().toReversed()).range(Array.from(labelSet).reverse());
				if (onClick) {
					grid.on('click', (event) => {
						const {clientX, clientY} = event;
						const bounds = svg.getBoundingClientRect();
						const chartX = clientX - bounds.left;
						const chartY = clientY - bounds.top;
						const key = quantize(vertical ? chartX : chartY);
						onClick(key);
					});
				} else {
					grid.on('click', null);
				}
				if (hintEnabled) {
					let currentKey, currentPosition, hint;
					grid
						.on('mousemove', (event) => {
							const {clientX, clientY} = event;
							const bounds = svg.parentNode.getBoundingClientRect();
							const chartX = clientX - bounds.left;
							const chartY = clientY - bounds.top;
							const key = quantize(vertical ? chartX : chartY);
							if (key !== currentKey) {
								currentKey = key;
								if (vertical) {
									currentPosition = bottomScale(key);
									ruler.setAttribute('x1', currentPosition);
									ruler.setAttribute('x2', currentPosition);
								} else {
									currentPosition = leftScale(key);
									ruler.setAttribute('y1', currentPosition);
									ruler.setAttribute('y2', currentPosition);
								}
								hint = (
									<MultiHint
										title={hintTitle}
										headerValue={key}
										values={hintValues.get(key)}
										groupIndex={groupIndex}
										showTotal={hintShowTotal}
										totalLabel={hintTotalLabel}
										headerFormatter={hintHeaderFormatter}
										groupFormatter={dataGroupFormatter}
										valueFormatter={hintValueFormatter}
										getBgClass={getBgClass}
										variant={colorVariant}
										option={colorOption}
									/>
								);
							}
							updateHint(
								vertical,
								chartX,
								chartY,
								bounds.width,
								bounds.height,
								currentPosition,
								offset,
								width,
								plotLeft,
								plotBottom,
								setHintData,
								hint,
								ruler
							);
						})
						.on('mouseleave', () => {
							currentKey = null;
							ruler.style.opacity = 0;
							setHintData((hintData) => ({...hintData, visible: false}));
						});
				} else {
					grid.on('mousemove', null).on('mouseleave', null);
				}
			} else {
				grid.on('click', null).on('mousemove', null).on('mouseleave', null);
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
		hintEnabled,
		hintHeaderFormatter,
		hintShowTotal,
		hintTitle,
		hintTotalLabel,
		hintValueFormatter,
		leftScaleType,
		leftTickFormatter,
		leftTitle,
		onClick,
		state,
		vertical,
	]);
	useEffect(() => addResizeObserver(ref.current, (r) => drawRef.current(r)), []);

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
						<g className="Chart__stackBars" role="group" aria-label={/* TODO translate */ `data`} />
						<g className="Chart__zero" />
						<line className="Chart__ruler" />
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
			<div className={`Chart__hintContainer${hintData.visible ? ' visible' : ''}`} style={hintData.style} ref={hintRef}>
				{hintData.content}
			</div>
		</div>
	);
};

StackedBarChart.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	data: PropTypes.any,
	dataOptions: dataPropType,
	stack: PropTypes.shape({
		order: PropTypes.oneOf(['appearance', 'ascending', 'descending', 'insideOut', 'none', 'reverse']),
		offset: PropTypes.oneOf(['expand', 'diverging', 'none', 'silhouette', 'wiggle']),
	}),
	color: colorPropType,
	bottomAxis: axisPropType,
	leftAxis: axisPropType,
	legend: legendPropType,
	hint: hintPropType,
	getFillClass: PropTypes.func,
	getBgClass: PropTypes.func,
	onClick: PropTypes.func,
	onLegendClick: PropTypes.func,
	onSelectionChange: PropTypes.func,
};

export default StackedBarChart;
