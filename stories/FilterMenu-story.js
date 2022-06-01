import {useRef} from 'react';
import identity from 'lodash-es/identity';

import {FilterMenu, IconButton, timesThin, useEditorPositioner} from '../src';

const options = ['Foo', 'Bar', 'Baz'];
const style = {position: 'absolute', flexDirection: 'row', alignItems: 'center', backgroundColor: 'var(--layer)'};

// eslint-disable-next-line react/prop-types
const Editor = ({name, buttonId, trackId, onClose}) => {
	const editorRef = useRef(null);
	useEditorPositioner(editorRef, buttonId, trackId);
	return (
		<div style={style} ref={editorRef}>
			Mock Editor for {name} <IconButton icon={timesThin} tooltipText="Close" onClick={onClose} />
		</div>
	);
};

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
