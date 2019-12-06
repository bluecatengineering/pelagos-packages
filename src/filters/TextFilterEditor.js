import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import identity from 'lodash-es/identity';

import ListInput from '../listInput/ListInput';
import renderSuggestion from '../suggestions/renderSuggestion';
import renderListItem from '../listItems/renderListItem';
import __ from '../strings';

const getName = o => o.name;
const getSuggestionHighlightKey = s => (s.order === 2 ? s.name : null);

const TextFilterEditor = ({label, list, placeholder, getSuggestions, parseInput, onListChange, validateSaveRef}) => {
	const [text, setText] = useState('');
	const [error, setError] = useState(null);

	validateSaveRef.current = useCallback(() => {
		if (text) {
			setError(__('ITEM_NOT_ADDED'));
			return false;
		}
		return true;
	}, [text]);

	return (
		<ListInput
			id="textFilterEditorInput"
			label={label}
			placeholder={placeholder}
			type="text"
			column
			value={text}
			list={list}
			error={error}
			getSuggestions={getSuggestions}
			getSuggestionText={getName}
			getHighlightKey={getSuggestionHighlightKey}
			renderSuggestion={renderSuggestion}
			getItemKey={identity}
			renderItem={renderListItem}
			parseInput={parseInput}
			onListChange={onListChange}
			onTextChange={setText}
			onErrorChange={setError}
		/>
	);
};

TextFilterEditor.propTypes = {
	label: PropTypes.string,
	list: PropTypes.array,
	placeholder: PropTypes.string,
	getSuggestions: PropTypes.func,
	parseInput: PropTypes.func,
	onListChange: PropTypes.func,
	validateSaveRef: PropTypes.object,
};

export default TextFilterEditor;
