import {LayerContext} from '../packages/pelagos/src/components/Layer';
import {setLocale as setPelagosLocale} from '../packages/pelagos/src';

import './preview.less';

/* eslint-disable no-console -- not production code */

const setTheme = (theme) => (document.documentElement.dataset.theme = theme);
const setLayer = (layer) => (document.documentElement.dataset.layer = layer);
const setLocale = (locale) => setPelagosLocale(locale).catch(console.error);

export default {
	parameters: {
		actions: {argTypesRegex: '^on[A-Z].*'},
		options: {
			storySort: {
				order: ['Welcome', 'Styles', 'Icons', 'Components', 'hooks', 'functions'],
			},
		},
	},

	globalTypes: {
		theme: {
			name: 'Theme',
			description: 'Preview theme',
			defaultValue: 'cg00',
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
			defaultValue: '0',
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
		locale: {
			name: 'Locale',
			description: 'Locale',
			defaultValue: 'en',
			toolbar: {
				icon: 'globe',
				items: [
					{value: 'en', right: '🇺🇸', title: 'English'},
					{value: 'es', right: '🇪🇸', title: 'Español'},
				],
			},
		},
	},

	decorators: [
		(Story, {globals: {theme, layer, locale}}) => (
			setTheme(theme),
			setLayer(layer),
			setLocale(locale),
			(
				<LayerContext.Provider value={+layer}>
					<Story />
				</LayerContext.Provider>
			)
		),
	],
};
