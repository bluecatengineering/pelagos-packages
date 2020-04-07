import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';

import Label from '../components/Label';
import ComboBox from '../components/ComboBox';
import FieldError from '../formFields/FieldError';

import ListEntries from './ListEntries';

import './ListInput.less';

/** An input box for a list of values. */
const ListInput = ({
	id,
	label,
	optionalText,
	notice,
	emptyText,
	list,
	error,
	column,
	getSuggestions,
	getSuggestionText,
	getHighlightKey,
	parseInput,
	validateSuggestion,
	renderSuggestion,
	getItemKey,
	renderItem,
	onListChange,
	onTextChange,
	onErrorChange,
	...props
}) => {
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
				setText('');
				onTextChange(false);
				onListChange([getSuggestionText(suggestion), ...list]);
			} else {
				const error = validateSuggestion && validateSuggestion(suggestion);
				if (error) {
					const suggestionText = getSuggestionText(suggestion);
					setText(suggestionText);
					onTextChange(!!suggestionText);
					onErrorChange(error);
				} else {
					setText('');
					onTextChange(false);
					onListChange([suggestion, ...list]);
				}
			}
		},
		[
			getHighlightKey,
			parseInput,
			onTextChange,
			onListChange,
			getSuggestionText,
			list,
			validateSuggestion,
			onErrorChange,
		]
	);

	const handleEnter = useCallback(() => {
		if (text === '/clear') {
			setText('');
			onTextChange(false);
			onListChange([]);
		} else if (text && parseInput) {
			const {entries, error} = parseInput(text, list);
			if (error) {
				onErrorChange(error);
			} else {
				setText('');
				onTextChange(false);
				onListChange([...entries, ...list]);
				onErrorChange(null);
			}
		}
	}, [list, text, parseInput, onTextChange, onListChange, onErrorChange]);

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

	const handleRemoveClick = useCallback((item) => onListChange(list.filter((old) => old !== item)), [
		list,
		onListChange,
	]);

	const handleHighlightClear = useCallback(() => setHighlightKey(null), []);

	return (
		<div className="ListInput">
			<div className="ListInput__label">
				<Label htmlFor={id} text={label} />
				{optionalText && (!list || list.length === 0) && <span className="ListInput__optional">{optionalText}</span>}
				{notice && <span className="ListInput__notice">{notice}</span>}
			</div>
			<ComboBox
				{...props}
				id={id}
				autoSelect={!parseInput}
				text={text}
				error={!!error}
				getSuggestions={handleGetSuggestions}
				renderSuggestion={renderSuggestion}
				onChange={handleChange}
				onEnter={handleEnter}
				onTextChange={handleTextChange}
			/>
			<FieldError id={id + '-error'} text={error} />
			{list && list.length !== 0 ? (
				<ListEntries
					id={id + '-grid'}
					highlightKey={highlightKey}
					list={list}
					column={column}
					getItemKey={getItemKey}
					renderItem={renderItem}
					onRemoveClick={handleRemoveClick}
					onHighlightClear={handleHighlightClear}
				/>
			) : (
				<div className="ListInput__empty" id={id + '-empty'}>
					{emptyText}
				</div>
			)}
		</div>
	);
};

ListInput.propTypes = {
	/** The component id. */
	id: PropTypes.string.isRequired,
	/** The label text. */
	label: PropTypes.string,
	/** The hint text when list is empty. */
	optionalText: PropTypes.string,
	/** The notice/warning text. */
	notice: PropTypes.string,
	/** The placeholder text in the input box. */
	placeholder: PropTypes.string,
	/** The text below input box when list is empty. */
	emptyText: PropTypes.string,
	/** The entries for the list. */
	list: PropTypes.array,
	/** The error text. */
	error: PropTypes.string,
	/** Whether the list should be displayed as columns. */
	column: PropTypes.bool,
	/** Function invoked to provide a list of suggestions. */
	getSuggestions: PropTypes.func,
	/** Function invoked to render the suggestion text for the returned items. (see above) */
	getSuggestionText: PropTypes.func,
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
