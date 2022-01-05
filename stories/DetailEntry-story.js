import {DetailEntry} from '../src';

const Template = (args) => <DetailEntry {...args} />;

export const Normal = Template.bind({});
Normal.args = {label: 'Label', value: 'value'};

export default {
	title: 'Components/DetailEntry',
	component: DetailEntry,
};
