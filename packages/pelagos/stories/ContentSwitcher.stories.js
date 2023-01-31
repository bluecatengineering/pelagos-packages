import {ContentSwitcher, ContentSwitcherButton} from '../src';

export const Default = (args) => (
	<ContentSwitcher {...args}>
		<ContentSwitcherButton text="First" />
		<ContentSwitcherButton text="Second" />
		<ContentSwitcherButton text="Third" />
		<ContentSwitcherButton text="Fourth" />
	</ContentSwitcher>
);
Default.args = {selected: 0};

export default {
	title: 'Components/ContentSwitcher',
	component: ContentSwitcher,
	subcomponents: {ContentSwitcherButton},
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
