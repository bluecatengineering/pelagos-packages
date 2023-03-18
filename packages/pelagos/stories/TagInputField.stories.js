import {TagInputField} from '../src';

const validate = () => true;

export default {
	title: 'Components/TagInputField',
	component: TagInputField,
};

export const Default = {
	args: {label: 'Default', tags: ['Alpha'], helperText: 'Helper text', validate},
};

export const Defaults = {
	args: {label: 'Defaults', defaultTags: ['Alpha'], tags: [], validate},
};
