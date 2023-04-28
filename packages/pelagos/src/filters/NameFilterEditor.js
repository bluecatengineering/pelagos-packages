import {useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import identity from 'lodash-es/identity';
import {t} from '@bluecateng/l10n.macro';

import ListInput from '../listInput/ListInput';
import getGenericSuggestions from '../functions/getGenericSuggestions';
import renderSuggestion from '../suggestions/renderSuggestion';
import renderNamedListItem from '../listItems/renderNamedListItem';
import ListItem from '../listItems/ListItem';

import FilterEditor from './FilterEditor';

const getName = (o) => o.name;
const getId = (o) => o.id;
const getSuggestionHighlightKey = (s) => (s.order === 2 ? s.id : null);

/** Filter editor where values are selected from a list. */
export const OldNameFilterEditor = ({
	label,
	placeholder,
	list,
	sourceById,
	errorMessage,
	validateSaveRef,
	onListChange,
}) => {
	const [text, setText] = useState('');
	const [error, setError] = useState(null);

	const sourceList = useMemo(() => Object.values(sourceById), [sourceById]);

	const getSuggestions = useCallback(
		(text, list) => getGenericSuggestions(text, list, sourceList, errorMessage),
		[sourceList, errorMessage]
	);

	const handleListChange = useCallback((list) => onListChange(list.length ? list.map(getId) : null), [onListChange]);

	validateSaveRef.current = useCallback(() => {
		if (text) {
			setError(t`Press Enter to add items to the list.`);
			return false;
		}
		return true;
	}, [text]);

	return (
		<ListInput
			id="nameFilterEditorInput"
			label={label}
			placeholder={placeholder}
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

OldNameFilterEditor.propTypes = {
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

export const NewNameFilterEditor = ({
	id,
	label,
	placeholder,
	list: initialList,
	sourceById,
	errorMessage,
	chipId,
	onClose,
	onSave,
}) => {
	const [list, setList] = useState(initialList || []);
	const [text, setText] = useState('');
	const [error, setError] = useState(null);

	const sourceList = useMemo(() => Object.values(sourceById), [sourceById]);

	const getSuggestions = useCallback(
		(text, list) => getGenericSuggestions(text, (id) => list.includes(id), sourceList, errorMessage),
		[sourceList, errorMessage]
	);

	const getName = useCallback((id) => sourceById[id]?.name || id, [sourceById]);

	const renderItem = useCallback(
		(id) => <ListItem item={sourceById[id]?.name || id} unresolved={!(id in sourceById)} />,
		[sourceById]
	);

	const handleSave = useCallback(
		() => (text ? setError(t`Press Enter to add items to the list.`) : onSave(list.length ? list : null)),
		[list, onSave, text]
	);

	return (
		<FilterEditor id={id} chipId={chipId} onClose={onClose} onSave={handleSave}>
			<ListInput
				id="nameFilterEditorInput"
				label={label}
				placeholder={placeholder}
				column
				value={text}
				list={list}
				error={error}
				getSuggestions={getSuggestions}
				getSuggestionValue={getId}
				getHighlightKey={getSuggestionHighlightKey}
				renderSuggestion={renderSuggestion}
				getItemKey={identity}
				getItemName={getName}
				renderItem={renderItem}
				onListChange={setList}
				onTextChange={setText}
				onErrorChange={setError}
			/>
		</FilterEditor>
	);
};

NewNameFilterEditor.propTypes = {
	/** The component id. */
	id: PropTypes.string,
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
	/** The ID of the chip which triggered the editor. */
	chipId: PropTypes.string,
	/** Function invoked to close the editor. */
	onClose: PropTypes.func,
	/** Function invoked to save changes. */
	onSave: PropTypes.func,
};

/** Filter editor where values are selected from a list. */
const NameFilterEditor = ({forArea, ...props}) =>
	forArea ? <NewNameFilterEditor {...props} /> : <OldNameFilterEditor {...props} />;

NameFilterEditor.propTypes = {
	/** The component id (only when forArea is true). */
	id: PropTypes.string,
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

export default NameFilterEditor;
