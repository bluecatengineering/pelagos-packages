import {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {createFocusTrap} from 'focus-trap';
import {t} from '@bluecat/l10n.macro';

import Button from '../components/Button';
import useEditorPositioner from '../hooks/useEditorPositioner';

import './FilterEditor.less';

const trueFn = () => true;

const FilterEditor = ({name, value: initialValue, buttonId, trackId, getLabel, getEditor, onClose, onSave}) => {
	const [value, setValue] = useState(initialValue);

	const handleSave = useCallback(() => (validateSaveRef.current() ? onSave(value) : null), [value, onSave]);

	const editorRef = useRef(null);
	const validateSaveRef = useRef(trueFn);

	useEditorPositioner(editorRef, buttonId, trackId);
	useEffect(() => {
		const trap = createFocusTrap(editorRef.current, {
			clickOutsideDeactivates: (event) => !event.target.closest('[role="listbox"]'),
			onDeactivate: onClose,
		});
		trap.activate();
		return trap.deactivate;
	}, [onClose]);

	return (
		<div
			id="filterListDropDown"
			className="FilterEditor"
			style={{display: 'none'}}
			role="dialog"
			aria-label={getLabel(name)}
			ref={editorRef}
		>
			{getEditor(name, value, setValue, validateSaveRef)}
			<Button id="saveBtn" className="FilterEditor__save" size="small" text={t`Save`} onClick={handleSave} />
		</div>
	);
};

FilterEditor.propTypes = {
	name: PropTypes.string,
	value: PropTypes.any,
	buttonId: PropTypes.string,
	trackId: PropTypes.string,
	getLabel: PropTypes.func,
	getEditor: PropTypes.func,
	onClose: PropTypes.func,
	onSave: PropTypes.func,
};

export default FilterEditor;
