import {forwardRef, useCallback} from 'react';
import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';
import ArrowDown from '@carbon/icons-react/es/ArrowDown';
import ArrowUp from '@carbon/icons-react/es/ArrowUp';
import ArrowsVertical from '@carbon/icons-react/es/ArrowsVertical';

const {max, round} = Math;

const setTableHeight = (header) => {
	const row = header.parentNode;
	row.style.setProperty('--table-height', `${row.parentNode.parentNode.clientHeight}px`);
};

const stopEventPropagation = (event) => event.stopPropagation();

/** Header element for a table component. */
const TableHeader = forwardRef(
	({className, width, align = 'left', sortable, sortOrder, radio, style, children, onResize, ...props}, ref) => {
		const handleResizeFocus = useCallback((event) => setTableHeight(event.target.closest('th')), []);
		const handleResizeKey = useCallback(
			(event) => {
				const header = event.target.closest('th');
				switch (event.key) {
					case 'ArrowLeft': {
						event.preventDefault();
						event.stopPropagation();
						const newWidth = max(width - 1, 40);
						if (newWidth !== width) {
							onResize(newWidth, header);
						}
						break;
					}
					case 'ArrowRight': {
						event.preventDefault();
						event.stopPropagation();
						onResize(width + 1, header);
						break;
					}
					case 'PageDown': {
						event.preventDefault();
						event.stopPropagation();
						const newWidth = max(width - 10, 40);
						if (newWidth !== width) {
							onResize(newWidth, header);
						}
						break;
					}
					case 'PageUp': {
						event.preventDefault();
						event.stopPropagation();
						onResize(width + 10, header);
						break;
					}
				}
			},
			[onResize, width]
		);
		const handleResizePointer = useCallback(
			(event) => {
				if (event.button !== 0) return;

				event.preventDefault();
				event.stopPropagation();
				const startX = event.clientX;
				const target = event.target;
				target.classList.add('resizing');
				const header = target.closest('th');
				setTableHeight(header);
				const handlePointerMove = (event) => {
					event.stopPropagation();
					const newWidth = max(width + round(event.clientX - startX), 40);
					header.style.width = `${newWidth}px`;
					target.setAttribute('aria-valuenow', newWidth);
				};
				const handlePointerUp = (event) => {
					event.stopPropagation();
					target.removeEventListener('pointermove', handlePointerMove, true);
					target.removeEventListener('pointerup', handlePointerUp, true);
					target.removeEventListener('pointercancel', handlePointerUp, true);
					target.classList.remove('resizing');
					target.releasePointerCapture(event.pointerId);
					target.blur();
					if (event.type === 'pointerup') {
						onResize(max(width + round(event.clientX - startX), 40), header);
					} else {
						header.style.width = `${width}px`;
					}
				};
				target.addEventListener('pointermove', handlePointerMove, true);
				target.addEventListener('pointerup', handlePointerUp, true);
				target.addEventListener('pointercancel', handlePointerUp, true);
				target.setPointerCapture(event.pointerId);
				target.focus();
			},
			[onResize, width]
		);
		const Icon = sortOrder === 'a' ? ArrowUp : sortOrder === 'd' ? ArrowDown : ArrowsVertical;
		if (width !== undefined) {
			style = {...style, width: `${width}px`};
		}
		const resizeHandle = onResize && (
			<>
				<div
					className="Table__resizeHandle"
					tabIndex={0}
					role="slider"
					aria-label={t`Resize column`}
					aria-valuemin={40}
					aria-valuenow={width}
					onFocus={handleResizeFocus}
					onKeyDown={handleResizeKey}
					onPointerDown={handleResizePointer}
					onClick={stopEventPropagation}
				/>
				<div className="Table__resizeIndicator" />
			</>
		);
		return sortable ? (
			<th
				{...props}
				className={`Table--sortable${className ? ` ${className}` : ''}`}
				style={style}
				aria-sort={sortOrder === 'a' ? 'ascending' : sortOrder === 'd' ? 'descending' : null}
				ref={ref}>
				<button className={`Table__sort${sortOrder ? ' Table__sort--active' : ''}`} type="button">
					<div className={`Table__sortLabel Table--${align}`}>{children}</div>
					<Icon className="Table__sortIcon" />
				</button>
				{resizeHandle}
			</th>
		) : onResize ? (
			<th {...props} className={`Table--resizable${className ? ` ${className}` : ''}`} style={style}>
				<div className={`Table__resizableLabel Table--${align}`}>{children}</div>
				{resizeHandle}
			</th>
		) : (
			<th
				{...props}
				className={`Table--${align}${radio ? ' Table--radioHeader' : ''}${className ? ` ${className}` : ''}`}
				style={style}>
				{children}
			</th>
		);
	}
);

TableHeader.displayName = 'TableHeader';

TableHeader.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The column width in pixels. Required if `onResize` is set. If not specified the width can be set by other means or left as auto. */
	width: PropTypes.number,
	/** The alignment for text in the cell. */
	align: PropTypes.oneOf(['left', 'center', 'right']),
	/** Whether the table can be sorted by this column. */
	sortable: PropTypes.bool,
	/** The current sort order for this column. */
	sortOrder: PropTypes.oneOf(['a', 'd']),
	/** Whether this header is for a radio selection column. */
	radio: PropTypes.bool,
	/** CSS styles. */
	style: PropTypes.object,
	/** The child elements. */
	children: PropTypes.node,
	/** Function invoked when the column is resized. If specified the column becomes resizable. */
	onResize: PropTypes.func,
};

export default TableHeader;
