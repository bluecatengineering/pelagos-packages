import {addDecorator} from '@storybook/react';
import {withThemes} from 'storybook-addon-themes/react';

import colors from '../defs/colors.yaml';
import './preview.less';

const setTheme = (name) => (document.documentElement.dataset.theme = name);

setTheme('dark');

addDecorator(withThemes);

export const parameters = {
	themes: {
		clearable: false,
		Decorator: ({theme: {name}, children}) => (setTheme(name), children),
		list: [
			{name: 'dark', color: colors.cyan.palette[9], default: true},
			{name: 'light', color: colors.white.value},
		],
	},
	controls: {expanded: true, hideNoControlsWarning: true},
};
