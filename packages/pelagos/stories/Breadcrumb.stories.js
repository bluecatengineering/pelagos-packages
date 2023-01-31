import {Breadcrumb, BreadcrumbItem} from '../src';

const Template = (args) => <Breadcrumb {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	title: 'Test',
	children: [
		<BreadcrumbItem key="a" href="#">
			First
		</BreadcrumbItem>,
		<BreadcrumbItem key="b">
			<a href="#">Second</a>
		</BreadcrumbItem>,
	],
};

export default {
	title: 'Components/Breadcrumb',
	component: Breadcrumb,
	subcomponents: {BreadcrumbItem},
	decorators: [(story) => <div style={{marginLeft: '24px'}}>{story()}</div>],
};
