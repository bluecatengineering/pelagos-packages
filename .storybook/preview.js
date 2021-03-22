import {addDecorator} from '@storybook/react';
import {withThemes} from 'storybook-addon-themes/react';

import colors from '../defs/colors.yaml';
import './preview.less';

import coreDark from '!!raw-loader!less-loader!../less/core-dark.less';
import coreLight from '!!raw-loader!less-loader!../less/core-light.less';
import spinnerDark from '!!raw-loader!less-loader!../less/spinner-dark.less';
import spinnerLight from '!!raw-loader!less-loader!../less/spinner-light.less';

const dark = coreDark + spinnerDark;
const light = coreLight + spinnerLight;
const styleElement = document.createElement('style');

const setTheme = (name) => (styleElement.textContent = name === 'dark' ? dark : light);

document.head.appendChild(styleElement);
setTheme('dark');

addDecorator(withThemes);

export const parameters = {
	themes: {
		clearable: false,
		Decorator: ({theme: {name}, children}) => (setTheme(name), children),
		list: [
			{name: 'dark', color: colors.oxford.value, default: true},
			{name: 'light', color: colors.white.value},
		],
	},
	controls: {expanded: true, hideNoControlsWarning: true},
};
