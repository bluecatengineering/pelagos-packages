import {useState} from 'react';
import identity from 'lodash-es/identity';

import Select from './Select';

const options = ['Alpha', 'Beta', 'Gamma'];
const getOptionKey = identity;
const renderOption = identity;

export default {
	title: 'Components/Select',
	component: Select,
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks -- story
		const [value, setValue] = useState(args.value);
		return <Select {...args} value={value} onChange={setValue} />;
	},
};

export const Default = {
	args: {id: 'default', value: 'Alpha', 'aria-label': 'Default', options, getOptionKey, renderOption},
};

export const Empty = {
	args: {id: 'empty', placeholder: 'Empty', 'aria-label': 'Empty', options, getOptionKey, renderOption},
};

export const Disabled = {
	args: {id: 'disabled', disabled: true, value: 'Alpha', 'aria-label': 'Disabled', options, getOptionKey, renderOption},
};

export const Error = {
	args: {id: 'error', error: true, value: 'Alpha', 'aria-label': 'Error', options, getOptionKey, renderOption},
};
