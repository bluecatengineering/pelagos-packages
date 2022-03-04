import {Collapsible} from '../src';

const content = (
	<div key="content">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
		aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
		Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
		sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
	</div>
);

const Template = (args) => <Collapsible {...args} />;

export const Normal = Template.bind({});
Normal.args = {open: true, children: [<h2 key="header">Test</h2>, content]};

export const Legacy = Template.bind({});
Legacy.args = {open: true, header: 'Test', children: content};

export default {
	title: 'Components/Collapsible',
	component: Collapsible,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
