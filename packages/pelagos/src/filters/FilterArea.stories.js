import {useCallback, useState} from 'react';

import ButtonMenu from '../menu/ButtonMenu';
import MenuItem from '../menu/MenuItem';
import buildSimpleSuggestionsParser from '../functions/buildSimpleSuggestionsParser';

import FilterArea from './FilterArea';
import FilterChip from './FilterChip';
import TextFilterEditor from './TextFilterEditor';

export default {
	title: 'Components/FilterArea',
	component: FilterArea,
};

const validate = () => null;
const getEmptySuggestions = () => ({suggestions: []});

const WiredComponent = (args) => {
	const [filters, setFilters] = useState({foo: ['a', 'b'], bar: null});
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
			<FilterArea {...args}>
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

export const Default = {
	args: {
		expanded: true,
	},
	render: WiredComponent,
};
