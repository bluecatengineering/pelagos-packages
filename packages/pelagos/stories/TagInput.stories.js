import {TagInput} from '../src';

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
