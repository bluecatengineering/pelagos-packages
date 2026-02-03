import LogoReact from '@carbon/icons-react/es/LogoReact';
import {useState, useCallback} from 'react';

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
	args: {active: true},
};

const useWiredSideNavMenus = (initialState) => {
	const [open, setOpen] = useState(initialState);

	const handleClick = useCallback((event) => {
		const element = event.target.closest('[data-key]');
		if (element) {
			const key = element.dataset.key;
			setOpen((open) => ({...open, [key]: !open[key]}));
		}
	}, []);

	return [open, handleClick];
};

export const Default = {
	render: (args) => {
		const [open, handleClick] = useWiredSideNavMenus({one: false, two: true});
		return (
			<SideNav {...args} onClick={handleClick}>
				<SideNavItems style={{width: '256px'}}>
					<SideNavMenu title="Menu one" expanded={open.one} data-key="one">
						<SideNavMenuItem>Menu item one/one</SideNavMenuItem>
						<SideNavMenuItem>Menu item one/two</SideNavMenuItem>
					</SideNavMenu>
					<SideNavMenu title="Menu two" expanded={open.two} data-key="two">
						<SideNavMenuItem current>Menu item two/one</SideNavMenuItem>
						<SideNavMenuItem>Menu item two/two</SideNavMenuItem>
					</SideNavMenu>
					<SideNavDivider />
					<SideNavLink href="#">Link one</SideNavLink>
					<SideNavLink href="#">Link two</SideNavLink>
				</SideNavItems>
			</SideNav>
		);
	},
};

export const CollapsedWithCurrent = {
	render: (args) => {
		const [open, handleClick] = useWiredSideNavMenus({one: false, two: false});
		return (
			<SideNav {...args} onClick={handleClick}>
				<SideNavItems style={{width: '256px'}}>
					<SideNavMenu title="Menu one" expanded={open.one} data-key="one">
						<SideNavMenuItem>Menu item one/one</SideNavMenuItem>
						<SideNavMenuItem>Menu item one/two</SideNavMenuItem>
					</SideNavMenu>
					<SideNavMenu title="Menu two" expanded={open.two} data-key="two">
						<SideNavMenuItem current>Menu item two/one</SideNavMenuItem>
						<SideNavMenuItem>Menu item two/two</SideNavMenuItem>
					</SideNavMenu>
					<SideNavDivider />
					<SideNavLink href="#">Link one</SideNavLink>
					<SideNavLink href="#">Link two</SideNavLink>
				</SideNavItems>
			</SideNav>
		);
	},
};

export const CurrentLink = {
	render: (args) => {
		const [open, handleClick] = useWiredSideNavMenus({one: false, two: false});
		return (
			<SideNav {...args} onClick={handleClick}>
				<SideNavItems style={{width: '256px'}}>
					<SideNavMenu title="Menu one" expanded={open.one} data-key="one">
						<SideNavMenuItem>Menu item one/one</SideNavMenuItem>
						<SideNavMenuItem>Menu item one/two</SideNavMenuItem>
					</SideNavMenu>
					<SideNavMenu title="Menu two" expanded={open.two} data-key="two">
						<SideNavMenuItem>Menu item two/one</SideNavMenuItem>
						<SideNavMenuItem>Menu item two/two</SideNavMenuItem>
					</SideNavMenu>
					<SideNavDivider />
					<SideNavLink href="#">Link one</SideNavLink>
					<SideNavLink href="#" current>
						Link two
					</SideNavLink>
				</SideNavItems>
			</SideNav>
		);
	},
};

export const WithIcons = {
	render: (args) => {
		const [open, handleClick] = useWiredSideNavMenus({one: false, two: true});
		return (
			<SideNav {...args} onClick={handleClick}>
				<SideNavItems style={{width: '256px'}}>
					<SideNavMenu title="Menu one" icon={LogoReact} expanded={open.one} data-key="one">
						<SideNavMenuItem>Menu item one/one</SideNavMenuItem>
						<SideNavMenuItem>Menu item one/two</SideNavMenuItem>
					</SideNavMenu>
					<SideNavMenu title="Menu two" icon={LogoReact} expanded={open.two} data-key="two">
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
			</SideNav>
		);
	},
};
