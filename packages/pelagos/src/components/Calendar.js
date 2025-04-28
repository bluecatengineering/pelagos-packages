import {forwardRef, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';
import ChevronLeft from '@carbon/icons-react/es/ChevronLeft';
import ChevronRight from '@carbon/icons-react/es/ChevronRight';

import l10n from '../l10n';
import useRandomId from '../hooks/useRandomId';

import IconButton from './IconButton';
import './Calendar.less';

const getInitialDate = (current) => {
	const date = current
		? Array.isArray(current)
			? current[1]
				? new Date(current[1])
				: new Date()
			: new Date(current)
		: new Date();
	date.setHours(0, 0, 0, 0);
	return date;
};

const addTime = (date, time) => {
	if (!time) {
		return date;
	}

	const d = new Date(date);
	const t = new Date(time);
	d.setHours(t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds());
	return d.getTime();
};

const extractDate = (value) => (value ? new Date(value).setHours(0, 0, 0, 0) : null);

const tempHighlight = (time, curTime, highlighted) => {
	if (time === highlighted || time === curTime) {
		return ' Calendar__cell--selected';
	}

	const [start, end] = highlighted <= curTime ? [highlighted, curTime] : [curTime, highlighted];
	if (time > start && time < end) {
		return ' Calendar__cell--dateRange';
	}

	return '';
};

const curHighlight = (time, rangeStart, rangeEnd) => {
	if (!rangeStart && !rangeEnd) {
		return '';
	}

	if (time === rangeStart || time === rangeEnd) {
		return ' Calendar__cell--selected';
	}

	const afterStartTime = !rangeStart || time > rangeStart;
	const beforeEndTime = !rangeEnd || time < rangeEnd;
	return afterStartTime && beforeEndTime ? ' Calendar__cell--dateRange' : '';
};

const updateDayOfMonth = (focused, dayOfMonth) => {
	const date = new Date(focused);
	date.setDate(dayOfMonth);
	return date;
};

const updateMonth = (focused, month) => {
	const date = new Date(focused);
	date.setMonth(month);
	// check if the new month is shorter and adjust the date
	const expected = month === -1 ? 11 : month === 12 ? 0 : month;
	if (date.getMonth() !== expected) {
		date.setDate(0);
	}
	return date;
};

const renderHeaders = (firstDate, weekDayFmtLong, weekDayFmtNarrow) => {
	const headers = [];
	const day = new Date(firstDate);
	for (let i = 0; i < 7; ++i) {
		headers.push(
			<th key={i} className="Calendar__dayLabel" abbr={weekDayFmtLong.format(day)} aria-hidden="true">
				{weekDayFmtNarrow.format(day)}
			</th>
		);
		day.setDate(day.getDate() + 1);
	}
	return headers;
};

const renderCells = (day, curMonth, curTime, highlighted, rangeStart, rangeEnd) => {
	const cells = [];
	for (let c = 0; c < 7; ++c) {
		const time = day.getTime();
		const isCurMonth = day.getMonth() === curMonth;
		const isSelected = time === curTime;
		cells.push(
			<td
				key={c}
				className={`Calendar__cell${
					!isCurMonth
						? ' Calendar__cell--disabled'
						: highlighted
							? tempHighlight(time, curTime, highlighted)
							: curHighlight(time, rangeStart, rangeEnd)
				}`}
				tabIndex={isSelected ? 0 : -1}
				aria-selected={isSelected}
				data-time={isCurMonth ? time : null}>
				{isCurMonth ? day.getDate() : ''}
			</td>
		);
		day.setDate(day.getDate() + 1);
	}
	return cells;
};

const renderRows = (firstDate, curMonth, curTime, highlighted, rangeStart, rangeEnd) => {
	const rows = [];
	const day = new Date(firstDate);
	for (let r = 0; r < 6; ++r) {
		rows.push(<tr key={r}>{renderCells(day, curMonth, curTime, highlighted, rangeStart, rangeEnd)}</tr>);
	}
	return rows;
};

const preventDefault = (event) => event.preventDefault();

/** A component which allows selecting either a single date or a date range. Passing an array in `value` enables range selection. */
const Calendar = forwardRef(({id, className, value, onChange, ...props}, ref) => {
	id = useRandomId(id);

	const tableRef = useRef();
	const liveRef = useRef();

	const [focused, setFocused] = useState(() => getInitialDate(value));
	const [highlighted, setHighlighted] = useState(null);

	const [monthFmt, weekDayFmtLong, weekDayFmtNarrow] = useMemo(() => {
		const locale = l10n.locale;
		return [
			new Intl.DateTimeFormat(locale, {year: 'numeric', month: 'long'}),
			new Intl.DateTimeFormat(locale, {weekday: 'long'}),
			new Intl.DateTimeFormat(locale, {weekday: 'narrow'}),
		];
	}, []);

	const handleHighlight = useCallback(
		(time) => {
			if (!Array.isArray(value)) {
				onChange(addTime(time, value));
			} else {
				setHighlighted((highlighted) => {
					if (!highlighted) {
						return time;
					}

					const [startTime, endTime] = value;
					let start, end;
					if (highlighted < time) {
						start = addTime(highlighted, startTime);
						end = addTime(time, endTime);
					} else {
						start = addTime(time, startTime);
						end = addTime(highlighted, endTime);
					}

					onChange([start, end]);
					return null;
				});
			}
		},
		[value, onChange]
	);

	const selectPrevMonth = useCallback(() => {
		setFocused((focused) => updateMonth(focused, focused.getMonth() - 1));
	}, []);

	const selectNextMonth = useCallback(() => {
		setFocused((focused) => updateMonth(focused, focused.getMonth() + 1));
	}, []);

	const handleKeyDown = useCallback(
		(event) => {
			if (!event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
				switch (event.key) {
					case 'Enter':
					case ' ':
						event.preventDefault();
						handleHighlight(focused.getTime());
						break;
					case 'PageUp':
						event.preventDefault();
						selectPrevMonth();
						break;
					case 'PageDown':
						event.preventDefault();
						selectNextMonth();
						break;
					case 'ArrowLeft':
						event.preventDefault();
						setFocused((focused) => updateDayOfMonth(focused, focused.getDate() - 1));
						break;
					case 'ArrowUp':
						event.preventDefault();
						setFocused((focused) => updateDayOfMonth(focused, focused.getDate() - 7));
						break;
					case 'ArrowRight':
						event.preventDefault();
						setFocused((focused) => updateDayOfMonth(focused, focused.getDate() + 1));
						break;
					case 'ArrowDown':
						event.preventDefault();
						setFocused((focused) => updateDayOfMonth(focused, focused.getDate() + 7));
						break;
				}
			}
		},
		[focused, selectPrevMonth, selectNextMonth, handleHighlight]
	);

	const handleMouseOver = useCallback(
		(event) => {
			const time = event.target.dataset.time;
			if (time && highlighted) {
				setFocused(new Date(+time));
			}
		},
		[highlighted]
	);

	const handleMouseUp = useCallback(
		(event) => {
			const time = event.target.dataset.time;
			if (time) {
				setFocused(new Date(+time));
				handleHighlight(+time);
			}
		},
		[handleHighlight]
	);

	const handleFocus = useCallback((event) => {
		if (!tableRef.current.contains(event.relatedTarget)) {
			liveRef.current.textContent = t`Use cursor keys to select date`;
		}
	}, []);

	const handleBlur = useCallback(() => (liveRef.current ? (liveRef.current.textContent = null) : null), []);

	useEffect(() => {
		const table = tableRef.current;
		if (document.activeElement && table.contains(document.activeElement)) {
			table.querySelector('[aria-selected="true"]').focus();
		}
	}, [focused]);

	const labelId = `${id}-label`;
	const firstDayOfMonth = new Date(focused);
	firstDayOfMonth.setDate(1);
	const firstDate = new Date(firstDayOfMonth);
	firstDate.setDate(1 - firstDate.getDay());
	const curMonth = focused.getMonth();
	const curTime = focused.getTime();
	const singleMode = !Array.isArray(value);
	const rangeStart = extractDate(singleMode ? value : value[0]);
	const rangeEnd = extractDate(singleMode ? value : value[1]);

	return (
		<div {...props} className={`Calendar${className ? ` ${className}` : ''}`} ref={ref}>
			<div className="sr-only" aria-live="polite" ref={liveRef} />
			<div className="Calendar__monthHeader">
				<IconButton
					className="Calendar__previous"
					icon={ChevronLeft}
					aria-label={t`Previous month`}
					onMouseDown={preventDefault}
					onClick={selectPrevMonth}
				/>
				<div id={labelId} className="Calendar__monthLabel" aria-live="polite">
					{monthFmt.format(focused)}
				</div>
				<IconButton
					className="Calendar__next"
					icon={ChevronRight}
					aria-label={t`Next month`}
					onMouseDown={preventDefault}
					onClick={selectNextMonth}
				/>
			</div>
			<table
				id={id}
				className="Calendar__days"
				role="grid"
				aria-labelledby={labelId}
				ref={tableRef}
				onKeyDown={handleKeyDown}
				onMouseOver={handleMouseOver}
				onMouseUp={handleMouseUp}
				onFocusCapture={handleFocus}
				onBlurCapture={handleBlur}>
				<thead>
					<tr>{renderHeaders(firstDate, weekDayFmtLong, weekDayFmtNarrow)}</tr>
				</thead>
				<tbody>{renderRows(firstDate, curMonth, curTime, highlighted, rangeStart, rangeEnd)}</tbody>
			</table>
		</div>
	);
});

Calendar.displayName = 'Calendar';

Calendar.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The current value, either a single date or an array with two dates. */
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
	/** Function invoked when the selection changes. */
	onChange: PropTypes.func,
};

export default Calendar;
