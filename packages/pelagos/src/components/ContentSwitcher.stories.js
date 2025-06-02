import {useState} from 'react';

import ContentSwitcher from './ContentSwitcher';
import ContentSwitcherButton from './ContentSwitcherButton';

export default {
	title: 'Components/ContentSwitcher',
	component: ContentSwitcher,
	render: (args) => {
		const [selected, setSelected] = useState(args.selected);
		return <ContentSwitcher {...args} selected={selected} onChange={setSelected} />;
	},
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
