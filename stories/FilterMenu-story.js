import identity from 'lodash-es/identity';

import {FilterMenu, IconButton, timesThin} from '../src';

const options = ['Foo', 'Bar', 'Baz'];

// eslint-disable-next-line react/prop-types
const Editor = ({name, onClose}) => (
	<div style={{flexDirection: 'row'}}>
		Mock Editor for {name} <IconButton icon={timesThin} tooltipText="Close" onClick={onClose} />
	</div>
);

const Template = (args) => <FilterMenu {...args} />;

export const Normal = Template.bind({});
Normal.args = {options, getOptionText: identity, filterEditor: Editor};

export const Empty = Template.bind({});
Empty.args = {options: [], getOptionText: identity, filterEditor: Editor};

export default {
	title: 'Components/FilterMenu',
	component: FilterMenu,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
