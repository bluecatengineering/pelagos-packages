import {useState} from 'react';

import loremIpsumShort from '../../stories/LoremIpsumShort';

import VerticalTabList from './VerticalTabList';
import VerticalTab from './VerticalTab';

export default {
	title: 'Components/VerticalTabList',
	component: VerticalTabList,
	subcomponents: {VerticalTab},
	decorators: [
		(Story) => (
			<div style={{maxWidth: '20em'}}>
				<Story />
			</div>
		),
	],
};

export const Default = {
	args: {
		selectedIndex: 0,
		children: [
			<VerticalTab key="a">Tab label one</VerticalTab>,
			<VerticalTab key="b">Tab label two</VerticalTab>,
			<VerticalTab key="c" secondaryLabel="Optional">
				Tab label three
			</VerticalTab>,
			<VerticalTab key="d" secondaryLabel="Optional" disabled>
				Tab label four
			</VerticalTab>,
			<VerticalTab key="e" error>
				{`Tab label five - ${loremIpsumShort}`}
			</VerticalTab>,
		],
	},
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks -- story
		const [index, setIndex] = useState(args.selectedIndex);
		return <VerticalTabList {...args} selectedIndex={index} onChange={setIndex} />;
	},
};
