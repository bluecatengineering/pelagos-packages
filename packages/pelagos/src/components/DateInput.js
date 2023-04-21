import {useCallback, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';
import {createFocusTrap} from 'focus-trap';
import {Calendar, IconButton, Layer} from '@bluecateng/pelagos';
import {t} from '@bluecateng/l10n.macro';
import {faCalendar} from '@fortawesome/free-regular-svg-icons';

import './DateInput.less';

const DateInput = ({className, value, disabled, error, format, parse, onChange, ...props}) => {
	const buttonRef = useRef(null);
	const popUpRef = useRef(null);

	const [calendarTime, setCalendarTime] = useState(null);
	const handleInputChange = useCallback((event) => onChange(event.target.value), [onChange]);
	const handleButtonClick = useCallback(() => {
		// this is called only when the calendar is *not* visible
		setCalendarTime(parse(value) ?? new Date().setHours(0, 0, 0, 0));
	}, [parse, value]);
	const handleCalendarChange = useCallback(
		(time) => {
			onChange(format(time));
			setCalendarTime(null);
		},
		[format, onChange]
	);

	useEffect(() => {
		if (calendarTime === null) {
			return undefined;
		}

		const wrapper = buttonRef.current.parentNode;
		const {bottom, left} = wrapper.getBoundingClientRect();

		const popUp = popUpRef.current;
		popUp.style.top = `${bottom}px`;
		popUp.style.left = `${left}px`;
		popUp.dataset.layer = wrapper.dataset.layer;

		const trap = createFocusTrap(popUp, {
			initialFocus: '.Calendar [aria-selected="true"]',
			allowOutsideClick: (event) => {
				if (event.type === 'click') {
					trap.deactivate();
				}
				return false;
			},
			onDeactivate: () => setCalendarTime(null),
		});
		trap.activate();
		return trap.deactivate;
	}, [calendarTime]);

	return (
		<Layer className={`TimeInput${className ? ` ${className}` : ''}`}>
			<input
				{...props}
				className="TimeInput__input"
				type="text"
				value={value}
				disabled={disabled}
				aria-invalid={error}
				onChange={handleInputChange}
			/>
			<IconButton
				className="TimeInput__icon"
				icon={faCalendar}
				disabled={disabled}
				aria-label={value ? t`Change date, ${value}` : t`Choose date`}
				ref={buttonRef}
				onClick={handleButtonClick}
			/>
			{calendarTime !== null &&
				createPortal(
					<Calendar
						className="TimeInput__calendar"
						value={calendarTime}
						ref={popUpRef}
						onChange={handleCalendarChange}
					/>,
					document.body
				)}
		</Layer>
	);
};

DateInput.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The field value. */
	value: PropTypes.string,
	/** The placeholder text. */
	placeholder: PropTypes.string,
	/** Whether the field should be focused on display. */
	autoFocus: PropTypes.bool,
	/** Whether the field is disabled. */
	disabled: PropTypes.bool,
	/** Whether the component is in error. */
	error: PropTypes.bool,
	/** Function invoked to format the date selected form the calendar. */
	format: PropTypes.func,
	/** Function invoked to parse the value to pass to the calendar, must return null if the value is not valid. */
	parse: PropTypes.func,
	/** Function invoked when the value changes. */
	onChange: PropTypes.func,
};

export default DateInput;
