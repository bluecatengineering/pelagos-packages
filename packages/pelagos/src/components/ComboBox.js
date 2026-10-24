import {cloneElement, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';
import debounce from 'lodash-es/debounce';
import {t} from '@bluecateng/l10n.macro';
import AddLarge from '@carbon/icons-react/es/AddLarge';

import scrollToItem from '../functions/scrollToItem';
import useLayer from '../hooks/useLayer';
import useSelectPositioner from '../hooks/useSelectPositioner';
import useRandomId from '../hooks/useRandomId';
import defaultRenderSuggestion from '../suggestions/renderSuggestion';

import Layer from './Layer';
import IconButton from './IconButton';
import './ComboBox.less';

/** A combination box of a text field and an autocomplete list. */
const ComboBox = ({
	id,
	autoSelect,
	text,
	disabled,
	error,
	getSuggestions,
	renderSuggestion = defaultRenderSuggestion,
	onChange,
	onEnter,
	onTextChange,
	...props
}) => {
	id = useRandomId(id);
	const buttonRef = useRef(null);
	const listRef = useRef(null);
	const requestRef = useRef(0);

	const [suggestions, setSuggestions] = useState([]);
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState(-1);

	const level = useLayer();

	const hideList = useCallback(() => (setSuggestions([]), setOpen(false), setSelected(-1)), []);

	const updateSuggestions = useMemo(
		() =>
			debounce((text) => {
				const request = ++requestRef.current;
				return Promise.resolve(getSuggestions(text)).then((suggestions) => {
					// Ignore the response if a later request was made or the suggestions were cancelled
					if (request === requestRef.current) {
						if (suggestions.length === 0) {
							hideList();
						} else {
							setSuggestions(suggestions);
							setOpen(true);
							setSelected(autoSelect ? 0 : -1);
						}
					}
				});
			}, 150),
		[hideList, autoSelect, getSuggestions]
	);
	// Cancels the pending request and ignores the response of the one in progress
	const cancelSuggestions = useCallback(() => {
		updateSuggestions.cancel();
		++requestRef.current;
	}, [updateSuggestions]);
	const hideSuggestions = useCallback(() => (hideList(), cancelSuggestions()), [hideList, cancelSuggestions]);
	const selectSuggestion = useCallback(
		(index) => (hideSuggestions(), onChange(suggestions[index])),
		[suggestions, hideSuggestions, onChange]
	);

	const handleKeyDown = useCallback(
		(event) => {
			switch (event.key) {
				case 'Enter':
					event.preventDefault();
					if (selected !== -1) {
						selectSuggestion(selected);
					} else if (onEnter) {
						hideSuggestions();
						onEnter(event.target.value);
					}
					break;
				case 'Escape':
					event.preventDefault();
					hideSuggestions();
					onTextChange('');
					break;
				case 'ArrowUp':
					event.preventDefault();
					if (open) {
						const index = selected <= 0 ? suggestions.length - 1 : selected - 1;
						setSelected(index);
						scrollToItem(listRef.current, listRef.current.children[index]);
					}
					break;
				case 'ArrowDown':
					event.preventDefault();
					if (open) {
						const index = selected === -1 || selected === suggestions.length - 1 ? 0 : selected + 1;
						setSelected(index);
						scrollToItem(listRef.current, listRef.current.children[index]);
					}
					break;
			}
		},
		[hideSuggestions, onEnter, onTextChange, open, selectSuggestion, selected, suggestions.length]
	);

	const handleChange = useCallback(
		(event) => {
			const text = event.target.value;
			onTextChange(text);
			if (text && text[0] !== '/') {
				updateSuggestions(text);
			} else {
				hideSuggestions();
			}
		},
		[onTextChange, updateSuggestions, hideSuggestions]
	);

	const handleFocus = useCallback(
		() => (suggestions.length !== 0 ? (setOpen(true), setSelected(autoSelect ? 0 : -1)) : null),
		[suggestions, autoSelect]
	);

	const handleBlur = useCallback(() => setOpen(false), []);

	const handleAddClick = useCallback(() => {
		const input = document.getElementById(id);
		input.focus();
		onEnter?.(input.value);
	}, [id, onEnter]);

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
		if (error) {
			hideSuggestions();
		}
	}, [error, hideSuggestions]);

	useEffect(() => cancelSuggestions, [cancelSuggestions]);

	useSelectPositioner(open, buttonRef, listRef);

	const listId = `${id}-list`;
	return (
		<div className="ComboBox" ref={buttonRef}>
			<Layer
				{...props}
				as="input"
				id={id}
				className="ComboBox__input"
				type="text"
				autoComplete="off"
				role="combobox"
				aria-expanded={open}
				aria-autocomplete="list"
				aria-controls={listId}
				aria-activedescendant={selected === -1 ? null : `${id}-${selected}`}
				aria-invalid={error}
				value={text}
				disabled={disabled}
				onKeyDown={handleKeyDown}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
			{!autoSelect && (
				<IconButton
					id={`${id}-add`}
					className="ComboBox__add"
					icon={AddLarge}
					aria-label={t`Add`}
					disabled={disabled || !text}
					onClick={handleAddClick}
				/>
			)}
			{createPortal(
				<Layer
					id={listId}
					className="ComboBox__list"
					level={level + 1}
					role="listbox"
					aria-label={t`Options`}
					style={{display: open ? null : 'none'}}
					ref={listRef}
					onMouseDown={handleListMouseDown}
					onMouseUp={handleListMouseUp}>
					{suggestions.map((item, index) => {
						const element = renderSuggestion(item, index);
						return (
							<div
								key={index}
								id={`${id}-${index}`}
								className="ComboBox__option"
								role="option"
								aria-selected={selected === index}
								data-index={index}>
								{cloneElement(element, {
									className: `ComboBox__optionText${element.props.className ? ` ${element.props.className}` : ''}`,
								})}
							</div>
						);
					})}
				</Layer>,
				document.fullscreenElement || document.body
			)}
		</div>
	);
};

ComboBox.propTypes = {
	/** The component id. */
	id: PropTypes.string,
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
	/** Function invoked to get suggestions based on text input, can return a promise. It must be stable (for example wrapped in useCallback), a new function discards the pending suggestions. */
	getSuggestions: PropTypes.func,
	/** Function invoked to render suggestions, must return an element. Defaults to `renderSuggestion`. */
	renderSuggestion: PropTypes.func,
	/** Function invoked when a suggestion is selected. */
	onChange: PropTypes.func.isRequired,
	/** Function invoked when the enter key is pressed. */
	onEnter: PropTypes.func,
	/** Function invoked when the text input is changed. */
	onTextChange: PropTypes.func.isRequired,
};

export default ComboBox;
