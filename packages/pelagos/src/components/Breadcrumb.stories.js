import MenuItem from '../menu/MenuItem';

import Breadcrumb from './Breadcrumb';
import BreadcrumbItem from './BreadcrumbItem';
import IconMenu from './IconMenu';

export default {
	title: 'Components/Breadcrumb',
	component: Breadcrumb,
};

export const Default = {
	args: {
		children: [
			<BreadcrumbItem key="a" href="#">
				First
			</BreadcrumbItem>,
			<BreadcrumbItem key="b" href="#">
				Second page with a very long name
			</BreadcrumbItem>,
		],
	},
};

export const WithOverflowMenu = {
	args: {
		children: [
			<BreadcrumbItem key="a" href="#">
				First
			</BreadcrumbItem>,
			<BreadcrumbItem key="b">
				<IconMenu aria-label="Overflow menu">
					<MenuItem>
						<a href="#">Second</a>
					</MenuItem>
					<MenuItem>
						<a href="#">Third</a>
					</MenuItem>
					<MenuItem>
						<a href="#">Fourth</a>
					</MenuItem>
				</IconMenu>
			</BreadcrumbItem>,
			<BreadcrumbItem key="e" href="#">
				Fifth
			</BreadcrumbItem>,
			<BreadcrumbItem key="f" href="#">
				Sixth
			</BreadcrumbItem>,
		],
	},
};

export const WithTitle = {
	args: {
		title: 'Test',
		children: [
			<BreadcrumbItem key="a" href="#">
				First
			</BreadcrumbItem>,
			<BreadcrumbItem key="b" href="#">
				Second
			</BreadcrumbItem>,
		],
	},
};
