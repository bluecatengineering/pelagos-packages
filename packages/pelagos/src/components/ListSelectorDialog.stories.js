import {useCallback, useState} from 'react';
import {Canvas, Controls, Description, Subtitle, Title} from '@storybook/blocks';

import ListSelectorDialog from './ListSelectorDialog';
import Button from './Button';

const headers = {foo: 'Foo', bar: 'Bar', baz: 'Baz', oof: 'Oof'};

const args = {
	title: 'Select columns',
	emptyText: 'You must add at least one column to the list.',
	allItemsRemovedText: 'The list of columns is now empty. You must add at least one column to the list.',
	saveText: 'Update columns',
	items: ['foo', 'bar'],
	allItems: ['foo', 'bar', 'baz', 'oof'],
	defaultItems: ['bar', 'baz'],
	getLabel: (key) => headers[key],
};

export default {
	title: 'Components/ListSelectorDialog',
	component: ListSelectorDialog,
	parameters: {
		controls: {hideNoControlsWarning: true},
		docs: {
			page: () => (
				<>
					<Title />
					<Subtitle />
					<Description />
					<Canvas of={TryItOut} />
					<Controls />
				</>
			),
		},
	},
};

export const Default = {
	args,
};

export const TryItOut = {
	args,
	name: 'Try it out!',
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks -- story
		const [visible, setVisible] = useState(false);
		// eslint-disable-next-line react-hooks/rules-of-hooks -- story
		const show = useCallback(() => setVisible(true), []);
		// eslint-disable-next-line react-hooks/rules-of-hooks -- story
		const hide = useCallback(() => setVisible(false), []);
		return (
			<>
				<Button text="Show dialog" type="primary" onClick={show} />
				{visible && <ListSelectorDialog {...args} onClose={hide} onSave={hide} />}
			</>
		);
	},
};
