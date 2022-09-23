import {useCallback} from 'react';
import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';

import Button from './Button';

/** Default buttons for the details panel. */
const DefaultDetailsButtons = ({className, item, disableEdit, disableDelete, onEdit, onDelete}) => {
	const handleEdit = useCallback(() => onEdit(item), [item, onEdit]);
	const handleDelete = useCallback(() => onDelete(item), [item, onDelete]);
	return (
		<div className={className}>
			{onDelete && (
				<Button
					id="deleteBtn"
					text={t`Delete`}
					tooltipText={disableDelete}
					disabled={!!disableDelete}
					onClick={handleDelete}
				/>
			)}
			<Button
				id="editBtn"
				text={t`Edit`}
				tooltipText={disableEdit}
				disabled={!!disableEdit}
				type="primary"
				onClick={handleEdit}
			/>
		</div>
	);
};

DefaultDetailsButtons.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The item to display, it must have at least two properties: id and name  */
	item: PropTypes.object.isRequired,
	/** If set the edit button is disabled and this text displayed as tooltip. */
	disableEdit: PropTypes.string,
	/** If set the delete button is disabled and this text displayed as tooltip. */
	disableDelete: PropTypes.string,
	/** Function invoked when the edit button is clicked. */
	onEdit: PropTypes.func,
	/** Function invoked when the delete button is clicked. */
	onDelete: PropTypes.func,
};

export default DefaultDetailsButtons;
