import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';
import Close from '@carbon/icons-react/es/Close';

import cloneWithClassName from '../functions/cloneWithClassName';
import useRandomId from '../hooks/useRandomId';
import useSlidingPanel from '../hooks/useSlidingPanel';

import IconButton from './IconButton';
import DefaultDetailsButtons from './DefaultDetailsButtons';

import './EditorDetailsPanel.less';

/**
 * Details panel for the edit table.
 * If a single child is provided a standard set of buttons will be added,
 * if two children are provided the second child should contain all required buttons.
 */
const EditorDetailsPanel = ({
	id,
	item,
	showButtons,
	disableEdit,
	disableDelete,
	children,
	onClose,
	onEdit,
	onDelete,
}) => (
	<aside id={useRandomId(id)} className="EditorDetailsPanel" aria-labelledby="detailsPanelTitle">
		<div className="EditorDetailsPanel__header">
			<h2 id="detailsPanelTitle" className="EditorDetailsPanel__title">
				{item.name}
			</h2>
			<IconButton
				id="closeDetailsPanelBtn"
				className="EditorDetailsPanel__close"
				icon={Close}
				size="large"
				aria-label={t`Close`}
				tooltipText={t`Close`}
				tooltipPlacement="left"
				onClick={useSlidingPanel(id, onClose)}
			/>
		</div>

		{Array.isArray(children) ? (
			<>
				{cloneWithClassName(children[0], 'EditorDetailsPanel__body')}
				{children[1] && cloneWithClassName(children[1], 'EditorDetailsPanel__buttons')}
			</>
		) : (
			<>
				{cloneWithClassName(children, 'EditorDetailsPanel__body')}
				{showButtons && (
					<DefaultDetailsButtons
						className="EditorDetailsPanel__buttons"
						item={item}
						disableEdit={disableEdit}
						disableDelete={disableDelete}
						onEdit={onEdit}
						onDelete={onDelete}
					/>
				)}
			</>
		)}
	</aside>
);

EditorDetailsPanel.propTypes = {
	/** The component ID. */
	id: PropTypes.string,
	/** The item to display, it must have at least two properties: id and name  */
	item: PropTypes.object.isRequired,
	/** Whether to show the buttons. */
	showButtons: PropTypes.bool,
	/** If set the edit button is disabled and this text displayed as tooltip. */
	disableEdit: PropTypes.string,
	/** If set the delete button is disabled and this text displayed as tooltip. */
	disableDelete: PropTypes.string,
	/** The panel content. */
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired,
	/** Function invoked when the close button is clicked. */
	onClose: PropTypes.func,
	/** Function invoked when the edit button is clicked. */
	onEdit: PropTypes.func,
	/** Function invoked when the delete button is clicked. */
	onDelete: PropTypes.func,
};

export default EditorDetailsPanel;
