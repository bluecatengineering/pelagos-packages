import {LinkButton} from '../src';

const Template = (args) => <LinkButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {href: '#', text: 'Primary', type: 'primary'};

export const Secondary = Template.bind({});
Secondary.args = {href: '#', text: 'Secondary', type: 'secondary'};

export const Tertiary = Template.bind({});
Tertiary.args = {href: '#', text: 'Tertiary', type: 'tertiary'};

export const Ghost = Template.bind({});
Ghost.args = {href: '#', text: 'Ghost', type: 'ghost'};

export const Disabled = Template.bind({});
Disabled.args = {href: '#', text: 'Disabled', disabled: true};

export default {
	title: 'Components/LinkButton',
	component: LinkButton,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
