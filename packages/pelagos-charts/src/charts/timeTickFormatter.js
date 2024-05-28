import {timeYear, timeMonth, timeWeek, timeDay, timeHour, timeMinute, timeSecond} from 'd3-time';
import {timeFormat} from 'd3-time-format';

const formatMillisecond = timeFormat('.%L'),
	formatSecond = timeFormat(':%S'),
	formatMinute = timeFormat('%H:%M'),
	formatHour = timeFormat('%H:00'),
	formatDay = timeFormat('%a %d'),
	formatWeek = timeFormat('%b %d'),
	formatMonth = timeFormat('%b'),
	formatYear = timeFormat('%Y');

export default (date) =>
	(timeSecond(date) < date
		? formatMillisecond
		: timeMinute(date) < date
			? formatSecond
			: timeHour(date) < date
				? formatMinute
				: timeDay(date) < date
					? formatHour
					: timeMonth(date) < date
						? timeWeek(date) < date
							? formatDay
							: formatWeek
						: timeYear(date) < date
							? formatMonth
							: formatYear)(date);
