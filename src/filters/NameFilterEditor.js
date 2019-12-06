import React, {useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';

import ListInput from '../listInput/ListInput';
import getGenericSuggestions from '../functions/getGenericSuggestions';
import renderSuggestion from '../suggestions/renderSuggestion';
import renderNamedListItem from '../listItems/renderNamedListItem';
import __ from '../strings';

const getName = o => o.name;
const getId = o => o.id;
const getSuggestionHighlightKey = s => (s.order === 2 ? s.id : null);

const NameFilterEditor = ({label, list, sourceById, placeholder, errorMessage, onListChange, validateSaveRef}) => {
	const [text, setText] = useState('');
	const [error, setError] = useState(null);

	const sourceList = useMemo(() => Object.values(sourceById), [sourceById]);

	const getSuggestions = useCallback((text, list) => getGenericSuggestions(text, list, sourceList, errorMessage), [
		sourceList,
		errorMessage,
	]);

	const handleListChange = useCallback(list => onListChange(list.map(getId)), [onListChange]);

	validateSaveRef.current = useCallback(() => {
		if (text) {
			setError(__('ITEM_NOT_ADDED'));
			return false;
		}
		return true;
	}, [text]);

	return (
		<ListInput
			id="nameFilterEditorInput"
			label={label}
			placeholder={placeholder}
			type="text"
			column
			value={text}
			list={list.map(id => sourceById[id] || {id})}
			error={error}
			getSuggestions={getSuggestions}
			getSuggestionText={getName}
			getHighlightKey={getSuggestionHighlightKey}
			renderSuggestion={renderSuggestion}
			getItemKey={getId}
			renderItem={renderNamedListItem}
			onListChange={handleListChange}
			onTextChange={setText}
			onErrorChange={setError}
		/>
	);
};

NameFilterEditor.propTypes = {
	label: PropTypes.string,
	list: PropTypes.array,
	sourceById: PropTypes.object,
	placeholder: PropTypes.string,
	errorMessage: PropTypes.string,
	onListChange: PropTypes.func,
	validateSaveRef: PropTypes.object,
};

export default NameFilterEditor;
