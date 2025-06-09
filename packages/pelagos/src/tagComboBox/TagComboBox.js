import {cloneElement, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import identity from 'lodash-es/identity';
import debounce from 'lodash-es/debounce';
import {t} from '@bluecateng/l10n.macro';

import Layer from '../components/Layer';
import Tag from '../components/Tag';
import scrollToItem from '../functions/scrollToItem';
import useTooltip from '../hooks/useTooltip';
import useRandomId from '../hooks/useRandomId';
import useSelectPositioner from '../hooks/useSelectPositioner';

import './TagComboBox.less';

const defaultRenderTag = (tag, disabled, dft, handleRemove, defaultTooltip) =>
	dft ? (
		<Tag type="gray" aria-disabled={disabled} ref={defaultTooltip}>
			{tag}
		</Tag>
	) : (
		<Tag type="gray" removeTitle={`Remove ${tag}`} aria-disabled={disabled} onRemove={disabled ? null : handleRemove}>
			{tag}
		</Tag>
	);

const defaultHasTag = (tags, value) => {
	const lower = value.toLowerCase();
	return tags.some((tag) => tag.toLowerCase() === lower);
};

const removeTag = (tags, i) => {
	const newTags = [...tags];
	newTags.splice(i, 1);
	return newTags;
};

/** A component to enter tags with auto complete. */
const TagComboBox = ({
	id,
	className,
	tags,
	defaultTags,
	defaultTooltipText,
	error,
	getKey = identity,
	getName = identity,
	renderTag = defaultRenderTag,
	hasTag = defaultHasTag,
	validate,
	disabled,
	transform = identity,
	textToTag = identity,
	getSuggestions,
	renderSuggestion,
	suggestionToTag = identity,
	onChange,
	onError,
	...props
}) => {
	id = useRandomId(id);
	const inputRef = useRef(null);
	const boxRef = useRef(null);
	const popUpRef = useRef(null);

	const [text, setText] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState(-1);
	const [live, setLive] = useState(null);

	const handleTagRemove = useCallback(
		(event) => {
			const element = event.target.closest('[data-index]');
			const index = +element.dataset.index;
			const name = getName(tags[index]);
			setLive(t`${name} removed`);
			onChange(removeTag(tags, index), event);
			inputRef.current.focus();
		},
		[getName, tags, onChange]
	);

	const addTextTag = useCallback(
		(input, event) => {
			const text = transform(input);
			const error = validate(text);
			if (error) {
				onError(error, event);
			} else {
				const tag = textToTag(text);
				if (!hasTag(tags, tag)) {
					const name = getName(tag);
					setLive(t`${name} added`);
					onChange([...tags, tag], event);
				}
				setText('');
			}
		},
		[transform, validate, onError, textToTag, hasTag, tags, getName, onChange]
	);

	const hideList = useCallback(
		() => (popUpRef.current?.hidePopover(), setSuggestions([]), setOpen(false), setSelected(-1)),
		[]
	);

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
							setSelected(-1);
							popUpRef.current.showPopover();
						}
					}),
				150
			),
		[hideList, getSuggestions]
	);
	const addSuggestion = useCallback(
		(index, event) => {
			const tag = suggestionToTag(suggestions[index]);
			if (!hasTag(tags, tag)) {
				const name = getName(tag);
				setLive(t`${name} added`);
				onChange([...tags, tag], event);
			}
			setText('');
			hideList();
		},
		[suggestionToTag, suggestions, hasTag, tags, hideList, getName, onChange]
	);

	const handleKeyDown = useCallback(
		(event) => {
			const value = event.target.value;
			switch (event.key) {
				case 'Enter':
					event.preventDefault();
					if (selected !== -1) {
						addSuggestion(selected, event);
					} else if (value) {
						addTextTag(value, event);
						hideList();
						updateSuggestions.cancel();
					}
					break;
				case 'Backspace':
					if (!value) {
						event.preventDefault();
						const length = tags.length;
						if (length) {
							const index = length - 1;
							const name = getName(tags[index]);
							setLive(t`${name} removed`);
							onChange(removeTag(tags, index), event);
						}
					}
					break;
				case 'Escape':
					event.preventDefault();
					setText('');
					hideList();
					updateSuggestions.cancel();
					break;
				case 'ArrowUp':
					event.preventDefault();
					if (open) {
						const index = selected <= 0 ? suggestions.length - 1 : selected - 1;
						setSelected(index);
						scrollToItem(popUpRef.current, popUpRef.current.children[index]);
					}
					break;
				case 'ArrowDown':
					event.preventDefault();
					if (open) {
						const index = selected === -1 || selected === suggestions.length - 1 ? 0 : selected + 1;
						setSelected(index);
						scrollToItem(popUpRef.current, popUpRef.current.children[index]);
					}
					break;
			}
		},
		[
			selected,
			hideList,
			updateSuggestions,
			open,
			addSuggestion,
			addTextTag,
			tags,
			getName,
			onChange,
			suggestions.length,
		]
	);

	const handleChange = useCallback(
		(event) => {
			onError(null, event);
			const value = event.target.value;
			setText(value);
			if (value) {
				updateSuggestions(value);
			} else {
				hideList();
				updateSuggestions.cancel();
			}
		},
		[hideList, onError, updateSuggestions]
	);

	const handleFocus = useCallback(
		() => (suggestions.length !== 0 ? (popUpRef.current.showPopover(), setOpen(true), setSelected(-1)) : null),
		[suggestions]
	);

	const handleBlur = useCallback(
		(event) => {
			const value = event.target.value;
			if (value) {
				addTextTag(value, event);
				hideList();
				updateSuggestions.cancel();
			}
		},
		[addTextTag, hideList, updateSuggestions]
	);

	const handleListMouseDown = useCallback((event) => event.preventDefault(), []);

	const handleListMouseUp = useCallback(
		(event) => {
			const element = event.target.closest('[role=option]');
			if (element) {
				event.preventDefault();
				addSuggestion(+element.dataset.index, event);
			}
		},
		[addSuggestion]
	);

	useEffect(() => updateSuggestions.cancel, [updateSuggestions]);

	const tooltip = useTooltip(defaultTooltipText, 'top');

	useSelectPositioner(open, boxRef, popUpRef);

	const length = tags.length;
	const listId = `${id}-list`;
	return (
		<Layer
			id={`${id}-tags`}
			className={`TagComboBox${error ? ' TagComboBox--error' : ''}${disabled ? ' TagComboBox--disabled' : ''}${className ? ` ${className}` : ''}`}
			ref={boxRef}>
			<span className="sr-only" aria-live="polite">
				{live}
			</span>
			<div className="TagComboBox__content">
				{length
					? tags.map((tag, index) =>
							cloneElement(renderTag(tag, disabled, false, handleTagRemove), {
								key: getKey(tag),
								className: 'TagComboBox__tag',
								'data-index': index,
							})
						)
					: defaultTags?.length
						? defaultTags.map((tag) =>
								cloneElement(renderTag(tag, disabled, true, null, tooltip), {
									key: getKey(tag),
									className: 'TagComboBox__defaultTag',
								})
							)
						: null}
				<input
					{...props}
					id={id}
					type="text"
					className="TagComboBox__input"
					value={text}
					autoComplete="off"
					role="combobox"
					aria-expanded={open}
					aria-autocomplete="list"
					aria-controls={listId}
					aria-activedescendant={selected === -1 ? null : `${id}-${selected}`}
					aria-invalid={!!error}
					disabled={disabled}
					onKeyDown={handleKeyDown}
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					ref={inputRef}
				/>
			</div>
			<Layer
				id={listId}
				className="TagComboBox__list"
				popover="manual"
				role="listbox"
				ref={popUpRef}
				onMouseDown={handleListMouseDown}
				onMouseUp={handleListMouseUp}>
				{suggestions.map((item, index) => {
					const element = renderSuggestion(item, index);
					return cloneElement(element, {
						key: index,
						id: `${id}-${index}`,
						role: 'option',
						className: `TagComboBox__option${element.props.className ? ` ${element.props.className}` : ''}`,
						'aria-selected': selected === index,
						'data-index': index,
					});
				})}
			</Layer>
		</Layer>
	);
};

