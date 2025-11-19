import LogoReact from '@carbon/icons-react/es/LogoReact';

import SideNav from './SideNav';
import SideNavDivider from './SideNavDivider';
import SideNavItems from './SideNavItems';
import SideNavLink from './SideNavLink';
import SideNavMenu from './SideNavMenu';
import SideNavMenuItem from './SideNavMenuItem';

export default {
	title: 'Components/SideNav',
	component: SideNav,
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

export const WithIcons = {
	args: {
		active: true,
		children: (
			<SideNavItems style={{width: '256px'}}>
				<SideNavMenu title="Menu one" icon={LogoReact}>
					<SideNavMenuItem>Menu item one/one</SideNavMenuItem>
					<SideNavMenuItem>Menu item one/two</SideNavMenuItem>
				</SideNavMenu>
				<SideNavMenu title="Menu two" icon={LogoReact} expanded>
					<SideNavMenuItem current>Menu item two/one</SideNavMenuItem>
					<SideNavMenuItem>Menu item two/two</SideNavMenuItem>
				</SideNavMenu>
				<SideNavDivider />
				<SideNavLink href="#" icon={LogoReact}>
					Link one
				</SideNavLink>
				<SideNavLink href="#" icon={LogoReact}>
					Link two
				</SideNavLink>
			</SideNavItems>
		),
	},
};
