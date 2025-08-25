import {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';

import LabelLine from '../components/LabelLine';
import RadioGroup from '../components/RadioGroup';
import TextInputField from '../formFields/TextInputField';
import Calendar from '../components/Calendar';
import useRandomId from '../hooks/useRandomId';

import FilterEditor from './FilterEditor';

import './TimeFilterEditor.less';

const buildCustomRange = (from, to) => {
	const time = {};
	if (from) {
		time.from = from;
	}
	if (to) {
		time.to = to;
	}
	return time;
};

/**
 * Filter editor which accepts a time range.
 * The list of options must have `custom` as the last entry.
 * If `value` is an object the format is `{from?: number, to?: number}`.
 */
export const TimeFilterEditor = ({
	id,
	label,
	value,
	fromPlaceholder,
	toPlaceholder,
	options,
	getOptionLabel,
	format,
	parse,
	validateFrom,
	validateTo,
	chipId,
	onClose,
	onSave,
}) => {
	const [option, setOption] = useState(() => (!value ? 'all' : typeof value === 'string' ? value : 'custom'));
	const [from, setFrom] = useState(() => (value?.from ? format(value.from) : ''));
	const [to, setTo] = useState(() => (value?.to ? format(value.to) : ''));
	const [fromError, setFromError] = useState(null);
	const [toError, setToError] = useState(null);
	const [saveError, setSaveError] = useState(null);

	const handleFromChange = useCallback(
		(from) => {
			setFrom(from);
			setFromError(validateFrom(from));
			setSaveError(null);
		},
		[validateFrom]
	);
	const handleToChange = useCallback(
		(to) => {
			setTo(to);
			setToError(validateTo(to));
			setSaveError(null);
		},
		[validateTo]
	);

	const handleCalendarChange = useCallback(
		([from, to]) => {
			const formattedFrom = format(from);
			const formattedTo = format(to);
			setOption('custom');
			setFrom(formattedFrom);
			setTo(formattedTo);
			setFromError(validateFrom(formattedFrom));
			setToError(validateTo(formattedTo));
			setSaveError(null);
		},
		[format, validateFrom, validateTo]
	);

	const handleSave = useCallback(() => {
		if (option === 'custom') {
			if (fromError || toError) {
				return;
			}
			if (!from && !to) {
				setSaveError(t`Enter either one or both values.`);
				return;
			}
			const fromTime = from ? parse(from, true) : undefined;
			const toTime = to ? parse(to, false) : undefined;
			if (fromTime && toTime && fromTime >= toTime) {
				setSaveError(t`"From" must be less than "To".`);
				return;
			}
			onSave(buildCustomRange(fromTime, toTime));
			return;
		}
		onSave(option === 'all' ? null : option);
	}, [option, onSave, fromError, toError, from, to, parse]);

	useEffect(() => {
		if (option === 'custom') {
			document.getElementById('time-from').focus();
		}
	}, [option]);

	id = useRandomId(id);
	const labelId = `${id}-label`;
	const isCustom = option === 'custom';
	return (
		<FilterEditor id={id} chipId={chipId} aria-labelledby={labelId} onClose={onClose} onSave={handleSave}>
			<div className="TimeFilterEditor__body">
				<div>
					<LabelLine id={labelId} text={label} />
					<RadioGroup
						id="time-options"
						renderLabel={getOptionLabel}
						options={options}
						value={option}
						onChange={setOption}
					/>
					<div role="group" aria-label={t`Custom`}>
						<TextInputField
							id="time-from"
							className="TimeFilterEditor__input"
							label={t`From`}
							value={from}
							placeholder={fromPlaceholder}
							disabled={!isCustom}
							error={fromError ?? saveError}
							onChange={handleFromChange}
						/>
						<TextInputField
							id="time-to"
							className="TimeFilterEditor__input"
							label={t`To`}
							value={to}
							placeholder={toPlaceholder}
							disabled={!isCustom}
							error={toError}
							onChange={handleToChange}
						/>
					</div>
				</div>
				<Calendar
					id="time-calendar"
					value={isCustom ? [from ? parse(from, true) : undefined, to ? parse(to, false) : undefined] : []}
					onChange={handleCalendarChange}
				/>
			</div>
		</FilterEditor>
	);
};

TimeFilterEditor.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The field label. */
	label: PropTypes.string,
	/** The current value. */
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	/** The hint for the "from" field. */
	fromPlaceholder: PropTypes.string,
	/** The hint for the "to" field. */
	toPlaceholder: PropTypes.string,
	/** The list of predefined time ranges. */
	options: PropTypes.arrayOf(PropTypes.string).isRequired,
	/** Function returning the label for the specified option. */
	getOptionLabel: PropTypes.func.isRequired,
	/** Function returning a formatted time. */
	format: PropTypes.func,
	/** Function returning the parsed time as a number. */
	parse: PropTypes.func,
	/** Function invoked to validate the "from" time, must return either an error message or `null`. */
	validateFrom: PropTypes.func,
	/** Function invoked to validate the "to" time, must return either an error message or `null`. */
	validateTo: PropTypes.func,
	/** The ID of the chip which triggered the editor. */
	chipId: PropTypes.string,
	/** Function invoked to close the editor. */
	onClose: PropTypes.func,
	/** Function invoked to save changes. */
	onSave: PropTypes.func,
};

export default TimeFilterEditor;
