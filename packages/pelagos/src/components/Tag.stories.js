import Tag, {types} from './Tag';

export default {
	title: 'Components/Tag',
	component: Tag,
};

export const Default = {args: {size: 'md', type: 'red', children: 'red'}};

export const All = {
	render: () => (
		<div style={{flexDirection: 'row', flexFlow: 'wrap', gap: '8px'}}>
			{types.map((type) => (
				<Tag key={type} size="md" type={type}>
					{type}
				</Tag>
			))}
		</div>
	),
	parameters: {
		controls: {hideNoControlsWarning: true},
	},
};
