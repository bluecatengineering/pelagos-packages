import {TextFilterEditor} from '../src';

const list = ['foo', 'baz'];
const getSuggestions = () => ({suggestions: [{name: 'bar'}]});

export default {
	title: 'Components/TextFilterEditor',
	component: TextFilterEditor,
};

export const Default = {
	args: {label: 'Default', placeholder: 'Placeholder', list, getSuggestions, validateSaveRef: {}},
};
