import {useCallback, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';

import useTooltip from '../hooks/useTooltip';
import useRandomId from '../hooks/useRandomId';
import xmarkThin from '../icons/xmarkThin';

import Layer from './Layer';
import SvgIcon from './SvgIcon';
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
const TagInput = ({id, tags, defaultTags, defaultTooltipText, error, validate, onChange, onError, ...props}) => {
	id = useRandomId(id);
	const inputRef = useRef(null);
	const liveRef = useRef(null);

	const [text, setText] = useState('');

	const handleTagClick = useCallback(
		(event) => {
			const button = event.target.closest('button');
			if (button) {
				const index = +button.dataset.index;
				const name = tags[index];
				liveRef.current.textContent = t`${name} removed`;
				onChange(removeTag(tags, index));
				inputRef.current.focus();
			}
		},
		[tags, onChange]
	);

	const addTag = useCallback(
		(name) => {
			if (!hasTag(tags, name)) {
				const error = validate(name);
				if (error) {
					onError(error);
				} else {
					liveRef.current.textContent = t`${name} added`;
					onChange([...tags, name]);
					setText('');
				}
			} else {
				setText('');
			}
		},
		[tags, validate, onChange, onError]
	);

	const handleKeyDown = useCallback(
		(event) => {
			const value = event.target.value;
			switch (event.keyCode) {
				case 13: // enter
				case 32: // space
					if (value) {
						event.preventDefault();
						addTag(value);
						inputRef.current.focus();
					}
					break;
				case 8: // backspace
					if (!value) {
						event.preventDefault();
						const length = tags.length;
						if (length) {
							const index = length - 1;
							const name = tags[index];
							liveRef.current.textContent = t`${name} removed`;
							onChange(removeTag(tags, index));
						}
					}
					break;
			}
		},
		[tags, onChange, addTag]
	);

	const handleChange = useCallback((event) => (onError(null), setText(event.target.value)), [onError]);

	const handleBlur = useCallback(
		(event) => {
			const value = event.target.value;
			if (value) {
				addTag(value);
			}
		},
		[addTag]
	);

	const tooltip = useTooltip(defaultTooltipText, 'top');

	const length = tags.length;
	return (
		<Layer id={`${id}-tags`} className={`TagInput${error ? ' TagInput--error' : ''}`} onClick={handleTagClick}>
			<span className="sr-only" aria-live="assertive" ref={liveRef} />
			{length
				? tags.map((name, i) => (
						<span key={name} className="TagInput__tag">
							{name}
							<button className="TagInput__remove" type="button" aria-label={t`Remove ${name}`} data-index={i}>
								<SvgIcon icon={xmarkThin} />
							</button>
						</span>
				  ))
				: defaultTags?.length
				? defaultTags.map((tag) => (
						<span key={tag} className="TagInput__defaultTag" ref={tooltip}>
							{tag}
						</span>
				  ))
				: null}
			<input
				{...props}
				id={id}
				type="text"
				className="TagInput__input"
				value={text}
				aria-invalid={!!error}
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
	/** The entered tags. */
	tags: PropTypes.array.isRequired,
	/** The default tags. */
	defaultTags: PropTypes.array,
	/** The tooltip for default tags. */
	defaultTooltipText: PropTypes.string,
	/** Whether the component is in error. */
	error: PropTypes.string,
	/** Function invoked to validate each tag. */
	validate: PropTypes.func.isRequired,
	/** Function invoked when the tags change. */
	onChange: PropTypes.func.isRequired,
	/** Function invoked when an error is detected. */
	onError: PropTypes.func.isRequired,
};

export default TagInput;
