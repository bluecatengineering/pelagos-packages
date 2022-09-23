import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';
import identity from 'lodash-es/identity';

import useStringFinder from '../hooks/useStringFinder';
import pageUp from '../functions/pageUp';
import pageDown from '../functions/pageDown';
import scrollToItem from '../functions/scrollToItem';

import Layer from './Layer';
import SelectArrow from './SelectArrow';

import './Select.less';

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

	const findItemToFocus = useStringFinder();

	const handleMouseDown = useCallback(() => {
		if (open) {
			hideList();
		} else {
			showList();
		}
	}, [open, hideList, showList]);

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
							setFocused(pageUp(listRef.current, focused));
						}
						break;
					case 34: // page down
						if (open) {
							event.preventDefault();
							event.nativeEvent.stopImmediatePropagation();
							setFocused(pageDown(listRef.current, focused));
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
							const children = listRef.current.children;
							const i = findItemToFocus(keyCode, focused, children.length, (i) =>
								children[i].textContent.toUpperCase()
							);
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
			const button = buttonRef.current;
			const {bottom, left, width} = button.getBoundingClientRect();

			const list = listRef.current;
			list.style.top = `${bottom + 1}px`;
			list.style.left = `${left}px`;
			list.style.width = `${width}px`;
			list.dataset.layer = button.dataset.layer;
		}
	}, [open]);

	useEffect(() => {
		if (open) {
			scrollToItem(listRef.current, listRef.current.children[focused]);
		}
	}, [open, focused]);

	const listId = `${id}-list`;
	const selected = renderedOptions.find((o) => o.value === value);
	return (
		<Layer className={`Select${className ? ` ${className}` : ''}`} ref={buttonRef}>
			<button
				{...props}
				id={id}
				className={`Select__text${selected ? '' : ' Select__text--empty'}${error ? ' Select__text--error' : ''}`}
				type="button"
				disabled={disabled}
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-owns={open ? listId : null}
				aria-activedescendant={focused === -1 ? null : `${id}-${focused}`}
				data-placeholder={placeholder}
				onMouseDown={disabled ? undefined : handleMouseDown}
				onKeyDown={disabled ? undefined : handleKeyDown}
				onBlur={handleBlur}
			>
				{selected ? selected.element : ''}
				<SelectArrow className={`Select__arrow${open ? ' Select__arrow--open' : ''}`} />
			</button>
			{open &&
				createPortal(
					<div
						id={listId}
						className="Select__list"
						role="listbox"
						ref={listRef}
						onMouseDown={handleListMouseDown}
						onMouseUp={handleListMouseUp}
					>
						{renderedOptions.map((o, index) => (
							<div
								key={o.key}
								id={`${id}-${index}`}
								className="Select__option"
								role="option"
								aria-selected={index === focused}
								data-index={index}
							>
								{o.element}
							</div>
						))}
					</div>,
					document.body
				)}
		</Layer>
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