TagComboBox.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The entered tags. */
	tags: PropTypes.array.isRequired,
	/** The default tags. */
	defaultTags: PropTypes.array,
	/** The tooltip for default tags. */
	defaultTooltipText: PropTypes.string,
	/** Whether the component is in error. */
	error: PropTypes.string,
	/** Whether the input is disabled. */
	disabled: PropTypes.bool,
	/** Function invoked to get the key of each tag. */
	getKey: PropTypes.func,
	/** Function invoked to get the name of each tag. */
	getName: PropTypes.func,
	/** Function invoked to render each tag. */
	renderTag: PropTypes.func,
	/** Function invoked to check if a tag is already present. */
	hasTag: PropTypes.func,
	/** Function invoked to validate each tag. */
	validate: PropTypes.func.isRequired,
	/** Function that transforms the text input before it is validated. */
	transform: PropTypes.func,
	/** Function that converts the text input to a tag. */
	textToTag: PropTypes.func,
	/** Function invoked to get suggestions based on text input, can return a promise. */
	getSuggestions: PropTypes.func,
	/** Function invoked to render suggestions. */
	renderSuggestion: PropTypes.func,
	/** Function that converts a suggestion to a tag. */
	suggestionToTag: PropTypes.func,
	/** Function invoked when the tags change. */
	onChange: PropTypes.func.isRequired,
	/** Function invoked when an error is detected. */
	onError: PropTypes.func.isRequired,
};

export default TagComboBox;
