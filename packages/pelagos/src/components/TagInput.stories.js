import TagInput from './TagInput';

const validate = () => true;

export default {
	title: 'Components/TagInput',
	component: TagInput,
};

export const Default = {
	args: {'aria-label': 'Default', tags: ['Alpha'], validate},
};

export const Defaults = {
	args: {'aria-label': 'Defaults', defaultTags: ['Alpha'], defaultTooltipText: 'Default', tags: [], validate},
};

export const Disabled = {
	args: {'aria-label': 'Disabled', tags: ['Alpha'], validate, disabled: true},
};

export const DisabledWithDefault = {
	args: {'aria-label': 'Disabled', defaultTags: ['Alpha'], tags: [], validate, disabled: true},
};
