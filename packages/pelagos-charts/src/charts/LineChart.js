import {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {scaleQuantize} from 'd3-scale';
import {select} from 'd3-selection';
import {curveLinear, curveMonotoneX, curveNatural, curveStep, line} from 'd3-shape';
import identity from 'lodash-es/identity';
import {addResizeObserver} from '@bluecateng/pelagos';
import 'core-js/actual/iterator/map';

import {
	axisPropType,
	colorPropType,
	dataPropType,
	hintPropType,
	pointsPropType,
	legendPropType,
} from './ChartPropTypes';
import {getDefaultClass, getGroup} from './Getters';
import extractLineDataFromTidy from './extractLineDataFromTidy';
import extractLineDataFromColumns from './extractLineDataFromColumns';
import getDomain from './getDomain';
import getColorClass from './getColorClass';
import getColorVariant from './getColorVariant';
import createScale from './createScale';
import MultiHint from './MultiHint';
import getPlotBottom from './getPlotBottom';
import getTicks from './getTicks';
import drawLeftAxis from './drawLeftAxis';
import drawBottomAxis from './drawBottomAxis';
import drawGrid from './drawGrid';
import mappers from './mappers';
import tickFormatters from './tickFormatters';
import hintFormatters from './hintFormatters';
import updateHint from './updateHint';
import legendDirections from './legendDirections';
import Legend from './Legend';
import useRandomId from './useRandomId';
import drawLoadingGrid from './drawLoadingGrid';
import ChartAxes from './ChartAxes';
import LoadingGrid from './LoadingGrid';
import './Chart.less';

const curves = {
	linear: curveLinear,
	monotone: curveMonotoneX,
	natural: curveNatural,
	step: curveStep,
};

const dataExtractors = {tidy: extractLineDataFromTidy, columns: extractLineDataFromColumns, native: identity};

const hideHint = (hintData) => ({...hintData, visible: false});

const renderSelection = (startX, endX, startKey, endKey, plotBottom, setHintData, formatter) => {
	const width = Math.abs(startX - endX);
	const forward = startX < endX;
	setHintData({
		visible: true,
		style: {left: Math.min(startX, endX), top: 0},
		content: (
			<>
				<div className="Chart__selection" style={{left: 0, width, height: plotBottom}} />
				<div className="Chart__range" style={{left: width / 2}}>
					{`${formatter(forward ? startKey : endKey)} - ${formatter(forward ? endKey : startKey)}`}
				</div>
			</>
		),
	});
};

const buildMouseDrag = (dragState, bounds, setHintData) => (event) => {
	event.preventDefault();
	event.stopPropagation();
	const {hintHeaderFormatter, bottomScale, finder, plotBottom, startX, startKey} = dragState;
	const {left, right} = bounds;
	const [rangeStart, rangeEnd] = bottomScale.range();
	const list = finder.range();
	const mx = event.clientX;
	let endKey, endX;
	if (mx <= left + rangeStart) {
		endKey = list[0];
		endX = rangeStart;
	} else if (mx >= right) {
		endKey = list[list.length - 1];
		endX = rangeEnd;
	} else {
		endKey = finder(mx - left);
		endX = bottomScale(endKey);
	}
	dragState.endKey = endKey;
	dragState.endX = endX;
	renderSelection(startX, endX, startKey, endKey, plotBottom, setHintData, hintHeaderFormatter);
};

const buildMouseUp = (dragState, bounds, setHintData) => (event) => {
	event.preventDefault();
	event.stopPropagation();
	const {onClick, onDrag, bottomScale, handleMouseDrag, handleMouseUp, startX, endX, startKey, endKey} = dragState;
	const {left, right, top, bottom} = bounds;
	const chartLeft = left + bottomScale.range()[0];
	document.removeEventListener('mousemove', handleMouseDrag, true);
	document.removeEventListener('mouseup', handleMouseUp, true);

	dragState.dragging = false;
	setHintData(hideHint);

	const mx = event.clientX;
	const my = event.clientY;
	if (mx >= chartLeft - 20 && mx <= right + 20 && my >= top && my <= bottom) {
		if (startKey === endKey) {
			onClick?.(startKey);
		} else {
			const forward = startX < endX;
			onDrag?.(forward ? startKey : endKey, forward ? endKey : startKey);
		}
	}
};

const LineChart = ({
	id,
	className,
	data,
	curve,
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
	onDrag,
	onLegendClick,
	onSelectionChange,
	...props
}) => {
	id = useRandomId(id);

	const {
		format: dataFormat,
		groupFormatter: dataGroupFormatter,
		groupMapper: dataGroupMapper,
		loading: dataLoading,
		selectedGroups: dataSelectedGroups,
	} = {
		format: 'tidy',
		groupFormatter: identity,
		groupMapper: getGroup,
		loading: false,
		...dataOptions,
	};
	const dataExtract = dataExtractors[dataFormat];
	const {groupCount: colorGroupCount, option: colorOption} = {groupCount: null, option: 1, ...color?.pairing};
	const {domain: bottomDomain, scaleType: bottomScaleType, title: bottomTitle} = {scaleType: 'labels', ...bottomAxis};
	const bottomMapper = bottomAxis?.mapper || mappers[bottomScaleType];
	const {formatter: bottomTickFormatter} = {formatter: tickFormatters[bottomScaleType], ...bottomAxis?.ticks};
	const {domain: leftDomain, scaleType: leftScaleType, title: leftTitle} = {scaleType: 'linear', ...leftAxis};
	const leftMapper = leftAxis?.mapper || mappers[leftScaleType];
	const {formatter: leftTickFormatter} = {formatter: tickFormatters[leftScaleType], ...leftAxis?.ticks};
	const {
		enabled: pointsEnabled,
		filled: pointsFilled,
		radius: pointsRadius,
	} = {enabled: true, filled: false, radius: 3, ...points};
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
		headerFormatter: hintFormatters[bottomScaleType],
		showTotal: true,
		title: bottomTitle || 'x',
		totalLabel: `Total`, // TODO translate
		valueFormatter: hintFormatters[leftScaleType],
		...hint,
	};

	const gradientId = `${id}-loading`;
	const state = useMemo(() => {
		if (dataLoading) {
			return {groupIndex: new Map()};
		}
		const {groups, groupIndex, hintValues, leftList, bottomList, pointList} = dataExtract(
			data,
			dataSelectedGroups,
			dataGroupMapper,
			bottomMapper,
			leftMapper
		);
		return {
			groups,
			groupIndex,
			hintValues,
			pointList,
			bottomList,
			leftDomain: getDomain(leftDomain, leftScaleType, leftList),
			bottomDomain: getDomain(bottomDomain, bottomScaleType, bottomList),
		};
	}, [
		bottomDomain,
		bottomMapper,
		bottomScaleType,
		data,
		dataExtract,
		dataGroupMapper,
		dataLoading,
		dataSelectedGroups,
		leftDomain,
		leftMapper,
		leftScaleType,
	]);

	const ref = useRef(null);
	const drawRef = useRef(null);
	const hintRef = useRef(null);
	const [hintData, setHintData] = useState({});
	useLayoutEffect(() => {
		const {groups, groupIndex, hintValues, pointList, leftDomain, bottomDomain, bottomList} = state;
		const hasData = !!bottomList?.length;
		const colorVariant = getColorVariant(colorGroupCount, groupIndex.size);

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
			select(nodes[4])
				.selectAll('line')
				.data(needsZero ? [1] : [])
				.join('line')
				.attr('x1', plotLeft)
				.attr('x2', width)
				.attr('y1', zero)
				.attr('y2', zero);

			const ruler = nodes[5];
			ruler.setAttribute('y2', plotBottom);

			const grid = select(nodes[0]);
			if (hasData) {
				const finder = scaleQuantize().domain(bottomScale.range()).range(bottomList);
				const dragState = {hintHeaderFormatter, onClick, onDrag, bottomScale, finder, plotBottom};
				grid.on('mousedown', (event) => {
					if (event.button === 0) {
						event.preventDefault();
						const bounds = svg.getBoundingClientRect();
						dragState.handleMouseDrag = buildMouseDrag(dragState, bounds, setHintData);
						dragState.handleMouseUp = buildMouseUp(dragState, bounds, setHintData);
						document.addEventListener('mousemove', dragState.handleMouseDrag, true);
						document.addEventListener('mouseup', dragState.handleMouseUp, true);

						const key = finder(event.clientX - bounds.left);
						const x = bottomScale(key);
						dragState.dragging = true;
						dragState.startKey = dragState.endKey = key;
						dragState.startX = dragState.endX = x;

						ruler.style.opacity = 0;

						renderSelection(x, x, key, key, plotBottom, setHintData, hintHeaderFormatter);
					}
				});
				if (hintEnabled) {
					let currentKey, currentPosition, hint;
					grid
						.on('mousemove', (event) => {
							if (dragState.dragging) return;
							const {clientX, clientY} = event;
							const bounds = svg.parentNode.getBoundingClientRect();
							const chartX = clientX - bounds.left;
							const chartY = clientY - bounds.top;
							const key = finder(chartX);
							if (key !== currentKey) {
								currentKey = key;
								currentPosition = bottomScale(key);
								ruler.setAttribute('x1', currentPosition);
								ruler.setAttribute('x2', currentPosition);
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
								true,
								chartX,
								chartY,
								bounds.width,
								bounds.height,
								currentPosition,
								24,
								width,
								plotLeft,
								plotBottom,
								setHintData,
								hint,
								ruler
							);
						})
						.on('mouseleave', () => {
							if (dragState.dragging) return;
							currentKey = null;
							ruler.style.opacity = 0;
							setHintData(hideHint);
						});
				} else {
					grid.on('mousemove', null).on('mouseleave', null);
				}
			} else {
				grid.on('mousedown', null).on('mousemove', null).on('mouseleave', null);
			}

			if (hasData) {
				const bottomSetScaled = bottomList.map(bottomScale);
				const lineFn = line()
					.curve(curves[curve])
					.defined((d) => d !== null)
					.x((_, i) => bottomSetScaled[i])
					.y((d) => leftScale(d));
				select(nodes[2])
					.selectAll('path')
					.data(groups.entries())
					.join('path')
					.attr('class', ([group]) =>
						getStrokeClass(group, null, null, getColorClass('stroke', colorVariant, colorOption, groupIndex.get(group)))
					)
					.attr('d', ([, list]) => lineFn(list))
					.attr('role', 'graphics-symbol')
					.attr('aria-roledescription', `line`) // TODO translate
					.attr('aria-label', (d) => `${dataGroupFormatter(d[0])}, ${d[1].join(', ')}`);
			} else {
				nodes[2].replaceChildren();
			}
			if (pointsEnabled && hasData) {
				const modifier = pointsFilled ? 'filled' : 'hollow';
				select(nodes[3])
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
					.attr('r', pointsRadius)
					.attr('cx', (d) => bottomScale(d[1]))
					.attr('cy', (d) => leftScale(d[2]));
			} else {
				nodes[3].replaceChildren();
			}
		});
		draw(ref.current.getBoundingClientRect());
	}, [
		bottomScaleType,
		bottomTickFormatter,
		bottomTitle,
		colorGroupCount,
		colorOption,
		curve,
		dataGroupFormatter,
		dataLoading,
		getBgClass,
		getFillClass,
		getStrokeClass,
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
		onDrag,
		pointsEnabled,
		pointsFilled,
		pointsRadius,
		state,
	]);
	useEffect(() => addResizeObserver(ref.current, (r) => drawRef.current(r)), []);

	return (
		<div {...props} id={id} className={`Chart Chart__wrapper${className ? ` ${className}` : ''}`}>
			{useMemo(
				() => (
					<svg className="Chart__chart" ref={ref}>
						<g className="Chart__grid">
							<rect />
							<g />
							<g />
						</g>
						<ChartAxes />
						<g className="Chart__lines" role="group" aria-label={/* TODO translate */ `data`} />
						<g className="Chart__dots" pointerEvents="none" />
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

LineChart.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	data: PropTypes.any,
	curve: PropTypes.oneOf(['linear', 'monotone', 'natural', 'step']),
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
	onDrag: PropTypes.func,
	onLegendClick: PropTypes.func,
	onSelectionChange: PropTypes.func,
};

LineChart.defaultProps = {
	curve: 'monotone',
};

export default LineChart;
