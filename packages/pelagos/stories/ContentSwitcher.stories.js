import {ContentSwitcher, ContentSwitcherButton} from '../src';

export default {
	title: 'Components/ContentSwitcher',
	component: ContentSwitcher,
	subcomponents: {ContentSwitcherButton},
};

export const Default = {
	args: {
		selected: 0,
		children: [
			<ContentSwitcherButton key="0" text="First" />,
			<ContentSwitcherButton key="1" text="Second" />,
			<ContentSwitcherButton key="2" text="Third" />,
			<ContentSwitcherButton key="3" text="Fourth" />,
		],
	},
};
