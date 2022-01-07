import {TextFilterEditor} from '../src';

const list = ['foo', 'baz'];
const getSuggestions = () => ({suggestions: [{name: 'bar'}]});

const Template = (args) => <TextFilterEditor {...args} />;

export const Normal = Template.bind({});
Normal.args = {label: 'Normal', placeholder: 'Placeholder', list, getSuggestions, validateSaveRef: {}};

export default {
	title: 'Components/TextFilterEditor',
	component: TextFilterEditor,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
