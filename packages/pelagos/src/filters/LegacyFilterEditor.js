import {useCallback, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';

import Button from '../components/Button';
import Layer from '../components/Layer';
import useLayer from '../hooks/useLayer';
import useEditorPositioner from '../hooks/useEditorPositioner';
import useFocusTrap from '../hooks/useFocusTrap';

import './FilterEditor.less';

const trueFn = () => true;

/** Wrapper for filter editors. */
const FilterEditor = ({name, value: initialValue, buttonId, trackId, getLabel, getEditor, onClose, onSave}) => {
	const [value, setValue] = useState(initialValue);

	const level = useLayer();

	const handleSave = useCallback(() => (validateSaveRef.current() ? onSave(value) : null), [value, onSave]);

	const editorRef = useRef(null);
	const validateSaveRef = useRef(trueFn);

	useEditorPositioner(editorRef, buttonId, trackId);
	useFocusTrap(editorRef, undefined, onClose);

	return (
		<Layer
			id="filterListDropDown"
			className="FilterEditor"
			style={{display: 'none'}}
			level={level}
			role="dialog"
			aria-label={getLabel(name)}
			ref={editorRef}>
			{getEditor(name, value, setValue, validateSaveRef)}
			<Button id="saveBtn" className="FilterEditor__save" size="small" text={t`Save`} onClick={handleSave} />
		</Layer>
	);
};

FilterEditor.propTypes = {
	/** The filter name. */
	name: PropTypes.string,
	/** The initial filter value. */
	value: PropTypes.any,
	/** The ID of the button which triggered the editor. */
	buttonId: PropTypes.string,
	/** The ID of the track which contains the trigger button. */
	trackId: PropTypes.string,
	/** Function returning the editor aria label. */
	getLabel: PropTypes.func,
	/** Function returning the editor body. */
	getEditor: PropTypes.func,
	/** Function invoked when the close button is clicked. */
	onClose: PropTypes.func,
	/** Function invoked when the save button is clicked. */
	onSave: PropTypes.func,
};

export default FilterEditor;
