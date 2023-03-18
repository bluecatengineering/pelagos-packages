import {Breadcrumb, BreadcrumbItem} from '../src';

export default {
	title: 'Components/Breadcrumb',
	component: Breadcrumb,
	subcomponents: {BreadcrumbItem},
	decorators: [
		(Story) => (
			<div style={{marginLeft: '24px'}}>
				<Story />
			</div>
		),
	],
};

export const Default = {
	args: {
		title: 'Test',
		children: [
			<BreadcrumbItem key="a" href="#">
				First
			</BreadcrumbItem>,
			<BreadcrumbItem key="b">
				<a href="#">Second</a>
			</BreadcrumbItem>,
		],
	},
};
