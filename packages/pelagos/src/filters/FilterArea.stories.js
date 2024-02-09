import {useCallback, useState} from 'react';
import {action} from '@storybook/addon-actions';

import ButtonMenu from '../menu/ButtonMenu';
import MenuItem from '../menu/MenuItem';
import buildSimpleSuggestionsParser from '../functions/buildSimpleSuggestionsParser';

import FilterArea from './FilterArea';
import FilterChip from './FilterChip';
import TextFilterEditor from './TextFilterEditor';

const handleClick = action('onClick');

export default {
	title: 'Components/FilterArea',
	component: FilterArea,
};

export const Default = {
	args: {
		expanded: true,
		children: [
			<FilterChip key="foo" name="Foo">
				foo values
			</FilterChip>,
			<FilterChip key="bar" name="Bar">
				bar values
			</FilterChip>,
			<FilterChip key="baz" name="Baz">
				baz values
			</FilterChip>,
			<FilterChip key="baa" name="Baa">
				baa values
			</FilterChip>,
			<li key="menu">
				<ButtonMenu text="Add filter" type="ghost">
					<MenuItem onClick={handleClick}>Option 1</MenuItem>
					<MenuItem onClick={handleClick}>Option 2</MenuItem>
				</ButtonMenu>
			</li>,
		],
	},
};

const validate = () => null;
const getEmptySuggestions = () => ({suggestions: []});

const WiredComponent = () => {
	const [filters, setFilters] = useState({foo: null});
	const [editKey, setEditKey] = useState(null);
	const handleFilterEditClick = useCallback((event) => setEditKey(event.target.closest('[data-key]').dataset.key), []);
	const handleFilterRemoveClick = useCallback(
		(event) => {
			const key = event.target.closest('[data-key]').dataset.key;
			const newFilters = {...filters};
			delete newFilters[key];
			setFilters(newFilters);
		},
		[filters]
	);
	const handleMenuClick = useCallback(
		(event) => {
			const key = event.target.dataset.key;
			if (!(key in filters)) {
				setFilters({...filters, [key]: null});
			}
			setEditKey(key);
		},
		[filters]
	);
	const handleEditorClose = useCallback(() => setEditKey(null), []);
	const handleEditorSave = useCallback(
		(value) => (setFilters({...filters, [editKey]: value}), setEditKey(null)),
		[editKey, filters]
	);
	return (
		<>
			<FilterArea>
				{Object.entries(filters).map(([key, value]) => (
					<FilterChip
						key={key}
						id={`${key}-chip`}
						name={key}
						data-key={key}
						onEditClick={handleFilterEditClick}
						onRemoveClick={handleFilterRemoveClick}>
						{value ? value.join(', ') : '(all)'}
					</FilterChip>
				))}
				<li key="menu">
					<ButtonMenu text="Add filter" type="ghost">
						<MenuItem text="Foo" data-key="foo" onClick={handleMenuClick} />
						<MenuItem text="Bar" data-key="bar" onClick={handleMenuClick} />
						<MenuItem text="Baz" data-key="baz" onClick={handleMenuClick} />
					</ButtonMenu>
				</li>
			</FilterArea>
			{editKey && (
				<TextFilterEditor
					id="filterEditor"
					label={editKey}
					list={filters[editKey]}
					placeholder="Type something"
					getSuggestions={getEmptySuggestions}
					parseInput={buildSimpleSuggestionsParser(validate)}
					chipId={`${editKey}-chip`}
					onClose={handleEditorClose}
					onSave={handleEditorSave}
					forArea
				/>
			)}
		</>
	);
};

export const TryItOut = {
	name: 'Try it out!',
	render: () => <WiredComponent />,
};
