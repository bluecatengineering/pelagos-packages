import {useRef} from 'react';
import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';

import Button from '../components/Button';
import Layer from '../components/Layer';
import useAreaEditorPositioner from '../hooks/useAreaEditorPositioner';
import useRandomId from '../hooks/useRandomId';

import './FilterEditor.less';

/** Wrapper for filter editors. */
const FilterEditor = ({id, chipId, children, onClose, onSave, ...props}) => {
	id = useRandomId(id);
	const editorRef = useRef(null);

	useAreaEditorPositioner(editorRef, chipId, onClose);

	return (
		<Layer {...props} id={id} className="FilterEditor" role="dialog" ref={editorRef}>
			{children}
			<Button id="saveBtn" className="FilterEditor__save" size="small" text={t`Apply`} onClick={onSave} />
		</Layer>
	);
};

FilterEditor.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The ID of the chip which triggered the editor. */
	chipId: PropTypes.string,
	/** The child elements. */
	children: PropTypes.node,
	/** Function invoked when the editor is closed. */
	onClose: PropTypes.func,
	/** Function invoked when the save button is clicked. */
	onSave: PropTypes.func,
};

export default FilterEditor;
