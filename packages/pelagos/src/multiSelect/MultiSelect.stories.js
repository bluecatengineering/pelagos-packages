import {useState} from 'react';

import WithLayers from '../../templates/WithLayers';
import loremIpsumShort from '../../stories/LoremIpsumShort';

import MultiSelect from './MultiSelect';

const OPTIONS = [
	{id: 'alpha', text: 'Alpha'},
	{id: 'bravo', text: 'Bravo'},
	{id: 'charlie', text: 'Charlie'},
	{id: 'delta', text: 'Delta'},
	{id: 'echo', text: 'Echo'},
	{id: 'lorem', text: loremIpsumShort},
];

const getOptionKey = (option) => option.id;
const getOptionText = (option) => option.text;

export default {
	title: 'Experimental/MultiSelect',
	component: MultiSelect,
	render: (args) => {
		const [values, setValues] = useState(args.values);
		return <MultiSelect {...args} values={values} onChange={setValues} />;
	},
	args: {
		text: 'Select items',
		options: OPTIONS,
		getOptionKey,
		getOptionText,
	},
};

export const Default = {
	args: {
		values: [],
		'aria-label': 'Default',
	},
};

export const WithPreselectedValues = {
	args: {
		values: [OPTIONS[0], OPTIONS[2]],
		'aria-label': 'Preselected',
	},
};

export const Disabled = {
	args: {
		values: [OPTIONS[0], OPTIONS[1]],
		disabled: true,
		'aria-label': 'Disabled',
	},
};

export const Error = {
	args: {
		values: [OPTIONS[0]],
		error: true,
		'aria-label': 'Error',
	},
};

export const ManyOptions = {
	args: {
		options: Array.from({length: 30}, (_, i) => String(i + 1)),
		values: ['1', '2', '3'],
		getOptionKey: undefined,
		getOptionText: (option) => `Option ${option}`,
		'aria-label': 'Many options',
	},
};

// eslint-disable-next-line react/prop-types -- story
const LayeredMultiSelect = ({level}) => {
	const [values, setValues] = useState([]);
	return (
		<MultiSelect
			id={`level-${level}`}
			values={values}
			aria-label="Default"
			options={OPTIONS}
			text="Select items"
			getOptionKey={getOptionKey}
			getOptionText={getOptionText}
			onChange={setValues}
		/>
	);
};

export const _WithLayers = {
	render: () => <WithLayers>{(level) => <LayeredMultiSelect level={level} />}</WithLayers>,
	parameters: {
		controls: {hideNoControlsWarning: true},
	},
};
