import {EditorGrid} from '../src';

export default {
	title: 'Components/EditorGrid',
	component: EditorGrid,
};

export const Default = {
	args: {
		children: [<div key="1">One</div>, <div key="2">Two</div>, <div key="3">Three</div>, <div key="4">Four</div>],
	},
};
