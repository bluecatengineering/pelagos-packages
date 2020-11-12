import {cloneElement, useRef, useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash-es/debounce';
import {scrollToItem} from '@bluecat/helpers';

import '../formFields/TextInputField.less';
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
	const listRef = useRef(null);

	const [suggestions, setSuggestions] = useState([]);
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState(-1);

	const hideList = useCallback(() => (setSuggestions([]), setOpen(false), setSelected(-1)), []);

	// there's no easy way to combine useCallback and debounce yet
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const updateSuggestions = useCallback(
		debounce((text) => {
			const suggestions = getSuggestions(text);
			if (suggestions.length === 0) {
				hideList();
			} else {
				setSuggestions(suggestions);
				setOpen(true);
				setSelected(autoSelect ? 0 : -1);
			}
		}, 150),
		[hideList, getSuggestions]
	);
	const selectSuggestion = useCallback((index) => (hideList(), onChange(suggestions[index])), [
		suggestions,
		hideList,
		onChange,
	]);

	const handleKeyDown = useCallback(
		(event) => {
			switch (event.keyCode) {
				case 13: // enter
				case 27: // escape
					event.preventDefault();
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
		[suggestions, open, selected, listRef]
	);

	const handleKeyUp = useCallback(
		(event) => {
			switch (event.keyCode) {
				case 13: // enter
					event.preventDefault();
					if (selected !== -1) {
						selectSuggestion(selected);
					} else if (onEnter) {
						hideList();
						onEnter();
					}
					break;
				case 27: // escape
					event.preventDefault();
					hideList();
					onTextChange('');
					break;
			}
		},
		[selected, selectSuggestion, hideList, onEnter, onTextChange]
	);

	const handleChange = useCallback((event) => onTextChange(event.target.value), [onTextChange]);

	const handleFocus = useCallback(
		() => (suggestions.length !== 0 ? (setOpen(true), setSelected(autoSelect ? 0 : -1)) : null),
		[suggestions, autoSelect]
	);

	const handleBlur = useCallback(() => setOpen(false), []);

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

	const listId = id + '-list';
	return (
		<div className="ComboBox" role="combobox" aria-haspopup="listbox" aria-expanded={open}>
			<input
				{...props}
				id={id}
				className={'TextInputField__input' + (error ? ' TextInputField--error' : '')}
				autoComplete="off"
				aria-autocomplete="list"
				aria-controls={open ? listId : null}
				aria-activedescendant={selected === -1 ? null : id + '-' + selected}
				value={text}
				onKeyDown={handleKeyDown}
				onKeyUp={handleKeyUp}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
			{open && (
				<div
					id={listId}
					className="ComboBox__list"
					role="listbox"
					ref={listRef}
					onMouseDown={handleListMouseDown}
					onMouseUp={handleListMouseUp}>
					{suggestions.map((item, index) => {
						const element = renderSuggestion(item, index);
						return cloneElement(element, {
							key: index,
							id: id + '-' + index,
							role: 'option',
							className: 'ComboBox__option ' + element.props.className,
							'aria-selected': selected === index,
							'data-index': index,
						});
					})}
				</div>
			)}
		</div>
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
	/** Function invoked to get suggestions based on text input. */
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
