import identity from 'lodash-es/identity';

import {TextAreaField} from '../src';

const Template = (args) => <TextAreaField {...args} />;

export const Normal = Template.bind({});
Normal.args = {label: 'Normal', value: 'Alpha'};

export const Empty = Template.bind({});
Empty.args = {label: 'Empty', placeholder: 'Placeholder'};

export const Optional = Template.bind({});
Optional.args = {label: 'Optional', optional: true};

export const Error = Template.bind({});
Error.args = {label: 'Error', value: 'Alpha', error: 'Error message'};

export const AllStates = () => (
	<div className="Story__group">
		<TextAreaField label="Normal" value="Alpha" onChange={identity} />
		<TextAreaField label="Empty" placeholder="Placeholder" onChange={identity} />
		<TextAreaField label="Optional" optional onChange={identity} />
		<TextAreaField label="Error" value="Alpha" error="Error message" onChange={identity} />
	</div>
);
AllStates.storyName = 'All states';

export default {
	title: 'TextAreaField',
	component: TextAreaField,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
