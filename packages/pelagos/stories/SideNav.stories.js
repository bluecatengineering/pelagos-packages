import {SideNav, SideNavDivider, SideNavItems, SideNavLink, SideNavMenu, SideNavMenuItem} from '../src';

export default {
	title: 'Components/SideNav',
	component: SideNav,
	subcomponents: {SideNavDivider, SideNavItems, SideNavLink, SideNavMenu, SideNavMenuItem},
	parameters: {layout: 'fullscreen'},
};

export const Default = {
	args: {
		active: true,
		children: (
			<SideNavItems style={{width: '256px'}}>
				<SideNavMenu title="Menu one">
					<SideNavMenuItem>Menu item one/one</SideNavMenuItem>
					<SideNavMenuItem>Menu item one/two</SideNavMenuItem>
				</SideNavMenu>
				<SideNavMenu title="Menu two" expanded>
					<SideNavMenuItem current>Menu item two/one</SideNavMenuItem>
					<SideNavMenuItem>Menu item two/two</SideNavMenuItem>
				</SideNavMenu>
				<SideNavDivider />
				<SideNavLink href="#">Link one</SideNavLink>
				<SideNavLink href="#">Link two</SideNavLink>
			</SideNavItems>
		),
	},
};

export const CollapsedWithCurrent = {
	args: {
		active: true,
		children: (
			<SideNavItems style={{width: '256px'}}>
				<SideNavMenu title="Menu one">
					<SideNavMenuItem>Menu item one/one</SideNavMenuItem>
					<SideNavMenuItem>Menu item one/two</SideNavMenuItem>
				</SideNavMenu>
				<SideNavMenu title="Menu two">
					<SideNavMenuItem current>Menu item two/one</SideNavMenuItem>
					<SideNavMenuItem>Menu item two/two</SideNavMenuItem>
				</SideNavMenu>
				<SideNavDivider />
				<SideNavLink href="#">Link one</SideNavLink>
				<SideNavLink href="#">Link two</SideNavLink>
			</SideNavItems>
		),
	},
};

export const CurrentLink = {
	args: {
		active: true,
		children: (
			<SideNavItems style={{width: '256px'}}>
				<SideNavMenu title="Menu one">
					<SideNavMenuItem>Menu item one/one</SideNavMenuItem>
					<SideNavMenuItem>Menu item one/two</SideNavMenuItem>
				</SideNavMenu>
				<SideNavMenu title="Menu two">
					<SideNavMenuItem>Menu item two/one</SideNavMenuItem>
					<SideNavMenuItem>Menu item two/two</SideNavMenuItem>
				</SideNavMenu>
				<SideNavDivider />
				<SideNavLink href="#">Link one</SideNavLink>
				<SideNavLink href="#" current>
					Link two
				</SideNavLink>
			</SideNavItems>
		),
	},
};
