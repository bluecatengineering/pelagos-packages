import {useLayoutEffect} from 'react';

export default (hintData, hintRef, chartRef) =>
	useLayoutEffect(() => {
		if (hintData.visible) {
			const {x, y} = hintData;
			const hint = hintRef.current;
			const {width, height} = hint.getBoundingClientRect();
			const {left: chartLeft, top: chartTop, width: chartWidth} = chartRef.current.parentNode.getBoundingClientRect();
			const chartX = x - chartLeft;
			const chartY = y - chartTop;
			hint.style.left = `${chartX < chartWidth / 2 ? chartX + 10 : chartX - width - 8}px`;
			hint.style.top = `${chartY - height / 2}px`;
		}
	}, [chartRef, hintData, hintRef]);
