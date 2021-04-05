import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';
import identity from 'lodash-es/identity';
import {smoothScroll, scrollToItem} from '@bluecat/helpers';
import {faCaretDown, faCaretUp} from '@fortawesome/free-solid-svg-icons';

import SvgIcon from './SvgIcon';
import './Select.less';

const findInRange = (string, list, start, end) => {
	for (let i = start; i < end; ++i) {
		if (list[i].textContent.toUpperCase().startsWith(string)) {
			return i;
		}
	}
	return -1;
};

/** A select drop-down. */
const Select = ({
	id,
	className,
	value,
	options,
	placeholder,
	disabled,
	error,
	getOptionKey,
	renderOption,
	onChange,
	...props
}) => {
	const [open, setOpen] = useState(false);
	const [focused, setFocused] = useState(-1);

	const renderedOptions = useMemo(
		() =>
			options.map((option) => ({
				value: option,
				key: getOptionKey(option),
				element: renderOption(option),
			})),
		[options, getOptionKey, renderOption]
	);

	const buttonRef = useRef(null);
	const listRef = useRef(null);
	const searchString = useRef(null);
	const searchIndex = useRef(-1);
	const keyTimer = useRef(null);

	const showList = useCallback(() => {
		setOpen(true);
		setFocused(value ? options.indexOf(value) : 0);
	}, [value, options]);

	const hideList = useCallback(() => {
		setOpen(false);
		setFocused(-1);
	}, []);

	const select = useCallback(
		(value) => {
			hideList();
			onChange(value);
		},
		[hideList, onChange]
	);

	const updateFocused = useCallback((index) => {
		setFocused(index);
		scrollToItem(listRef.current, listRef.current.children[index]);
	}, []);

	const findItemToFocus = useCallback(
		(keyCode) => {
			const char = String.fromCharCode(keyCode);
			if (!searchString.current) {
				searchString.current = char;
				searchIndex.current = focused;
			} else {
				searchString.current += char;
			}

			if (keyTimer.current) {
				clearTimeout(keyTimer.current);
			}
			keyTimer.current = setTimeout(() => {
				searchString.current = null;
				keyTimer.current = null;
			}, 500);

			const children = listRef.current.children;
			let result = findInRange(searchString.current, children, searchIndex.current + 1, children.length);
			if (result === -1) {
				result = findInRange(searchString.current, children, 0, searchIndex.current);
			}
			return result;
		},
		[focused]
	);

	const handleMouseDown = useCallback(
		(event) => {
			event.preventDefault();
			if (open) {
				hideList();
			} else {
				showList();
				event.target.closest('[role="button"]').focus();
			}
		},
		[open, hideList, showList]
	);

	const handleKeyDown = useCallback(
		(event) => {
			if (!event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
				const keyCode = event.keyCode;
				switch (keyCode) {
					case 13: // enter
					case 32: // space
						event.preventDefault();
						event.nativeEvent.stopImmediatePropagation();
						if (open) {
							select(renderedOptions[focused].value);
						} else {
							showList();
						}
						break;
					case 27: // escape
						event.preventDefault();
						event.nativeEvent.stopImmediatePropagation();
						hideList();
						break;
					case 33: // page up
						if (open) {
							event.preventDefault();
							event.nativeEvent.stopImmediatePropagation();
							let i;
							const listElement = listRef.current;
							const listHeight = listElement.clientHeight;
							const scrollTop = listElement.scrollTop;
							if (scrollTop > 0) {
								const optionHeight = listElement.children[0].offsetHeight;
								const count = Math.floor(listHeight / optionHeight);
								i = Math.max(0, focused - count);
								const offset = Math.max(-optionHeight * count, -scrollTop);
								smoothScroll(listElement, scrollTop, offset, 150);
							} else {
								i = 0;
							}
							setFocused(i);
						}
						break;
					case 34: // page down
						if (open) {
							event.preventDefault();
							event.nativeEvent.stopImmediatePropagation();
							let i;
							const listElement = listRef.current;
							const listHeight = listElement.clientHeight;
							const scrollTop = listElement.scrollTop;
							const scrollMax = listElement.scrollHeight - listHeight;
							if (scrollTop < scrollMax) {
								const optionHeight = listElement.children[0].offsetHeight;
								const count = Math.floor(listHeight / optionHeight);
								i = Math.min(renderedOptions.length - 1, focused + count);
								const offset = Math.min(optionHeight * count, scrollMax - scrollTop);
								smoothScroll(listElement, scrollTop, offset, 150);
							} else {
								i = renderedOptions.length - 1;
							}
							setFocused(i);
						}
						break;
					case 35: // end
						if (open) {
							event.preventDefault();
							event.nativeEvent.stopImmediatePropagation();
							updateFocused(renderedOptions.length - 1);
						}
						break;
					case 36: // home
						if (open) {
							event.preventDefault();
							event.nativeEvent.stopImmediatePropagation();
							updateFocused(0);
						}
						break;
					case 38: {
						// up
						event.preventDefault();
						event.nativeEvent.stopImmediatePropagation();
						if (open) {
							updateFocused(focused > 0 ? focused - 1 : renderedOptions.length - 1);
						}
						break;
					}
					case 40: {
						// down
						event.preventDefault();
						event.nativeEvent.stopImmediatePropagation();
						if (open) {
							updateFocused(focused < renderedOptions.length - 1 ? focused + 1 : 0);
						} else {
							showList();
						}
						break;
					}
					default:
						if (open && keyCode >= 48 && keyCode <= 90) {
							event.preventDefault();
							event.nativeEvent.stopImmediatePropagation();
							const i = findItemToFocus(keyCode);
							if (i !== -1) {
								updateFocused(i);
							}
						}
						break;
				}
			}
		},
		[open, focused, select, renderedOptions, updateFocused, findItemToFocus, showList, hideList]
	);

	const handleBlur = useCallback(() => hideList(), [hideList]);

	const handleListMouseDown = useCallback((event) => event.preventDefault(), []);

	const handleListMouseUp = useCallback(
		(event) => {
			const element = event.target.closest('[role="option"]');
			if (element) {
				event.preventDefault();
				select(renderedOptions[+element.dataset.index].value);
			}
		},
		[select, renderedOptions]
	);

	useEffect(() => {
		if (open) {
			const {bottom, left, width} = buttonRef.current.getBoundingClientRect();

			const list = listRef.current;
			list.style.display = '';
			list.style.top = `${bottom + 2}px`;
			list.style.left = `${left}px`;
			list.style.width = `${width}px`;
		}
	}, [open]);

	useEffect(() => {
		if (open) {
			scrollToItem(listRef.current, listRef.current.children[focused]);
		}
	}, [open, focused]);

	const listId = `${id}-list`;
	const selected = value && renderedOptions.find((o) => o.value === value);
	return (
		<div className={`Select${className ? ` ${className}` : ''}`} ref={buttonRef}>
			<div
				{...props}
				id={id}
				className={`Select__text${selected ? '' : ' Select__text--empty'}${error ? ' Select__text--error' : ''}`}
				tabIndex={disabled ? undefined : '0'}
				role="button"
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-disabled={disabled}
				aria-owns={open ? listId : null}
				aria-activedescendant={focused === -1 ? null : `${id}-${focused}`}
				data-placeholder={placeholder}
				onMouseDown={disabled ? undefined : handleMouseDown}
				onKeyDown={disabled ? undefined : handleKeyDown}
				onBlur={handleBlur}>
				{selected ? selected.element : ''}
				<SvgIcon icon={open ? faCaretUp : faCaretDown} className="Select__icon" />
			</div>
			{open &&
				createPortal(
					<div
						id={listId}
						className="Select__list"
						role="listbox"
						style={{display: 'none'}}
						ref={listRef}
						onMouseDown={handleListMouseDown}
						onMouseUp={handleListMouseUp}>
						{renderedOptions.map((o, index) => (
							<div
								key={o.key}
								id={`${id}-${index}`}
								className={`Select__option${index === focused ? ' Select__option--focused' : ''}`}
								role="option"
								aria-selected={o.value === value}
								data-index={index}>
								{o.element}
							</div>
						))}
					</div>,
					document.body
				)}
		</div>
	);
};

Select.propTypes = {
	/** The component ID. */
	id: PropTypes.string.isRequired,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The value of the selected option. */
	value: PropTypes.any,
	/** The list of options. */
	options: PropTypes.array.isRequired,
	/** The placeholder text. */
	placeholder: PropTypes.string,
	/** Whether the component is disabled. */
	disabled: PropTypes.bool,
	/** Whether the component is in error. */
	error: PropTypes.bool,
	/** Function invoked to get the key of each option. */
	getOptionKey: PropTypes.func,
	/** Function invoked to render each option. */
	renderOption: PropTypes.func.isRequired,
	/** Function invoked when the selected option changes. */
	onChange: PropTypes.func.isRequired,
};

Select.defaultProps = {
	getOptionKey: identity,
};

export default Select;
