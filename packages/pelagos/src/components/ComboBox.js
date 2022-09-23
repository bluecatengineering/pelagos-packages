import {cloneElement, useRef, useCallback, useEffect, useState, useMemo} from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';
import debounce from 'lodash-es/debounce';
import {t} from '@bluecateng/l10n.macro';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

import scrollToItem from '../functions/scrollToItem';

import Layer from './Layer';
import IconButton from './IconButton';
import './ComboBox.less';

/** A combination box of a text field and an autocomplete list. */
const ComboBox = ({
	id,
	autoSelect,
	text,
	error,
	getSuggestions,
	renderSuggestion,
	onChange,
	onEnter,
	onTextChange,
	...props
}) => {
	const buttonRef = useRef(null);
	const listRef = useRef(null);

	const [suggestions, setSuggestions] = useState([]);
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState(-1);

	const debouncedChange = useMemo(() => debounce(onTextChange, 33), [onTextChange]);

	const hideList = useCallback(() => (setSuggestions([]), setOpen(false), setSelected(-1)), []);

	const updateSuggestions = useMemo(
		() =>
			debounce(
				(text) =>
					Promise.resolve(getSuggestions(text)).then((suggestions) => {
						if (suggestions.length === 0) {
							hideList();
						} else {
							setSuggestions(suggestions);
							setOpen(true);
							setSelected(autoSelect ? 0 : -1);
						}
					}),
				150
			),
		[hideList, autoSelect, getSuggestions]
	);
	const selectSuggestion = useCallback(
		(index) => (hideList(), onChange(suggestions[index])),
		[suggestions, hideList, onChange]
	);

	const handleKeyDown = useCallback(
		(event) => {
			switch (event.keyCode) {
				case 13: // enter
					event.preventDefault();
					if (selected !== -1) {
						selectSuggestion(selected);
					} else if (onEnter) {
						debouncedChange.flush();
						hideList();
						onEnter(event.target.value);
					}
					break;
				case 27: // escape
					event.preventDefault();
					debouncedChange.cancel();
					hideList();
					onTextChange('');
					break;
				case 38: // up
					event.preventDefault();
					if (open) {
						const index = selected <= 0 ? suggestions.length - 1 : selected - 1;
						setSelected(index);
						scrollToItem(listRef.current, listRef.current.children[index]);
					}
					break;
				case 40: // down
					event.preventDefault();
					if (open) {
						const index = selected === -1 || selected === suggestions.length - 1 ? 0 : selected + 1;
						setSelected(index);
						scrollToItem(listRef.current, listRef.current.children[index]);
					}
					break;
			}
		},
		[debouncedChange, hideList, onEnter, onTextChange, open, selectSuggestion, selected, suggestions.length]
	);

	const handleChange = useCallback((event) => debouncedChange(event.target.value), [debouncedChange]);

	const handleFocus = useCallback(
		() => (suggestions.length !== 0 ? (setOpen(true), setSelected(autoSelect ? 0 : -1)) : null),
		[suggestions, autoSelect]
	);

	const handleBlur = useCallback(() => setOpen(false), []);

	const handleAddClick = useCallback(() => {
		const input = document.getElementById(id);
		input.focus();
		debouncedChange.flush();
		onEnter(input.value);
	}, [debouncedChange, id, onEnter]);

	const handleListMouseDown = useCallback((event) => event.preventDefault(), []);

	const handleListMouseUp = useCallback(
		(event) => {
			const element = event.target.closest('[role=option]');
			if (element) {
				event.preventDefault();
				selectSuggestion(+element.dataset.index);
			}
		},
		[selectSuggestion]
	);

	useEffect(() => {
		if (error || !text || text[0] === '/') {
			hideList();
			updateSuggestions.cancel();
		} else {
			updateSuggestions(text);
		}
		return updateSuggestions.cancel;
	}, [hideList, updateSuggestions, text, error]);

	useEffect(() => {
		if (open) {
			const button = buttonRef.current;
			const {bottom, left, width} = button.getBoundingClientRect();

			const list = listRef.current;
			list.style.top = `${bottom}px`;
			list.style.left = `${left}px`;
			list.style.width = `${width}px`;
			list.dataset.layer = button.dataset.layer;
		}
	}, [open]);

	const listId = `${id}-list`;
	return (
		<Layer className="ComboBox" ref={buttonRef}>
			<input
				{...props}
				id={id}
				className={`ComboBox__input${error ? ' ComboBox--error' : ''}`}
				autoComplete="off"
				role="combobox"
				aria-expanded={open}
				aria-autocomplete="list"
				aria-controls={listId}
				aria-activedescendant={selected === -1 ? null : `${id}-${selected}`}
				value={text}
				onKeyDown={handleKeyDown}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
			{!autoSelect && (
				<IconButton
					id={`${id}-add`}
					className="ComboBox__add"
					icon={faPlus}
					aria-label={t`Add`}
					disabled={!text}
					onClick={handleAddClick}
				/>
			)}
			{createPortal(
				<div
					id={listId}
					className="ComboBox__list"
					role="listbox"
					aria-label={t`Options`}
					style={{display: open ? null : 'none'}}
					ref={listRef}
					onMouseDown={handleListMouseDown}
					onMouseUp={handleListMouseUp}
				>
					{suggestions.map((item, index) => {
						const element = renderSuggestion(item, index);
						return cloneElement(element, {
							key: index,
							id: `${id}-${index}`,
							role: 'option',
							className: `ComboBox__option ${element.props.className}`,
							'aria-selected': selected === index,
							'data-index': index,
						});
					})}
				</div>,
				document.body
			)}
		</Layer>
	);
};

ComboBox.propTypes = {
	/** The component id. */
	id: PropTypes.string.isRequired,
	/** The placeholder text. */
	placeholder: PropTypes.string,
	/** Whether the first suggestion is selected by default. */
	autoSelect: PropTypes.bool,
	/** The input field text. */
	text: PropTypes.string,
	/** Whether the component is disabled. */
	disabled: PropTypes.bool,
	/** Whether the component is in error. */
	error: PropTypes.bool,
	/** Function invoked to get suggestions based on text input, can return a promise. */
	getSuggestions: PropTypes.func,
	/** Function invoked to render suggestions. */
	renderSuggestion: PropTypes.func,
	/** Function invoked when a suggestion is selected. */
	onChange: PropTypes.func,
	/** Function invoked when the enter key is pressed. */
	onEnter: PropTypes.func,
	/** Function invoked when the text input is changed. */
	onTextChange: PropTypes.func,
};

export default ComboBox;
