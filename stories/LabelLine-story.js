import {LabelLine} from '../src';

const Template = (args) => <LabelLine {...args} />;

export const Normal = Template.bind({});
Normal.args = {text: 'Normal'};

export const Optional = Template.bind({});
Optional.args = {text: 'Optional', optional: '(optional)'};

export const Notice = Template.bind({});
Notice.args = {text: 'Notice', notice: '(notice)'};

export default {
	title: 'Components/LabelLine',
	component: LabelLine,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
