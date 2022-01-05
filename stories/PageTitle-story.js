import {PageTitle} from '../src';

const Template = (args) => <PageTitle {...args} />;

export const Normal = Template.bind({});
Normal.args = {title: 'Test'};

export default {
	title: 'Components/PageTitle',
	component: PageTitle,
};
