import {useCallback, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';
import identity from 'lodash-es/identity';
import {plural, t} from '@bluecateng/l10n.macro';
import Close from '@carbon/icons-react/es/Close';

import useRandomId from '../hooks/useRandomId';
import useLayer from '../hooks/useLayer';
import useStringFinder from '../hooks/useStringFinder';
import useSelectPositioner from '../hooks/useSelectPositioner';
import pageUp from '../functions/pageUp';
import pageDown from '../functions/pageDown';
import scrollToItem from '../functions/scrollToItem';
import Layer from '../components/Layer';
import SelectArrow from '../components/SelectArrow';
import CheckBox from '../components/CheckBox';

import './MultiSelect.less';
import '../components/Tag.less';

/** A multi-select drop-down. */
const MultiSelect = ({
	id,
	className,
	values,
	options,
	text,
	disabled,
	error,
	getOptionKey = identity,
	getOptionText = identity,
	onChange,
	...props
}) => {
	id = useRandomId(id);

	const [open, setOpen] = useState(false);
	const [focused, setFocused] = useState(-1);

	const buttonRef = useRef(null);
	const listRef = useRef(null);
	const liveRef = useRef(null);

	const level = useLayer();

	const renderedOptions = useMemo(
		() =>
			options.map((option) => {
				const selected = values && values.includes(option);
				const optionText = getOptionText(option);
				const element = (
					<CheckBox
						className="MultiSelect__check"
						label={<span className="MultiSelect__checkLabel">{optionText}</span>}
						checked={selected}
						tabIndex={-1}
					/>
				);

				return {
					value: option,
					key: getOptionKey(option),
					text: optionText.toUpperCase(),
					element,
					selected,
				};
			}),
		[getOptionKey, getOptionText, options, values]
	);

	const showList = useCallback(() => {
		setOpen(true);
		if (values && values.length) {
			// find the first selected option (values may not be in order)
			const index = options.findIndex((o) => values.includes(o));
			setFocused(index === -1 ? 0 : index);
		} else {
			setFocused(0);
		}
	}, [values, options]);

	const hideList = useCallback(() => {
		setOpen(false);
		setFocused(-1);
	}, []);

	const toggleValue = useCallback(
		(value) => {
			onChange(!values ? [value] : values.includes(value) ? values.filter((v) => v !== value) : [...values, value]);
		},
		[values, onChange]
	);

	const clearAll = useCallback(() => {
		if (values && values.length) {
			onChange([]);
		}
	}, [values, onChange]);

	const updateFocused = useCallback((index) => {
		setFocused(index);
		scrollToItem(listRef.current, listRef.current.children[index]);
	}, []);

	const findItemToFocus = useStringFinder();

	const handleMouseDown = useCallback(
		(event) => {
			if (disabled) {
				event.preventDefault();
			} else if (open) {
				hideList();
			} else {
				showList();
			}
		},
		[open, hideList, showList, disabled]
	);

	const handleKeyDown = useCallback(
		(event) => {
			if (!event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
				const key = event.key;
				switch (key) {
					case 'Enter':
					case ' ':
						event.preventDefault();
						event.nativeEvent.stopImmediatePropagation();
						if (open) {
							toggleValue(renderedOptions[focused].value);
						} else {
							showList();
						}
						break;
					case 'Escape':
						event.preventDefault();
						event.nativeEvent.stopImmediatePropagation();
						hideList();
						break;
					case 'Delete':
					case 'Backspace':
						if (!open) {
							event.preventDefault();
							event.nativeEvent.stopImmediatePropagation();
							if (values && values.length) {
								onChange([]);
								liveRef.current.textContent = t`The selection has been cleared`;
								setTimeout(() => {
									if (liveRef.current) liveRef.current.textContent = null;
								}, 5000);
							}
						}
						break;
					case 'PageUp':
						if (open) {
							event.preventDefault();
							event.nativeEvent.stopImmediatePropagation();
							setFocused(pageUp(listRef.current, focused));
						}
						break;
					case 'PageDown':
						if (open) {
							event.preventDefault();
							event.nativeEvent.stopImmediatePropagation();
							setFocused(pageDown(listRef.current, focused));
						}
						break;
					case 'End':
						if (open) {
							event.preventDefault();
							event.nativeEvent.stopImmediatePropagation();
							updateFocused(renderedOptions.length - 1);
						}
						break;
					case 'Home':
						if (open) {
							event.preventDefault();
							event.nativeEvent.stopImmediatePropagation();
							updateFocused(0);
						}
						break;
					case 'ArrowUp': {
						event.preventDefault();
						event.nativeEvent.stopImmediatePropagation();
						if (open) {
							updateFocused(focused > 0 ? focused - 1 : renderedOptions.length - 1);
						}
						break;
					}
					case 'ArrowDown': {
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
						if (/^\w$/.test(key)) {
							event.preventDefault();
							event.nativeEvent.stopImmediatePropagation();
							const current = open ? focused : values && values.length ? options.indexOf(values[0]) : 0;
							const i = findItemToFocus(key, current, renderedOptions.length, (index) => renderedOptions[index].text);
							if (i !== -1) {
								if (open) {
									updateFocused(i);
								} else {
									// toggle immediately when closed and user types
									toggleValue(renderedOptions[i].value);
								}
							}
						}
						break;
				}
			}
		},
		[
			findItemToFocus,
			focused,
			hideList,
			onChange,
			open,
			options,
			renderedOptions,
			showList,
			toggleValue,
			updateFocused,
			values,
		]
	);

	const handleBlur = useCallback(
		(event) => {
			if (listRef.current?.contains(event.relatedTarget)) {
				buttonRef.current.focus();
			} else {
				hideList();
			}
		},
		[hideList]
	);

	const handleListMouseDown = useCallback((event) => event.preventDefault(), []);

	const handleListMouseUp = useCallback(
		(event) => {
			const element = event.target.closest('[role="option"]');
			if (element) {
				event.preventDefault();
				const index = +element.dataset.index;
				const option = renderedOptions[index];
				toggleValue(option.value);
			}
		},
		[renderedOptions, toggleValue]
	);

	useSelectPositioner(open, buttonRef, listRef);

	useLayoutEffect(() => {
		if (open) {
			const list = listRef.current;
			const child = list.children[focused];
			if (child) scrollToItem(list, child);
			const themeElement = buttonRef.current.closest('[data-theme]');
			if (themeElement) {
				list.dataset.theme = themeElement.dataset.theme;
			}
		}
	}, [open, focused]);

	const listId = `${id}-list`;
	const hasSelection = values && values.length !== 0;

	return (
		<>
			<Layer
				{...props}
				id={id}
				className={`MultiSelect${className ? ` ${className}` : ''}`}
				tabIndex={disabled ? -1 : 0}
				role="combobox"
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-owns={open ? listId : null}
				aria-activedescendant={focused === -1 ? null : `${id}-${focused}`}
				aria-disabled={disabled}
				aria-invalid={error}
				ref={buttonRef}
				onKeyDown={disabled ? undefined : handleKeyDown}
				onBlur={handleBlur}>
				{hasSelection && (
					<div className="Tag Tag--md Tag--high-contrast Tag--removable MultiSelect__tag">
						<span title={values.length}>
							<span aria-hidden>{values.length}</span>
							<span className="sr-only">{t`${plural(values.length, {one: '1 item selected', other: '# items selected'})}, press Delete to clear selection.`}</span>
						</span>
						<button
							className="Tag__remove"
							type="button"
							tabIndex={-1}
							disabled={disabled}
							aria-hidden
							onClick={clearAll}>
							<Close />
						</button>
					</div>
				)}
				<div className="MultiSelect__textWrapper" onMouseDown={handleMouseDown}>
					<span className="MultiSelect__text">{text}</span>
					<SelectArrow className="MultiSelect__arrow" open={open} />
				</div>
				<div className="sr-only" aria-live="polite" ref={liveRef} />
			</Layer>
			{open &&
				createPortal(
					<Layer
						id={listId}
						className="MultiSelect__list"
						level={level + 1}
						role="listbox"
						aria-multiselectable="true"
						ref={listRef}
						onMouseDown={handleListMouseDown}
						onMouseUp={handleListMouseUp}>
						{renderedOptions.map((o, index) => (
							<div
								key={o.key}
								id={`${id}-${index}`}
								className={`MultiSelect__option${index === focused ? ' MultiSelect__option--focused' : ''}`}
								role="option"
								aria-selected={o.selected}
								data-index={index}>
								{o.element}
							</div>
						))}
					</Layer>,
					document.fullscreenElement || document.body
				)}
		</>
	);
};

MultiSelect.propTypes = {
	/** The component ID. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The selected values. */
	values: PropTypes.array,
	/** The list of options. */
	options: PropTypes.array.isRequired,
	/** The text to display in the content. */
	text: PropTypes.string,
	/** Whether the component is disabled. */
	disabled: PropTypes.bool,
	/** Whether the component is in error. */
	error: PropTypes.bool,
	/** Function invoked to get the key of each option. */
	getOptionKey: PropTypes.func,
	/** Function invoked to get the text of each option. */
	getOptionText: PropTypes.func,
	/** Function invoked when the selected values change. */
	onChange: PropTypes.func.isRequired,
};

export default MultiSelect;
