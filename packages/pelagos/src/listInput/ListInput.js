import {useCallback, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';

import useRandomId from '../hooks/useRandomId';
import LabelLine from '../components/LabelLine';
import ComboBox from '../components/ComboBox';
import FieldHelper from '../formFields/FieldHelper';

import ListEntries from './ListEntries';

import './ListInput.less';

/** An input box for a list of values. */
const ListInput = ({
	id,
	className,
	label,
	required,
	disabled,
	emptyText,
	list,
	helperText,
	error,
	reorderable,
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
	id = useRandomId(id);

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
		(item, index) => onListChange([...list.slice(0, index), ...list.slice(index + 1)]),
		[list, onListChange]
	);

	const handleHighlightClear = useCallback(() => setHighlightKey(null), []);

	const empty = !list?.length;
	const labelId = `${id}-label`;
	const helperId = `${id}-helper`;
	return (
		<div className={`ListInput${className ? ` ${className}` : ''}`}>
			<div className="sr-only" aria-live="assertive" ref={liveRef} />
			<LabelLine id={labelId} htmlFor={id} text={label} required={required} error={!!error} />
			<ComboBox
				{...props}
				id={id}
				autoSelect={!parseInput}
				text={text}
				disabled={disabled}
				error={!!error}
				getSuggestions={handleGetSuggestions}
				renderSuggestion={renderSuggestion}
				aria-describedby={helperId}
				aria-required={required}
				onChange={handleChange}
				onEnter={handleEnter}
				onTextChange={handleTextChange}
			/>
			<FieldHelper id={helperId} text={helperText} error={error} />
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
					disabled={disabled}
					reorderable={reorderable}
					column={column}
					getItemKey={getItemKey}
					getItemName={getItemName}
					renderItem={renderItem}
					onReorder={onListChange}
					onRemoveClick={handleRemoveClick}
					onHighlightClear={handleHighlightClear}
				/>
			)}
		</div>
	);
};

ListInput.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The label text. */
	label: PropTypes.string,
	/** Whether the field is required. */
	required: PropTypes.bool,
	/** Whether the field is disabled. */
	disabled: PropTypes.bool,
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
	/** Whether the list should be reorderable. */
	reorderable: PropTypes.oneOf([true, false, 'numbers']),
	/** Whether the list should be displayed as columns. Set to true if reorderable. */
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
	getItemKey: PropTypes.func.isRequired,
	/** Function invoked to get each item's name. */
	getItemName: PropTypes.func.isRequired,
	/** Function invoked to render each list item. */
	renderItem: PropTypes.func,
	/** Function invoked when the list changes. */
	onListChange: PropTypes.func.isRequired,
	/** Function invoked when the text input changes. */
	onTextChange: PropTypes.func.isRequired,
	/** Function invoked when error status changes. */
	onErrorChange: PropTypes.func,
};

export default ListInput;
