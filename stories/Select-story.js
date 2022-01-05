import identity from 'lodash-es/identity';

import {Select} from '../src';

const options = ['Alpha', 'Beta', 'Gamma'];
const getOptionKey = identity;
const renderOption = identity;

const Template = (args) => <Select {...args} />;

export const Normal = Template.bind({});
Normal.args = {id: 'normal', value: 'Alpha', options, getOptionKey, renderOption};

export const Empty = Template.bind({});
Empty.args = {id: 'empty', placeholder: 'Empty', 'aria-label': 'Empty', options, getOptionKey, renderOption};

export const Disabled = Template.bind({});
Disabled.args = {id: 'disabled', disabled: true, value: 'Alpha', options, getOptionKey, renderOption};

export const Error = Template.bind({});
Error.args = {id: 'error', error: true, value: 'Alpha', options, getOptionKey, renderOption};

export const AllStates = () => (
	<div className="Story__group">
		<Select id="s0" value="Alpha" options={options} renderOption={identity} onChange={identity} />
		<Select
			id="s1"
			placeholder="Placeholder"
			aria-label="Empty"
			options={options}
			renderOption={identity}
			onChange={identity}
		/>
		<Select id="s2" value="Alpha" options={options} renderOption={identity} onChange={identity} disabled />
		<Select id="s3" value="Alpha" options={options} renderOption={identity} onChange={identity} error />
	</div>
);
AllStates.storyName = 'All states';

export default {
	title: 'Components/Select',
	component: Select,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
