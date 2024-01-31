import {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import identity from 'lodash-es/identity';
import {t} from '@bluecateng/l10n.macro';

import ListInput from '../listInput/ListInput';
import renderSuggestion from '../suggestions/renderSuggestion';
import useRandomId from '../hooks/useRandomId';

import FilterEditor from './FilterEditor';

const getName = (o) => o.name;
const getSuggestionHighlightKey = (s) => (s.order === 2 ? s.name : null);

/** Filter editor where values are typed. */
export const OldTextFilterEditor = ({
	label,
	placeholder,
	list,
	getSuggestions,
	parseInput,
	validateSaveRef,
	onListChange,
}) => {
	const [text, setText] = useState('');
	const [error, setError] = useState(null);

	const handleListChange = useCallback((list) => onListChange(list.length ? list : null), [onListChange]);

	validateSaveRef.current = useCallback(() => {
		if (text) {
			setError(t`Press Enter to add items to the list.`);
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

OldTextFilterEditor.propTypes = {
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

/** Filter editor where values are typed. */
export const NewTextFilterEditor = ({
	id,
	label,
	placeholder,
	list: initialList,
	getSuggestions,
	parseInput,
	chipId,
	onClose,
	onSave,
}) => {
	const [list, setList] = useState(initialList || []);
	const [text, setText] = useState('');
	const [error, setError] = useState(null);

	const handleSave = useCallback(
		() => (text ? setError(t`Press Enter to add items to the list.`) : onSave(list.length ? list : null)),
		[list, onSave, text]
	);

	id = useRandomId(id);
	return (
		<FilterEditor id={id} chipId={chipId} aria-labelledby={`${id}-list-label`} onClose={onClose} onSave={handleSave}>
			<ListInput
				id={`${id}-list`}
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
				getItemName={identity}
				parseInput={parseInput}
				onListChange={setList}
				onTextChange={setText}
				onErrorChange={setError}
			/>
		</FilterEditor>
	);
};

NewTextFilterEditor.propTypes = {
	/** The component id. */
	id: PropTypes.string,
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
	/** The ID of the chip which triggered the editor. */
	chipId: PropTypes.string,
	/** Function invoked to close the editor. */
	onClose: PropTypes.func,
	/** Function invoked to save changes. */
	onSave: PropTypes.func,
};

/** Filter editor where values are typed. */
const TextFilterEditor = ({forArea, ...props}) =>
	forArea ? <NewTextFilterEditor {...props} /> : <OldTextFilterEditor {...props} />;

TextFilterEditor.propTypes = {
	/** The component id (only when forArea is true). */
	id: PropTypes.string,
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
	/** A ref where the validation function will be stored (only when forArea is false). */
	validateSaveRef: PropTypes.object,
	/** Function invoked to apply changes (only when forArea is false). */
	onListChange: PropTypes.func,
	/** The ID of the chip which triggered the editor (only when forArea is true). */
	chipId: PropTypes.string,
	/** Function invoked to close the editor (only when forArea is true). */
	onClose: PropTypes.func,
	/** Function invoked to save changes (only when forArea is true). */
	onSave: PropTypes.func,
	/** Whether to enable new behaviour for FilterArea.  */
	forArea: PropTypes.bool,
};

export default TextFilterEditor;
