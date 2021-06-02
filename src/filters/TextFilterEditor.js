import {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import identity from 'lodash-es/identity';
import {t} from '@bluecat/l10n.macro';

import ListInput from '../listInput/ListInput';
import renderSuggestion from '../suggestions/renderSuggestion';

const getName = (o) => o.name;
const getSuggestionHighlightKey = (s) => (s.order === 2 ? s.name : null);

/** Filter editor where values are typed. */
const TextFilterEditor = ({label, placeholder, list, getSuggestions, parseInput, validateSaveRef, onListChange}) => {
	const [text, setText] = useState('');
	const [error, setError] = useState(null);

	const handleListChange = useCallback((list) => onListChange(list.length ? list : null), [onListChange]);

	validateSaveRef.current = useCallback(() => {
		if (text) {
			setError(t`Press Enter to add item(s) to the list.`);
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
			list={list || []}
			error={error}
			getSuggestions={getSuggestions}
			getSuggestionText={getName}
			getHighlightKey={getSuggestionHighlightKey}
			renderSuggestion={renderSuggestion}
			getItemKey={identity}
			getItemName={identity}
			parseInput={parseInput}
			onListChange={handleListChange}
			onTextChange={setText}
			onErrorChange={setError}
		/>
	);
};

TextFilterEditor.propTypes = {
	/** The field label. */
	label: PropTypes.string,
	/** The field hint. */
	placeholder: PropTypes.string,
	/** The current filter values. */
	list: PropTypes.array,
	/** Function returning suggestions. */
	getSuggestions: PropTypes.func,
	/** Function to parse the input text. */
	parseInput: PropTypes.func,
	/** A ref where the validation function will be stored. */
	validateSaveRef: PropTypes.object,
	/** Function invoked to apply changes. */
	onListChange: PropTypes.func,
};

export default TextFilterEditor;
