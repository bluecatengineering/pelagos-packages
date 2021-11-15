import {LayerContext} from '../src/components/Layer';

import './preview.less';

const initialTheme = sessionStorage.getItem('theme') || 'white';
const initialLayer = sessionStorage.getItem('layer') || '0';
const setTheme = (theme) => (sessionStorage.setItem('theme', theme), (document.documentElement.dataset.theme = theme));
const setLayer = (layer) => (sessionStorage.setItem('layer', layer), (document.documentElement.dataset.layer = layer));

export const parameters = {
	controls: {expanded: true, hideNoControlsWarning: true},
};

export const globalTypes = {
	theme: {
		name: 'Theme',
		description: 'Preview theme',
		defaultValue: initialTheme,
		toolbar: {
			icon: 'photo',
			items: [
				{value: 'white', title: 'White'},
				{value: 'cg00', title: 'Cool Gray 00'},
				{value: 'yg100', title: 'Cyan Gray 100'},
				{value: 'g100', title: 'Gray 100'},
			],
		},
	},
	layer: {
		name: 'Layer',
		description: 'Background layer',
		defaultValue: initialLayer,
		toolbar: {
			icon: 'listunordered',
			items: [
				{value: '0', title: 'Layer 00'},
				{value: '1', title: 'Layer 01'},
				{value: '2', title: 'Layer 02'},
				{value: '3', title: 'Layer 03'},
			],
		},
	},
};

export const decorators = [
	(Story, {globals: {theme, layer}}) => (
		setTheme(theme),
		setLayer(layer),
		(
			<LayerContext.Provider value={+layer}>
				<Story />
			</LayerContext.Provider>
		)
	),
];
