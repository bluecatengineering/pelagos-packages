import loremIpsumShort from '../../stories/LoremIpsumShort';

import FilterChip from './FilterChip';

export default {
	title: 'Components/FilterChip',
	component: FilterChip,
};

export const Default = {args: {name: 'Default', children: 'default value'}};

export const LongValue = {
	args: {name: 'Long', children: loremIpsumShort},
	decorators: [
		(Story) => (
			<div style={{width: '16em'}}>
				<Story />
			</div>
		),
	],
};
