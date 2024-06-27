import {useState} from 'react';
import identity from 'lodash-es/identity';

import WithLayers from '../../templates/WithLayers';

import Select from './Select';

const options = ['Alpha', 'Beta', 'Gamma'];
const getOptionKey = identity;
const renderOption = identity;

export default {
	title: 'Components/Select',
	component: Select,
	render: (args) => {
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

// eslint-disable-next-line react/prop-types -- story
const LayeredSelect = ({level}) => {
	const [value, setValue] = useState('Alpha');
	return (
		<Select
			id={`level-${level}`}
			value={value}
			aria-label="Default"
			options={options}
			getOptionKey={getOptionKey}
			renderOption={renderOption}
			onChange={setValue}
		/>
	);
};

export const _WithLayers = {
	render: () => <WithLayers>{(level) => <LayeredSelect level={level} />}</WithLayers>,
	parameters: {
		controls: {hideNoControlsWarning: true},
	},
};
