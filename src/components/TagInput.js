import {useCallback, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash-es/debounce';
import {t} from '@bluecat/l10n.macro';

import setLiveText from '../functions/setLiveText';
import useTooltip from '../hooks/useTooltip';
import timesThin from '../icons/timesThin';

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
	const inputRef = useRef(null);

	const [text, setText] = useState('');

	const debChange = useMemo(() => debounce((text) => (onError(null), setText(text)), 33), [onError]);

	const handleTagClick = useCallback(
		(event) => {
			const button = event.target.closest('button');
			if (button) {
				const index = +button.dataset.index;
				const name = tags[index];
				setLiveText(t`${name} removed`);
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
					debChange.cancel();
					setLiveText(t`${name} added`);
					onChange([...tags, name]);
					setText('');
				}
			} else {
				debChange.cancel();
				setText('');
			}
		},
		[tags, validate, onChange, onError, debChange]
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
							setLiveText(t`${name} removed`);
							onChange(removeTag(tags, index));
						}
					}
					break;
			}
		},
		[tags, onChange, addTag]
	);

	const handleChange = useCallback((event) => debChange(event.target.value), [debChange]);

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
			{length
				? tags.map((name, i) => (
						<span key={name} className="TagInput__tag">
							{name}
							<button className="TagInput__remove" type="button" aria-label={t`Remove ${name}`} data-index={i}>
								<SvgIcon icon={timesThin} />
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
	id: PropTypes.string.isRequired,
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
