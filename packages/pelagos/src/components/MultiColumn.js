import {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {select, t} from '@bluecateng/l10n.macro';
import CaretRight from '@carbon/icons-react/es/CaretRight';

import useStringFinder from '../hooks/useStringFinder';
import useRandomId from '../hooks/useRandomId';
import addResizeObserver from '../functions/addResizeObserver';
import animate from '../functions/animate';
import pageUp from '../functions/pageUp';
import pageDown from '../functions/pageDown';
import scrollToItem from '../functions/scrollToItem';

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

const renderElements = (id, path, colIndex, column, count, isLeaf, colCurr, itmCurr, renderItem) => {
	const itmPath = path.slice(0, colIndex);
	const elements = [];
	for (let itmIndex = 0; itmIndex < count; ++itmIndex) {
		itmPath[colIndex] = itmIndex;
		const leaf = isLeaf(itmPath);
		const text = renderItem(itmPath);
		elements.push(
			<div
				key={itmIndex}
				id={`${id}-${colIndex}-${itmIndex}`}
				className="MultiColumn__item"
				tabIndex={colIndex === colCurr && itmIndex === itmCurr ? 0 : -1}
				role="option"
				aria-label={t`${text}, column ${column}, ${select(leaf, {true: 'leaf', other: 'group'})}`}
				aria-selected={itmIndex === path[colIndex]}
				data-index={itmIndex}>
				<div className="MultiColumn__text">{text}</div>
				{!leaf && <CaretRight className="MultiColumn__arrow" />}
			</div>
		);
	}
	return elements;
};

/** A component which presents a tree path as multiple columns. */
const MultiColumn = ({
	id,
	className,
	path,
	colWidth = '12em',
	emptyText,
	getItemCount,
	isLeaf,
	renderItem,
	onChange,
	...props
}) => {
	id = useRandomId(id);
	const rootRef = useRef();
	const liveRef = useRef();
	const [focused, setFocused] = useState(false);

	const columns = useDataLoader(path, getItemCount, isLeaf);

	const findItemToFocus = useStringFinder();

	const handleMouseDown = useCallback(
		(event) => {
			const element = event.target.closest('[role="option"]');
			if (element) {
				event.preventDefault();
				const column = element.parentNode;
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
				const key = event.key;
				switch (key) {
					case 'PageUp': {
						event.preventDefault();
						const newPath = path.slice(0, -1);
						const lastIndex = newPath.length;
						newPath.push(pageUp(rootRef.current.children[lastIndex], path[lastIndex]));
						onChange(newPath);
						break;
					}
					case 'PageDown': {
						event.preventDefault();
						const newPath = path.slice(0, -1);
						const lastIndex = newPath.length;
						newPath.push(pageDown(rootRef.current.children[lastIndex], path[lastIndex]));
						onChange(newPath);
						break;
					}
					case 'End': {
						event.preventDefault();
						const newPath = path.slice(0, -1);
						newPath.push(columns[newPath.length] - 1);
						onChange(newPath);
						break;
					}
					case 'Home': {
						event.preventDefault();
						const newPath = path.slice(0, -1);
						newPath.push(0);
						onChange(newPath);
						break;
					}
					case 'ArrowLeft': {
						event.preventDefault();
						if (path.length > 1) {
							onChange(path.slice(0, -1));
						}
						break;
					}
					case 'ArrowUp': {
						event.preventDefault();
						const newPath = path.slice(0, -1);
						const index = path[newPath.length];
						newPath.push(index === 0 ? columns[newPath.length] - 1 : index - 1);
						onChange(newPath);
						break;
					}
					case 'ArrowRight': {
						event.preventDefault();
						if (path.length < columns.length) {
							onChange([...path, 0]);
						}
						break;
					}
					case 'ArrowDown': {
						event.preventDefault();
						const newPath = path.slice(0, -1);
						const index = path[newPath.length];
						newPath.push(index === columns[newPath.length] - 1 ? 0 : index + 1);
						onChange(newPath);
						break;
					}
					default:
						if (/^\w$/.test(key)) {
							event.preventDefault();
							const column = path.length - 1;
							const children = rootRef.current.children[column].children;
							const i = findItemToFocus(key, path[column], children.length, (i) =>
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

	const handleFocus = useCallback((event) => {
		if (!rootRef.current.contains(event.relatedTarget)) {
			liveRef.current.textContent = t`Use cursor keys to select an item`;
			setFocused(true);
		}
	}, []);
	const handleBlur = useCallback((event) => {
		if (!rootRef.current.contains(event.relatedTarget)) {
			liveRef.current.textContent = null;
			setFocused(false);
		}
	}, []);

	useEffect(() => {
		if (focused) {
			const pathLength = path.length;
			const children = rootRef.current.childNodes;
			if (pathLength !== 0 && pathLength <= children.length) {
				const column = pathLength - 1;
				children[column].childNodes[path[column]].focus();
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
			{columns.map((count, colIndex) => {
				const column = colIndex + 1;
				return (
					<div
						key={colIndex}
						className="MultiColumn__column"
						style={{width: colWidth}}
						tabIndex={-1}
						role="listbox"
						aria-label={t`Column ${column} of ${columnCount}`}
						data-index={colIndex}>
						{count === -1 ? (
							<Spinner size="tiny" aria-hidden />
						) : (
							renderElements(id, path, colIndex, column, count, isLeaf, colCurr, itmCurr, renderItem)
						)}
					</div>
				);
			})}
			<div className="sr-only" aria-live="polite" ref={liveRef} />
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

export default MultiColumn;
