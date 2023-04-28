import {action} from '@storybook/addon-actions';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

import ButtonMenu from '../menu/ButtonMenu';
import MenuItem from '../menu/MenuItem';

import FilterArea from './FilterArea';
import FilterChip from './FilterChip';

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
				<ButtonMenu text="Add filter" icon={faPlus} type="ghost">
					<MenuItem onClick={handleClick}>Option 1</MenuItem>
					<MenuItem onClick={handleClick}>Option 2</MenuItem>
				</ButtonMenu>
			</li>,
		],
	},
};
