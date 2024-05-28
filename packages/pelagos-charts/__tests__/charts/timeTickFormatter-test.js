import {timeYear, timeMonth, timeWeek, timeDay, timeHour, timeMinute, timeSecond} from 'd3-time';

import timeTickFormatter from '../../src/charts/timeTickFormatter';

jest.unmock('../../src/charts/timeTickFormatter');

jest.mock('d3-time-format', () => ({timeFormat: (fmt) => () => fmt}));

describe('timeTickFormatter', () => {
	it('formats time when is less than a second', () => {
		timeSecond.mockReturnValue(0);
		expect(timeTickFormatter(500)).toBe('.%L');
	});

	it('formats time when is between a second and a minute', () => {
		timeSecond.mockReturnValue(3_000);
		timeMinute.mockReturnValue(0);
		expect(timeTickFormatter(3_000)).toBe(':%S');
	});

	it('formats time when is between a minute and an hour', () => {
		timeSecond.mockReturnValue(300_000);
		timeMinute.mockReturnValue(300_000);
		timeHour.mockReturnValue(0);
		expect(timeTickFormatter(300_000)).toBe('%H:%M');
	});

	it('formats time when is between an hour and a day', () => {
		timeSecond.mockReturnValue(10_800_000);
		timeMinute.mockReturnValue(10_800_000);
		timeHour.mockReturnValue(10_800_000);
		timeDay.mockReturnValue(0);
		expect(timeTickFormatter(10_800_000)).toBe('%H:00');
	});

	it('formats time when is between a day and a week', () => {
		timeSecond.mockReturnValue(259_200_000);
		timeMinute.mockReturnValue(259_200_000);
		timeHour.mockReturnValue(259_200_000);
		timeDay.mockReturnValue(259_200_000);
		timeWeek.mockReturnValue(0);
		timeMonth.mockReturnValue(0);
		expect(timeTickFormatter(259_200_000)).toBe('%a %d');
	});

	it('formats time when is between a week and a month', () => {
		timeSecond.mockReturnValue(1_209_600_000);
		timeMinute.mockReturnValue(1_209_600_000);
		timeHour.mockReturnValue(1_209_600_000);
		timeDay.mockReturnValue(1_209_600_000);
		timeWeek.mockReturnValue(1_209_600_000);
		timeMonth.mockReturnValue(0);
		expect(timeTickFormatter(1_209_600_000)).toBe('%b %d');
	});

	it('formats time when is between a month and a year', () => {
		timeSecond.mockReturnValue(7_776_000_000);
		timeMinute.mockReturnValue(7_776_000_000);
		timeHour.mockReturnValue(7_776_000_000);
		timeDay.mockReturnValue(7_776_000_000);
		timeWeek.mockReturnValue(7_776_000_000);
		timeMonth.mockReturnValue(7_776_000_000);
		timeYear.mockReturnValue(0);
		expect(timeTickFormatter(7_776_000_000)).toBe('%b');
	});

	it('formats time when is more than a year', () => {
		timeSecond.mockReturnValue(94_608_000_000);
		timeMinute.mockReturnValue(94_608_000_000);
		timeHour.mockReturnValue(94_608_000_000);
		timeDay.mockReturnValue(94_608_000_000);
		timeWeek.mockReturnValue(94_608_000_000);
		timeMonth.mockReturnValue(94_608_000_000);
		timeYear.mockReturnValue(94_608_000_000);
		expect(timeTickFormatter(94_608_000_000)).toBe('%Y');
	});
});
