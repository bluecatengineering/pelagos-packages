import {useState} from 'react';

import ListSelector from './ListSelector';

const headers = {foo: 'Foo', bar: 'Bar', baz: 'Baz', oof: 'Oof'};

const args = {
	items: ['foo', 'bar'],
	allItems: ['foo', 'bar', 'baz', 'oof'],
	emptyText: 'You must add at least one column to the list.',
	allItemsRemovedText: 'The list of columns is now empty. You must add at least one column to the list.',
	getLabel: (key) => headers[key],
};

export default {
	title: 'Components/ListSelector',
	component: ListSelector,
};

export const Default = {
	args,
	render: (args) => {
		const [items, setItems] = useState(args.items);
		// forcing width to 300px otherwise strings are truncated
		return (
			<div style={{width: '300px'}}>
				<ListSelector {...args} items={items} onChange={setItems} />
			</div>
		);
	},
};
