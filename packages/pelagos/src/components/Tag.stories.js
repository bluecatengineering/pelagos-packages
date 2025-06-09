import Wikis from '@carbon/icons-react/es/Wikis';

import Tag, {types} from './Tag';

export default {
	title: 'Components/Tag',
	component: Tag,
};

export const Default = {args: {size: 'md', type: 'red', text: 'red', onClick: null, onRemove: null}};

export const WithIcon = {args: {size: 'md', type: 'red', text: 'red', icon: Wikis, onClick: null, onRemove: null}};

export const WithClickHandler = {args: {size: 'md', type: 'red', text: 'red', onRemove: null}};

export const WithRemove = {args: {size: 'md', type: 'red', removeTitle: 'Remove tag', text: 'red', onClick: null}};

export const All = {
	render: () => (
		<div style={{flexDirection: 'row', flexFlow: 'wrap', gap: '8px'}}>
			{types.map((type) => (
				<Tag key={type} size="md" type={type} text={type} />
			))}
		</div>
	),
	parameters: {
		controls: {hideNoControlsWarning: true},
	},
};
