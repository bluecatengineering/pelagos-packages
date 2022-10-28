import {EditorGrid} from '../src';

const Template = (args) => <EditorGrid {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	children: [<div key="1">One</div>, <div key="2">Two</div>, <div key="3">Three</div>, <div key="4">Four</div>],
};

export default {
	title: 'Components/EditorGrid',
	component: EditorGrid,
};
