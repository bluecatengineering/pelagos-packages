import FruitBowl from '@carbon/icons-react/es/FruitBowl';
import Sigma from '@carbon/icons-react/es/Sigma';
import Pen from '@carbon/icons-react/es/Pen';

import Tag from '../components/Tag';

export const getKey = (tag) => tag.name;
export const getName = (tag) => tag.name;
export const renderTag = (tag, disabled, dft, handleRemove, defaultTooltip) =>
	dft ? (
		<Tag type="gray" text={tag.name} aria-disabled={disabled} ref={defaultTooltip} />
	) : (
		<Tag
			type={tag.type}
			text={tag.name}
			icon={tag.type === 'green' ? FruitBowl : tag.type === 'purple' ? Sigma : Pen}
			removeTitle={`Remove ${tag.name}`}
			aria-disabled={disabled}
			onRemove={disabled ? null : handleRemove}
		/>
	);
export const hasTag = (tags, value) => {
	const lower = value.name.toLowerCase();
	return tags.some((tag) => tag.name.toLowerCase() === lower);
};
export const validate = () => null;
export const textToTag = (name) => ({type: 'red', name});
export const getSuggestions = (text) => (
	(text = text.toLowerCase()),
	[
		{type: 'purple', name: 'Alpha'},
		{type: 'purple', name: 'Beta'},
		{type: 'purple', name: 'Gamma'},
		{type: 'purple', name: 'Delta'},
		{type: 'purple', name: 'Epsilon'},
		{type: 'green', name: 'Apple'},
		{type: 'green', name: 'Banana'},
		{type: 'green', name: 'Cherry'},
		{type: 'green', name: 'Date'},
		{type: 'green', name: 'Elderberry'},
	].filter((s) => s.name.toLowerCase().includes(text))
);
export const renderSuggestion = (tag) => <div>{tag.name}</div>;
