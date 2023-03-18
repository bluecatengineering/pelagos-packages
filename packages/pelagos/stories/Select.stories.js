import identity from 'lodash-es/identity';

import {Select} from '../src';

const options = ['Alpha', 'Beta', 'Gamma'];
const getOptionKey = identity;
const renderOption = identity;

export default {
	title: 'Components/Select',
	component: Select,
};

export const Default = {
	args: {id: 'default', value: 'Alpha', options, getOptionKey, renderOption},
};

export const Empty = {
	args: {id: 'empty', placeholder: 'Empty', 'aria-label': 'Empty', options, getOptionKey, renderOption},
};

export const Disabled = {
	args: {id: 'disabled', disabled: true, value: 'Alpha', options, getOptionKey, renderOption},
};

export const Error = {
	args: {id: 'error', error: true, value: 'Alpha', options, getOptionKey, renderOption},
};
