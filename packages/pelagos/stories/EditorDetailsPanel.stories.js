import {EditorDetailsPanel} from '../src';

const item = {id: 'item', name: 'Test'};

export default {
	title: 'Components/EditorDetailsPanel',
	component: EditorDetailsPanel,
	parameters: {layout: 'fullscreen'},
};

export const Default = {
	args: {id: 'test', item, showButtons: true, children: <div>Some details.</div>},
};

export const WithButtons = {
	args: {
		id: 'test',
		item,
		children: [<div key="details">Some details.</div>, <div key="buttons">Some buttons.</div>],
	},
};
