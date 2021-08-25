import {DetailsSectionTitle} from '../src';

const Template = (args) => <DetailsSectionTitle {...args} />;

export const Normal = Template.bind({});
Normal.args = {title: 'Test'};

export default {
	title: 'DetailsSectionTitle',
	component: DetailsSectionTitle,
};
