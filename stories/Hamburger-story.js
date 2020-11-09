import {Hamburger} from '../src';

const Template = (args) => <Hamburger {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

export const Active = Template.bind({});
Active.args = {active: true};

export const AllStates = () => (
	<div className="Story__group">
		<Hamburger />
		<Hamburger active />
	</div>
);
AllStates.storyName = 'All states';

export default {
	title: 'Hamburger',
	component: Hamburger,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
