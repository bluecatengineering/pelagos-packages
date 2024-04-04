import {useState} from 'react';
import identity from 'lodash-es/identity';
import {action} from '@storybook/addon-actions';

import WithLayers from '../../templates/WithLayers';

import DropDownField from './DropDownField';

const options = ['Alpha', 'Beta', 'Gamma'];
const getOptionKey = identity;
const renderOption = identity;
const handleChange = action('onChange');

export default {
	title: 'Components/DropDownField',
	component: DropDownField,
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks -- story
		const [value, setValue] = useState(args.value);
		return <DropDownField {...args} value={value} onChange={setValue} />;
	},
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

export const _WithLayers = {
	render: () => (
		<WithLayers>
			{() => (
				<DropDownField
					label="Default"
					value="Alpha"
					helperText="Helper text"
					options={options}
					getOptionKey={getOptionKey}
					renderOption={renderOption}
					onChange={handleChange}
				/>
			)}
		</WithLayers>
	),
	parameters: {
		controls: {hideNoControlsWarning: true},
	},
};
