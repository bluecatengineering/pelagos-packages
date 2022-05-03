import {cloneElement, forwardRef} from 'react';
import PropTypes from 'prop-types';
import {t, plural} from '@bluecat/l10n.macro';

import Button from '../components/Button';
import elementOfType from '../functions/elementOfType';

const hide = (child, index) => cloneElement(child, {tabIndex: -1, key: child.key || index});

/** Table toolbar for batch actions. */
const TableToolbarBatch = forwardRef(({className, selectedCount, children, onCancel, ...props}, ref) => (
	<div
		{...props}
		className={`Table__toolbarBatch${selectedCount ? ' Table__toolbarBatch--active' : ''}${
			className ? ` ${className}` : ''
		}`}
		aria-hidden={!selectedCount}
		ref={ref}
	>
		<div className="Table__toolbarBatchCount">
			{plural(selectedCount, {one: 'one item selected', other: '# items selected'})}
		</div>
		<div className="Table__toolbarBatchButtons">
			{selectedCount ? children : Array.isArray(children) ? children.map(hide) : hide(children, 0)}
			<Button
				className="Table__toolbarBatchCancel"
				type="primary"
				text={t`Clear`}
				tabIndex={selectedCount ? 0 : -1}
				onClick={onCancel}
			/>
		</div>
	</div>
));

TableToolbarBatch.displayName = 'TableToolbarBatch';

TableToolbarBatch.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The count of selected items. */
	selectedCount: PropTypes.number.isRequired,
	/** The child elements. */
	children: PropTypes.oneOfType([elementOfType(Button), PropTypes.arrayOf(elementOfType(Button))]),
	/** Function invoked when the cancel button is clicked. */
	onCancel: PropTypes.func,
};

export default TableToolbarBatch;
