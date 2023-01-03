import {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';
import {faCaretRight} from '@fortawesome/free-solid-svg-icons';

import useStringFinder from '../hooks/useStringFinder';
import useRandomId from '../hooks/useRandomId';
import addResizeObserver from '../functions/addResizeObserver';
import animate from '../functions/animate';
import pageUp from '../functions/pageUp';
import pageDown from '../functions/pageDown';
import scrollToItem from '../functions/scrollToItem';

import SvgIcon from './SvgIcon';
import Spinner from './Spinner';
import './MultiColumn.less';

const {min} = Math;

const scrollSelected = (element, path) => {
	const columns = element.children;
	const nCols = columns.length;
	const n = min(path.length, nCols);

	// scroll vertically
	for (let i = 0; i < n; ++i) {
		const column = columns[i];
		scrollToItem(column, column.children[path[i]]);
	}

	// scroll horizontally
	if (!element.busy) {
		const er = element.getBoundingClientRect();
		const cr = columns[nCols - 1].getBoundingClientRect();
		if (cr.right > er.right) {
			const initialLeft = element.scrollLeft;
			const offset = element.scrollWidth - er.width - initialLeft;
			element.busy = true;
			animate(
				150,
				(current) => (element.scrollLeft = initialLeft + current * offset),
				() => (element.busy = false)
			);
		}
	}
};

export const useDataLoader = (path, getItemCount, isLeaf) => {
	const columnsRef = useRef();
	const previousPathRef = useRef([]);
	const [, setUpdateCount] = useState(0);

	const loadColumn = (columns, index) => {
		columns.push(-1);
		Promise.resolve(getItemCount(index)).then((count) => {
			columns[index] = count;
			setUpdateCount((n) => n + 1);
			const next = index + 1;
			if (next <= pathLength && !isLeaf(path.slice(0, next))) {
				loadColumn(columns, next);
			}
		});
	};

	if (path === previousPathRef.current) {
		return columnsRef.current;
	}

	const previousPath = previousPathRef.current;
	previousPathRef.current = path;
	const pathLength = path.length;
	if (pathLength === 0) {
		columnsRef.current = null;
		return null;
	}

	const previousPathLength = previousPath.length;
	if (previousPathLength === 0) {
		const columns = [];
		columnsRef.current = columns;
		loadColumn(columns, 0);
		return columns;
	}

	const n = min(pathLength, previousPathLength);
	let index = 0;
	while (index < n && previousPath[index] === path[index]) {
		++index;
	}
	++index;
	const previousColumns = columnsRef.current;
	const columns = index < previousColumns.length ? previousColumns.slice(0, index) : previousColumns;
	columnsRef.current = columns;
	if (index <= pathLength && !isLeaf(path.slice(0, index))) {
		loadColumn(columns, index);
	}
	return columns;
};

/** A component which presents a tree path as multiple columns. */
const MultiColumn = ({
	id,
	className,
	path,
	colWidth,
	emptyText,
	getItemCount,
	isLeaf,
	renderItem,
	onChange,
	...props
}) => {
	id = useRandomId(id);
	const rootRef = useRef();
	const [focused, setFocused] = useState(false);

	const columns = useDataLoader(path, getItemCount, isLeaf);

	const findItemToFocus = useStringFinder();

	const handleMouseDown = useCallback(
		(event) => {
			const element = event.target.closest('[role="option"]');
			if (element) {
				event.preventDefault();
				const column = element.parentNode;
				column.focus();
				const newPath = path.slice(0, +column.dataset.index);
				newPath.push(+element.dataset.index);
				onChange(newPath);
			}
		},
		[path, onChange]
	);

	const handleKeyDown = useCallback(
		(event) => {
			if (!event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
				const keyCode = event.keyCode;
				switch (keyCode) {
					case 33: {
						// page up
						event.preventDefault();
						const newPath = path.slice(0, -1);
						const lastIndex = newPath.length;
						newPath.push(pageUp(rootRef.current.children[lastIndex], path[lastIndex]));
						onChange(newPath);
						break;
					}
					case 34: {
						// page down
						event.preventDefault();
						const newPath = path.slice(0, -1);
						const lastIndex = newPath.length;
						newPath.push(pageDown(rootRef.current.children[lastIndex], path[lastIndex]));
						onChange(newPath);
						break;
					}
					case 35: {
						// end
						event.preventDefault();
						const newPath = path.slice(0, -1);
						newPath.push(columns[newPath.length] - 1);
						onChange(newPath);
						break;
					}
					case 36: {
						// home
						event.preventDefault();
						const newPath = path.slice(0, -1);
						newPath.push(0);
						onChange(newPath);
						break;
					}
					case 37: {
						// left
						event.preventDefault();
						if (path.length > 1) {
							onChange(path.slice(0, -1));
						}
						break;
					}
					case 38: {
						// up
						event.preventDefault();
						const newPath = path.slice(0, -1);
						const index = path[newPath.length];
						newPath.push(index === 0 ? columns[newPath.length] - 1 : index - 1);
						onChange(newPath);
						break;
					}
					case 39: {
						// right
						event.preventDefault();
						if (path.length < columns.length) {
							onChange([...path, 0]);
						}
						break;
					}
					case 40: {
						// down
						event.preventDefault();
						const newPath = path.slice(0, -1);
						const index = path[newPath.length];
						newPath.push(index === columns[newPath.length] - 1 ? 0 : index + 1);
						onChange(newPath);
						break;
					}
					default:
						if (keyCode >= 48 && keyCode <= 90) {
							event.preventDefault();
							const column = path.length - 1;
							const children = rootRef.current.children[column].children;
							const i = findItemToFocus(keyCode, path[column], children.length, (i) =>
								children[i].textContent.toUpperCase()
							);
							if (i !== -1) {
								const newPath = path.slice(0, -1);
								newPath.push(i);
								onChange(newPath);
							}
						}
						break;
				}
			}
		},
		[columns, findItemToFocus, onChange, path]
	);

	const handleFocus = useCallback(() => setFocused(true), []);
	const handleBlur = useCallback(() => setFocused(false), []);

	useEffect(() => {
		if (focused) {
			const pathLength = path.length;
			const children = rootRef.current.children;
			if (pathLength !== 0 && pathLength <= children.length) {
				children[pathLength - 1].focus();
			}
		}
	}, [path, focused]);

	useEffect(() => {
		scrollSelected(rootRef.current, path);
	}, [path]);

	useEffect(() => addResizeObserver(rootRef.current, () => scrollSelected(rootRef.current, path)), [path]);

	const pathLength = path.length;
	if (pathLength === 0) {
		return (
			<div {...props} className={`MultiColumn__empty${className ? ` ${className}` : ''}`} ref={rootRef}>
				<div>{emptyText}</div>
			</div>
		);
	}

	const columnCount = columns.length;
	const colCurr = pathLength - 1;
	const itmCurr = path[colCurr];
	return (
		<div
			{...props}
			id={id}
			className={`MultiColumn${className ? ` ${className}` : ''}`}
			role="group"
			onMouseDown={handleMouseDown}
			onKeyDown={handleKeyDown}
			onFocus={handleFocus}
			onBlur={handleBlur}
			ref={rootRef}>
			{columns.map((count, colIndex) => (
				<div
					key={colIndex}
					className="MultiColumn__column"
					style={{width: colWidth}}
					tabIndex={colIndex === colCurr ? 0 : -1}
					role="listbox"
					aria-hidden={colIndex !== colCurr}
					aria-label={t`Column ${colIndex + 1} of ${columnCount}`}
					aria-activedescendant={count !== -1 && pathLength > colIndex ? `${id}-${colIndex}-${path[colIndex]}` : null}
					data-index={colIndex}>
					{count === -1 ? (
						<Spinner size="tiny" />
					) : (
						do {
							const itmPath = path.slice(0, colIndex);
							const elements = [];
							for (let itmIndex = 0; itmIndex < count; ++itmIndex) {
								itmPath[colIndex] = itmIndex;
								elements.push(
									<div
										key={itmIndex}
										id={`${id}-${colIndex}-${itmIndex}`}
										className={`MultiColumn__item${itmIndex === path[colIndex] ? ' MultiColumn__selected' : ''}`}
										role="option"
										aria-selected={focused && colIndex === colCurr && itmIndex === itmCurr}
										data-index={itmIndex}>
										<div className="MultiColumn__text">{renderItem(itmPath)}</div>
										{!isLeaf(itmPath) && <SvgIcon className="MultiColumn__arrow" icon={faCaretRight} />}
									</div>
								);
							}
							elements;
						}
					)}
				</div>
			))}
		</div>
	);
};

MultiColumn.propTypes = {
	/** The component ID. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The selected path. */
	path: PropTypes.array.isRequired,
	/** The column width (css length). */
	colWidth: PropTypes.string,
	/** The text to display when there is no data. */
	emptyText: PropTypes.string,
	/** Function invoked to get the number of items for each column. */
	getItemCount: PropTypes.func,
	/** Function invoked to check if an item is a leaf. */
	isLeaf: PropTypes.func,
	/** Function invoked to render each list item. */
	renderItem: PropTypes.func,
	/** Function invoked when the selection changes. */
	onChange: PropTypes.func,
};

MultiColumn.defaultProps = {
	colWidth: '12em',
};

export default MultiColumn;
