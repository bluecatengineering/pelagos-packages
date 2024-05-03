const {abs} = Math;

export default (
	vertical,
	chartX,
	chartY,
	chartWidth,
	chartHeight,
	currentPosition,
	offset,
	width,
	plotLeft,
	plotBottom,
	setHintData,
	hint,
	ruler
) => {
	if (abs(vertical ? chartX - currentPosition : chartY - currentPosition) <= offset) {
		let left, right, top, bottom;
		if (chartX < (width - plotLeft) / 2) {
			left = chartX + 10;
		} else {
			right = chartWidth - chartX + 8;
		}
		if (chartY < plotBottom / 2) {
			top = chartY - 12;
		} else {
			bottom = chartHeight - chartY - 12;
		}
		setHintData({visible: true, style: {left, right, top, bottom}, content: hint});
		ruler.style.opacity = 1;
	} else {
		setHintData((hintData) => ({...hintData, visible: false}));
		ruler.style.opacity = 0;
	}
};
