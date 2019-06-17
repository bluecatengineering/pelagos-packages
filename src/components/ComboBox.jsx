import React, {cloneElement, useRef, useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash-es/debounce';
import {scrollToItem} from '@bluecat/helpers';

import '../formFields/TextInputField.less';
import './ComboBox.less';

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
	const [expanded, setExpanded] = useState(false);
	const [selected, setSelected] = useState(-1);

	const hideList = useCallback(() => (setSuggestions([]), setExpanded(false), setSelected(-1)), []);

	const updateSuggestions = useCallback(
		debounce(text => {
			const suggestions = getSuggestions(text);
			if (suggestions.length === 0) {
				hideList();
			} else {
				setSuggestions(suggestions);
				setExpanded(true);
				setSelected(autoSelect ? 0 : -1);
			}
		}, 150),
		[getSuggestions]
	);
	const selectSuggestion = useCallback(index => (hideList(), onChange(suggestions[index])), [suggestions, onChange]);

	const handleKeyDown = useCallback(
		event => {
			switch (event.keyCode) {
				case 13: // enter
				case 27: // escape
					event.preventDefault();
					break;
				case 38: // up
					event.preventDefault();
					if (expanded) {
						const index = selected <= 0 ? suggestions.length - 1 : selected - 1;
						setSelected(index);
						scrollToItem(listRef.current, index);
					}
					break;
				case 40: // down
					event.preventDefault();
					if (expanded) {
						const index = selected === -1 || selected === suggestions.length - 1 ? 0 : selected + 1;
						setSelected(index);
						scrollToItem(listRef.current, index);
					}
					break;
			}
		},
		[expanded, selected, listRef]
	);

	const handleKeyUp = useCallback(
		event => {
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
		[selected, selectSuggestion, onEnter, onTextChange]
	);

	const handleChange = useCallback(event => onTextChange(event.target.value), [onTextChange]);

	const handleFocus = useCallback(
		() => (suggestions.length !== 0 ? (setExpanded(true), setSelected(autoSelect ? 0 : -1)) : null),
		[suggestions]
	);

	const handleBlur = useCallback(() => setExpanded(false), []);

	const handleListMouseOver = useCallback(event => {
		const element = event.target.closest('.ComboBox__option');
		if (element) {
			setSelected(+element.dataset.index);
		}
	}, []);

	const handleListMouseDown = useCallback(event => event.preventDefault(), []);

	const handleListMouseUp = useCallback(
		event => {
			const element = event.target.closest('.ComboBox__option');
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
	}, [text, error]);

	const listId = id + '-list';
	return (
		<div className="ComboBox" role="combobox" aria-haspopup="listbox" aria-expanded={expanded}>
			<input
				{...props}
				id={id}
				className={'TextInputField__input' + (error ? ' TextInputField--error' : '')}
				autoComplete="off"
				aria-autocomplete="list"
				aria-controls={expanded ? listId : null}
				aria-activedescendant={selected === -1 ? null : id + '-opt-' + selected}
				value={text}
				onKeyDown={handleKeyDown}
				onKeyUp={handleKeyUp}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
			{expanded && (
				<div
					id={listId}
					className="ComboBox__suggestions"
					role="listbox"
					ref={listRef}
					onMouseOver={handleListMouseOver}
					onMouseDown={handleListMouseDown}
					onMouseUp={handleListMouseUp}>
					{suggestions.map((item, index) => {
						const element = renderSuggestion(item, index);
						return cloneElement(element, {
							key: index,
							id: id + '-opt-' + index,
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
	id: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	autoSelect: PropTypes.bool,
	text: PropTypes.string,
	disabled: PropTypes.bool,
	error: PropTypes.bool,
	getSuggestions: PropTypes.func,
	renderSuggestion: PropTypes.func,
	onChange: PropTypes.func,
	onEnter: PropTypes.func,
	onTextChange: PropTypes.func,
};

export default ComboBox;
