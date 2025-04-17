import {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {select} from 'd3-selection';
import identity from 'lodash-es/identity';
import {addResizeObserver, Layer, useRandomId} from '@bluecateng/pelagos';

import {axisPropType, colorPropType, dataPropType, hintPropType, legendPropType} from './ChartPropTypes';
import getDefaultClass from './getDefaultClass';
import extendDomain from './extendDomain';
import getColorClass from './getColorClass';
import getColorVariant from './getColorVariant';
import getPlotBottom from './getPlotBottom';
import createScale from './createScale';
import getTicks from './getTicks';
import drawLeftAxis from './drawLeftAxis';
import drawBottomAxis from './drawBottomAxis';
import drawGrid from './drawGrid';
import hintFormatters from './hintFormatters';
import scaleProperties from './scaleProperties';
import tickFormatters from './tickFormatters';
import useSetHintPosition from './useSetHintPosition';
import legendDirections from './legendDirections';
import Legend from './Legend';
import drawLoadingGrid from './drawLoadingGrid';
import ChartAxes from './ChartAxes';
import LoadingGrid from './LoadingGrid';
import './Chart.less';

const {max, min} = Math;

const minBarWidth = 48;

const defaultHint = (_, node) => node;

const SimpleBarChart = ({
	id,
	className,
	data,
	dataOptions,
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
		domain: bottomDomain,
		extendLinearDomainBy: bottomExtendLinearDomainBy,
		scaleType: bottomScaleType,
		title: bottomTitle,
	} = {scaleType: 'labels', ...bottomAxis};
	const bottomMapsTo = bottomAxis?.mapsTo || scaleProperties[bottomScaleType];
	const {formatter: bottomTickFormatter} = {formatter: tickFormatters[bottomScaleType], ...bottomAxis?.ticks};
	const {
		domain: leftDomain,
		extendLinearDomainBy: leftExtendLinearDomainBy,
		scaleType: leftScaleType,
		title: leftTitle,
	} = {scaleType: 'linear', ...leftAxis};
	const leftMapsTo = leftAxis?.mapsTo || scaleProperties[leftScaleType];
	const {formatter: leftTickFormatter} = {formatter: tickFormatters[leftScaleType], ...leftAxis?.ticks};
	const vertical = bottomScaleType === 'labels';
	const {
		alignment: legendAlignment,
		clickable: legendClickable,
		enabled: legendEnabled,
		order: legendOrder,
		position: legendPosition,
	} = {alignment: 'start', clickable: true, enabled: false, position: 'bottom', ...legend};
	const {
		custom: hintCustom,
		enabled: hintEnabled,
		headerFormatter: hintHeaderFormatter,
		valueFormatter: hintValueFormatter,
	} = {
		custom: defaultHint,
		enabled: true,
		headerFormatter: hintFormatters[vertical ? bottomScaleType : leftScaleType],
		valueFormatter: hintFormatters[vertical ? leftScaleType : bottomScaleType],
		...hint,
	};

	const gradientId = `${id}-loading`;
	const state = useMemo(() => {
		if (dataLoading) {
			return {groupIndex: new Map()};
		}
		const labelMapsTo = vertical ? bottomMapsTo : leftMapsTo;
		const valueMapsTo = vertical ? leftMapsTo : bottomMapsTo;
		const extendLinearDomainBy = vertical ? leftExtendLinearDomainBy : bottomExtendLinearDomainBy;
		const selectedSet = new Set(dataSelectedGroups);
		const allSelected = selectedSet.size === 0;
		const selectedData = [];
		const markerData = [];
		const groupIndex = new Map();
		const labelSet = new Set();
		let min = 0;
		let max = 0;
		for (const d of data) {
			const group = d[dataGroupMapsTo];
			if (!groupIndex.has(group)) {
				groupIndex.set(group, groupIndex.size);
			}
			if (allSelected || selectedSet.has(group)) {
				const label = d[labelMapsTo];
				const value = d[valueMapsTo];
				selectedData.push([group, label, value, d]);
				labelSet.add(label);
				if (value < min) min = value;
				if (value > max) max = value;
				if (extendLinearDomainBy) {
					const marker = d[extendLinearDomainBy];
					markerData.push(marker);
					if (marker > max) max = marker;
				}
			}
		}
		const valueDomain = extendDomain([min, max]);
		return {
			selectedData,
			markerData,
			groupIndex,
			leftDomain: leftDomain || (vertical ? valueDomain : labelSet),
			bottomDomain: bottomDomain || (vertical ? labelSet : valueDomain),
		};
	}, [
		bottomDomain,
		bottomExtendLinearDomainBy,
		bottomMapsTo,
		data,
		dataGroupMapsTo,
		dataLoading,
		dataSelectedGroups,
		leftDomain,
		leftExtendLinearDomainBy,
		leftMapsTo,
		vertical,
	]);
	const ref = useRef(null);
	const drawRef = useRef(null);
	const hintRef = useRef(null);
	const [hintData, setHintData] = useState({});
	useLayoutEffect(() => {
		const {selectedData, markerData, groupIndex, leftDomain, bottomDomain} = state;
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

			const zero = (vertical ? leftScale : bottomScale)(0);
			if (vertical) {
				const needsZero = leftScaleType === 'linear' && leftDomain[0] < 0;
				select(nodes[4])
					.selectAll('line')
					.data(needsZero ? [1] : [])
					.join('line')
					.attr('x1', plotLeft)
					.attr('x2', width)
					.attr('y1', zero)
					.attr('y2', zero);
			} else {
				const needsZero = bottomScaleType === 'linear' && bottomDomain[0] < 0;
				select(nodes[4])
					.selectAll('line')
					.data(needsZero ? [1] : [])
					.join('line')
					.attr('x1', zero)
					.attr('x2', zero)
					.attr('y1', 0)
					.attr('y2', plotBottom);
			}

			const barWidth = min(minBarWidth, (vertical ? bottomScale : leftScale).step() / 2);
			const offset = barWidth / 2;
			const buildPath = vertical
				? (d) => {
						const [, d1, d2] = d;
						const x = bottomScale(d1) - offset;
						const size = d2 === 0 ? 0 : d2 > 0 ? min(-2, leftScale(d2) - zero) : max(2, leftScale(d2) - zero);
						return `m${x},${zero}h${barWidth}v${size}h${-barWidth}z`;
					}
				: (d) => {
						const [, d1, d2] = d;
						const y = leftScale(d1) - offset;
						const size = d2 === 0 ? 0 : d2 < 0 ? min(-2, bottomScale(d2) - zero) : max(2, bottomScale(d2) - zero);
						return `m${zero},${y}v${barWidth}h${size}v${-barWidth}z`;
					};
			const bar = select(nodes[2])
				.selectAll('path')
				.data(selectedData)
				.join('path')
				.attr('class', (d) =>
					getFillClass(d[0], d[1], d[2], getColorClass('fill', colorVariant, colorOption, groupIndex.get(d[0])))
				)
				.attr('d', buildPath)
				.attr('role', 'graphics-symbol')
				.attr('aria-roledescription', `bar`) // TODO translate
				.attr('aria-label', (d) => `${dataGroupFormatter(d[0]) || ''}, ${bottomTickFormatterFn(d[1])}, ${d[2]}`);

			const markerWidth = barWidth * 1.25;
			const markerOffset = markerWidth / 2;
			select(nodes[3])
				.selectAll('path')
				.data(markerData)
				.join('path')
				.attr(
					'd',
					vertical
						? (d, i) => {
								const x = bottomScale(selectedData[i][1]) - markerOffset;
								const y = leftScale(d);
								return `m${x},${y}h${markerWidth}`;
							}
						: (d, i) => {
								const x = bottomScale(d);
								const y = leftScale(selectedData[i][1]) - markerOffset;
								return `m${x},${y}v${markerWidth}`;
							}
				);

			if (hintEnabled) {
				bar
					.on('mousemove', (event, [, label, value, data]) =>
						setHintData({
							visible: true,
							x: event.clientX,
							y: event.clientY,
							content: hintCustom(
								data,
								<Layer className="Chart__simpleHint">
									<span>{hintHeaderFormatter(label)}</span>
									<span>{hintValueFormatter(value)}</span>
								</Layer>
							),
						})
					)
					.on('mouseleave', () => setHintData((hintData) => ({...hintData, visible: false})));
			} else {
				bar.on('mousemove', null).on('mouseleave', null);
			}
			if (onClick) {
				bar.on('click', (_, d) => onClick(d[1]));
			} else {
				bar.on('click', null);
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
		getFillClass,
		hintCustom,
		hintEnabled,
		hintHeaderFormatter,
		hintValueFormatter,
		leftScaleType,
		leftTickFormatter,
		leftTitle,
		onClick,
		state,
		vertical,
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
						<g className="Chart__bars" role="group" aria-label={/* TODO translate */ `data`} />
						<g className="Chart__markers" />
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

SimpleBarChart.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	data: PropTypes.any,
	dataOptions: dataPropType,
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

export default SimpleBarChart;
