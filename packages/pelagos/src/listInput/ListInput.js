import {useCallback, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';

import LabelLine from '../components/LabelLine';
import ComboBox from '../components/ComboBox';
import FieldError from '../formFields/FieldError';
import FieldHelper from '../formFields/FieldHelper';

import ListEntries from './ListEntries';

import './ListInput.less';

/** An input box for a list of values. */
const ListInput = ({
	id,
	label,
	optional,
	notice,
	emptyText,
	list,
	helperText,
	error,
	column,
	getSuggestions,
	getSuggestionText,
	getSuggestionValue,
	getHighlightKey,
	parseInput,
	validateSuggestion,
	renderSuggestion,
	getItemKey,
	getItemName,
	renderItem,
	onListChange,
	onTextChange,
	onErrorChange,
	...props
}) => {
	const liveRef = useRef(null);

	const [text, setText] = useState('');
	const [highlightKey, setHighlightKey] = useState(null);

	const handleGetSuggestions = useCallback(
		(text) => {
			const {suggestions, error} = getSuggestions(text, list);
			if (error) {
				onErrorChange(error);
				return [];
			}

			return suggestions;
		},
		[list, getSuggestions, onErrorChange]
	);

	const handleChange = useCallback(
		(suggestion) => {
			const id = getHighlightKey(suggestion);
			if (id) {
				setText('');
				onTextChange(false);
				setHighlightKey(id);
			} else if (parseInput) {
				let name, item;
				if (getSuggestionValue) {
					item = getSuggestionValue(suggestion);
					name = getItemName(item);
				} else {
					item = name = getSuggestionText(suggestion);
				}
				liveRef.current.textContent = t`${name} added`;
				setText('');
				onTextChange(false);
				onListChange([item, ...list]);
			} else {
				const item = getSuggestionValue ? getSuggestionValue(suggestion) : suggestion;
				const name = getSuggestionValue ? getItemName(item) : getSuggestionText(suggestion);
				const error = validateSuggestion && validateSuggestion(suggestion);
				if (error) {
					setText(name);
					onTextChange(!!name);
					onErrorChange(error);
				} else {
					liveRef.current.textContent = t`${name} added`;
					setText('');
					onTextChange(false);
					onListChange([item, ...list]);
				}
			}
		},
		[
			getHighlightKey,
			parseInput,
			onTextChange,
			onListChange,
			getSuggestionText,
			getSuggestionValue,
			getItemName,
			list,
			validateSuggestion,
			onErrorChange,
		]
	);

	const handleEnter = useCallback(
		(text) => {
			if (text === '/clear') {
				setText('');
				onTextChange(false);
				onListChange([]);
			} else if (text && parseInput) {
				const {entries, error} = parseInput(text, list);
				if (error) {
					onErrorChange(error);
				} else {
					const name = entries.map(getItemName).join(', ');
					liveRef.current.textContent = t`${name} added`;
					setText('');
					onTextChange(false);
					onListChange([...entries, ...list]);
					onErrorChange(null);
				}
			}
		},
		[list, parseInput, getItemName, onTextChange, onListChange, onErrorChange]
	);

	const handleTextChange = useCallback(
		(text) => {
			if (error) {
				onErrorChange(null);
			}
			setText(text);
			onTextChange(!!text);
		},
		[error, onTextChange, onErrorChange]
	);

	const handleRemoveClick = useCallback(
		(item) => onListChange(list.filter((old) => old !== item)),
		[list, onListChange]
	);

	const handleHighlightClear = useCallback(() => setHighlightKey(null), []);

	const empty = !list?.length;
	const helperId = `${id}-helper`;
	const errorId = `${id}-error`;
	return (
		<div className="ListInput">
			<div className="sr-only" aria-live="assertive" ref={liveRef} />
			<LabelLine htmlFor={id} text={label} optional={optional && empty} notice={notice} />
			<ComboBox
				{...props}
				id={id}
				autoSelect={!parseInput}
				text={text}
				error={!!error}
				getSuggestions={handleGetSuggestions}
				renderSuggestion={renderSuggestion}
				aria-describedby={error ? errorId : helperId}
				onChange={handleChange}
				onEnter={handleEnter}
				onTextChange={handleTextChange}
			/>
			{error ? <FieldError id={errorId} text={error} /> : <FieldHelper id={helperId} text={helperText} />}
			{empty ? (
				<div className="ListInput__empty" id={id + '-empty'} aria-live="polite">
					{emptyText}
				</div>
			) : (
				<ListEntries
					id={id + '-grid'}
					className="ListInput__list"
					highlightKey={highlightKey}
					list={list}
					column={column}
					getItemKey={getItemKey}
					getItemName={getItemName}
					renderItem={renderItem}
					onRemoveClick={handleRemoveClick}
					onHighlightClear={handleHighlightClear}
				/>
			)}
		</div>
	);
};

ListInput.propTypes = {
	/** The component id. */
	id: PropTypes.string.isRequired,
	/** The label text. */
	label: PropTypes.string,
	/** Whether the field is optional. */
	optional: PropTypes.bool,
	/** The notice/warning text. */
	notice: PropTypes.string,
	/** The placeholder text in the input box. */
	placeholder: PropTypes.string,
	/** The text below input box when list is empty. */
	emptyText: PropTypes.string,
	/** The entries for the list. */
	list: PropTypes.array,
	/** Additional information for the field. */
	helperText: PropTypes.string,
	/** The error text. */
	error: PropTypes.string,
	/** Whether the list should be displayed as columns. */
	column: PropTypes.bool,
	/** Function invoked to provide a list of suggestions. */
	getSuggestions: PropTypes.func,
	/** Function invoked to render the suggestion text for the returned items. (see above) */
	getSuggestionText: PropTypes.func,
	/** Function invoked to get the value from the suggestion to add to the list. (see above) */
	getSuggestionValue: PropTypes.func,
	/** Function invoked to get the key of the suggestion to highlight. */
	getHighlightKey: PropTypes.func,
	/** Function invoked to parse the input text. */
	parseInput: PropTypes.func,
	/** Function invoked to validate the suggestion. */
	validateSuggestion: PropTypes.func,
	/** Function invoked to render the suggestions. */
	renderSuggestion: PropTypes.func,
	/** Function invoked to get each item's key. */
	getItemKey: PropTypes.func,
	/** Function invoked to get each item's name. */
	getItemName: PropTypes.func,
	/** Function invoked to render each list item. */
	renderItem: PropTypes.func,
	/** Function invoked when the list changes. */
	onListChange: PropTypes.func,
	/** Function invoked when the text input changes. */
	onTextChange: PropTypes.func,
	/** Function invoked when error status changes. */
	onErrorChange: PropTypes.func,
};

export default ListInput;
