import {setLocale as setPelagosLocale} from '../packages/pelagos/src';

import './preview.less';

/* eslint-disable no-console -- not production code */

const setTheme = (theme) => (document.documentElement.dataset.theme = theme);
const setLocale = (locale) => setPelagosLocale(locale).catch(console.error);

export default {
	parameters: {
		actions: {argTypesRegex: '^on[A-Z].*'},
		options: {
			storySort: (a, b) => {
				const order = {
					Welcome: 0,
					Figma: 1,
					Icons: 2,
					Styles: 3,
					Components: 4,
					hooks: 5,
					functions: 6,
					Experimental: 7,
					'Experimental Charts': 8,
					Deprecated: 9,
				};
				const [aGroup, aName = ''] = a.title.split('/');
				const [bGroup, bName = ''] = b.title.split('/');
				return order[aGroup] - order[bGroup] || aName.localeCompare(bName);
			},
		},
		a11y: {
			test: 'error',
			config: {
				rules: [
					{
						// Carbon uses empty headers for actions
						// this is not a WCAG violation: https://dequeuniversity.com/rules/axe/4.8/empty-table-header
						id: 'empty-table-header',
						selector: 'th:not([aria-label])',
					},
				],
			},
		},
	},

	globalTypes: {
		theme: {
			name: 'Theme',
			description: 'Preview theme',
			defaultValue: 'white',
			toolbar: {
				icon: 'paintbrush',
				items: [
					{value: 'white', title: 'White'},
					{value: 'cg00', title: 'Cool Gray 00'},
					{value: 'yg100', title: 'Cyan Gray 100'},
					{value: 'g100', title: 'Gray 100'},
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

	decorators: [(Story, {globals: {theme, locale}}) => (setTheme(theme), setLocale(locale), (<Story />))],
};
