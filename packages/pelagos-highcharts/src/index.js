export const buildColorSetClass = (className, count, option = 0) =>
	count && count < 6 ? `highcharts-set-${count}-${option}${className ? ` ${className}` : ''}` : className;
