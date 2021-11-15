import identity from 'lodash-es/identity';

import {FilterList, IconButton, timesThin} from '../src';

const filters = {foo: 'foo values', bar: 'bar values', baz: 'baz values'};

const getValues = (key, values) => values;

// eslint-disable-next-line react/prop-types
const Editor = ({name, onClose}) => (
	<div style={{flexDirection: 'row'}}>
		Mock Editor for {name} <IconButton icon={timesThin} tooltipText="Close" onClick={onClose} />
	</div>
);

const Template = (args) => <FilterList {...args} />;

export const Normal = Template.bind({});
Normal.args = {filters, getFilterTitle: identity, getValues, filterEditor: Editor};

export default {
	title: 'FilterList',
	component: FilterList,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
