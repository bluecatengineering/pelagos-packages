import {OutputField} from '../src';

const Template = (args) => <OutputField {...args} />;

export const Normal = Template.bind({});
Normal.args = {label: 'Normal', value: 'Alpha'};

export const RightAligned = Template.bind({});
RightAligned.args = {label: 'Right Aligned', value: 'Alpha', alignRight: true};

export const Active = Template.bind({});
Active.args = {label: 'Active', value: 'Alpha', active: true};

export const AllStates = () => (
	<div className="Story__group">
		<OutputField label="Normal" value="Alpha" />
		<OutputField label="Right Aligned" value="Alpha" alignRight />
		<OutputField label="Active" value="Alpha" active />
	</div>
);
AllStates.storyName = 'All states';

export default {
	title: 'Components/OutputField',
	component: OutputField,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
