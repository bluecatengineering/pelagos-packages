import {addons} from '@storybook/manager-api';
import {create} from '@storybook/theming';

addons.setConfig({
	theme: create({
		base: 'light',
		brandTitle: 'Pelagos',
		appBg: '#f4f4f4',
		fontBase: 'Roboto, sans-serif',
		textColor: '#161616',
		textInverseColor: '#ffffff',
	}),
});
