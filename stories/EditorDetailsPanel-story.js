import {EditorDetailsPanel} from '../src';

const item = {id: 'item', name: 'Test'};

const Template = (args) => <EditorDetailsPanel {...args} />;

export const Normal = Template.bind({});
Normal.args = {id: 'test', item, showButtons: true, children: <div>Some details.</div>};

export default {
	title: 'Components/EditorDetailsPanel',
	component: EditorDetailsPanel,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
