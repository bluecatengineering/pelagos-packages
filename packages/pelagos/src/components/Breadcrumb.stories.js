import {action} from 'storybook/actions';

import MenuItem from '../menu/MenuItem';

import Breadcrumb from './Breadcrumb';
import BreadcrumbItem from './BreadcrumbItem';
import IconMenu from './IconMenu';

const handleClick = action('onClick');

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
					<MenuItem text="Second" onClick={handleClick} />
					<MenuItem text="Third" onClick={handleClick} />
					<MenuItem text="Fourth" onClick={handleClick} />
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
