import {useCallback, useState} from 'react';
import PropTypes from 'prop-types';

import LabelLine from '../components/LabelLine';
import ComboBox from '../components/ComboBox';
import FieldError from '../formFields/FieldError';
import setLiveText from '../functions/setLiveText';
import __ from '../strings';

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
	error,
	column,
	getSuggestions,
	getSuggestionText,
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
			} else {
				const suggestionText = getSuggestionText(suggestion);
				if (parseInput) {
					setLiveText(__('OBJECT_ADDED', {name: suggestionText}));
					setText('');
					onTextChange(false);
					onListChange([suggestionText, ...list]);
				} else {
					const error = validateSuggestion && validateSuggestion(suggestion);
					if (error) {
						setText(suggestionText);
						onTextChange(!!suggestionText);
						onErrorChange(error);
					} else {
						setLiveText(__('OBJECT_ADDED', {name: suggestionText}));
						setText('');
						onTextChange(false);
						onListChange([suggestion, ...list]);
					}
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
				setLiveText(__('OBJECT_ADDED', {name: entries.join(', ')}));
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

	const empty = !list?.length;
	return (
		<div className="ListInput">
			<LabelLine htmlFor={id} text={label} optional={optional && empty} notice={notice} />
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
			{empty ? (
				<div className="ListInput__empty" id={id + '-empty'}>
					{emptyText}
				</div>
			) : (
				<ListEntries
					id={id + '-grid'}
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
