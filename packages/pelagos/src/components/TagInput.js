import {useCallback, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';
import identity from 'lodash-es/identity';

import useTooltip from '../hooks/useTooltip';
import useRandomId from '../hooks/useRandomId';

import Layer from './Layer';
import Tag from './Tag';
import './TagInput.less';

const removeTag = (tags, i) => {
	const newTags = [...tags];
	newTags.splice(i, 1);
	return newTags;
};

const hasTag = (tags, value) => {
	const lower = value.toLowerCase();
	return tags.some((tag) => tag.toLowerCase() === lower);
};

/** A component to enter tags. */
const TagInput = ({
	id,
	className,
	tags,
	defaultTags,
	defaultTooltipText,
	error,
	validate,
	disabled,
	transform = identity,
	onChange,
	onError,
	...props
}) => {
	id = useRandomId(id);
	const inputRef = useRef(null);
	const liveRef = useRef(null);

	const [text, setText] = useState('');

	const handleRemove = useCallback(
		(event) => {
			const element = event.target.closest('[data-index]');
			const index = +element.dataset.index;
			const name = tags[index];
			liveRef.current.textContent = t`${name} removed`;
			onChange(removeTag(tags, index), event);
			inputRef.current.focus();
		},
		[tags, onChange]
	);

	const addTag = useCallback(
		(inputName, event) => {
			const name = transform(inputName);

			if (!hasTag(tags, name)) {
				const error = validate(name);
				if (error) {
					onError(error, event);
				} else {
					liveRef.current.textContent = t`${name} added`;
					onChange([...tags, name], event);
					setText('');
				}
			} else {
				setText('');
			}
		},
		[tags, transform, validate, onError, onChange]
	);

	const handleKeyDown = useCallback(
		(event) => {
			const value = event.target.value;
			switch (event.key) {
				case 'Enter':
				case ' ':
					if (value) {
						event.preventDefault();
						addTag(value, event);
						inputRef.current.focus();
					}
					break;
				case 'Backspace':
					if (!value) {
						event.preventDefault();
						const length = tags.length;
						if (length) {
							const index = length - 1;
							const name = tags[index];
							liveRef.current.textContent = t`${name} removed`;
							onChange(removeTag(tags, index), event);
						}
					}
					break;
			}
		},
		[tags, onChange, addTag]
	);

	const handleChange = useCallback((event) => (onError(null, event), setText(event.target.value)), [onError]);

	const handleBlur = useCallback(
		(event) => {
			const value = event.target.value;
			if (value) {
				addTag(value, event);
			}
		},
		[addTag]
	);

	const tooltip = useTooltip(defaultTooltipText, 'top');

	const length = tags.length;
	return (
		<Layer
			id={`${id}-tags`}
			className={`TagInput${error ? ' TagInput--error' : ''}${disabled ? ' TagInput--disabled' : ''}${className ? ` ${className}` : ''}`}>
			<span className="sr-only" aria-live="assertive" ref={liveRef} />
			{length
				? tags.map((name, i) => (
						<Tag
							key={name}
							className="TagInput__tag"
							type="gray"
							text={name}
							removeTitle={`Remove ${name}`}
							aria-disabled={disabled}
							data-index={i}
							onRemove={disabled ? null : handleRemove}
						/>
					))
				: defaultTags?.length
					? defaultTags.map((tag) => (
							<Tag
								key={tag}
								className="TagInput__defaultTag"
								type="gray"
								text={tag}
								aria-disabled={disabled}
								ref={tooltip}
							/>
						))
					: null}
			<input
				{...props}
				id={id}
				type="text"
				className="TagInput__input"
				value={text}
				aria-invalid={!!error}
				disabled={disabled}
				onKeyDown={handleKeyDown}
				onChange={handleChange}
				onBlur={handleBlur}
				ref={inputRef}
			/>
		</Layer>
	);
};

TagInput.propTypes = {
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
	error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	/** Function invoked to validate each tag. */
	validate: PropTypes.func.isRequired,
	/** Whether the input is disabled. */
	disabled: PropTypes.bool,
	/** Function that transforms a tag before it is added. */
	transform: PropTypes.func,
	/** Function invoked when the tags change. */
	onChange: PropTypes.func.isRequired,
	/** Function invoked when an error is detected. */
	onError: PropTypes.func.isRequired,
};

export default TagInput;
