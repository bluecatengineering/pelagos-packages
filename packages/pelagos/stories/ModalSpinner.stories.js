import {ModalSpinner} from '../src';

const Template = (args) => <ModalSpinner {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

export default {
	title: 'Components/ModalSpinner',
	component: ModalSpinner,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
