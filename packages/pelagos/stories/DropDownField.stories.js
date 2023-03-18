import identity from 'lodash-es/identity';

import {DropDownField} from '../src';

const options = ['Alpha', 'Beta', 'Gamma'];
const getOptionKey = identity;
const renderOption = identity;

export default {
	title: 'Components/DropDownField',
	component: DropDownField,
};

export const Default = {
	args: {label: 'Default', value: 'Alpha', helperText: 'Helper text', options, getOptionKey, renderOption},
};

export const Empty = {
	args: {label: 'Empty', placeholder: 'Empty', options, getOptionKey, renderOption},
};

export const Disabled = {
	args: {label: 'Disabled', disabled: true, value: 'Alpha', options, getOptionKey, renderOption},
};

export const Error = {
	args: {label: 'Error', error: 'Error message', value: 'Alpha', options, getOptionKey, renderOption},
};
