import {useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';

import ListInput from '../listInput/ListInput';
import getGenericSuggestions from '../functions/getGenericSuggestions';
import renderSuggestion from '../suggestions/renderSuggestion';
import renderNamedListItem from '../listItems/renderNamedListItem';
import __ from '../strings';

const getName = (o) => o.name;
const getId = (o) => o.id;
const getSuggestionHighlightKey = (s) => (s.order === 2 ? s.id : null);

/** Filter editor where values are selected from a list. */
const NameFilterEditor = ({label, placeholder, list, sourceById, errorMessage, validateSaveRef, onListChange}) => {
	const [text, setText] = useState('');
	const [error, setError] = useState(null);

	const sourceList = useMemo(() => Object.values(sourceById), [sourceById]);

	const getSuggestions = useCallback((text, list) => getGenericSuggestions(text, list, sourceList, errorMessage), [
		sourceList,
		errorMessage,
	]);

	const handleListChange = useCallback((list) => onListChange(list.length ? list.map(getId) : null), [onListChange]);

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
			list={list ? list.map((id) => sourceById[id] || {id}) : []}
			error={error}
			getSuggestions={getSuggestions}
			getSuggestionText={getName}
			getHighlightKey={getSuggestionHighlightKey}
			renderSuggestion={renderSuggestion}
			getItemKey={getId}
			getItemName={getName}
			renderItem={renderNamedListItem}
			onListChange={handleListChange}
			onTextChange={setText}
			onErrorChange={setError}
		/>
	);
};

NameFilterEditor.propTypes = {
	/** The field label. */
	label: PropTypes.string,
	/** The field hint. */
	placeholder: PropTypes.string,
	/** The current filter values. */
	list: PropTypes.array,
	/** The source for filter values. */
	sourceById: PropTypes.object,
	/** The error message when a value does not match. */
	errorMessage: PropTypes.string,
	/** A ref where the validation function will be stored. */
	validateSaveRef: PropTypes.object,
	/** Function invoked to apply changes. */
	onListChange: PropTypes.func,
};

export default NameFilterEditor;
