import {addons} from '@storybook/addons';
import {create} from '@storybook/theming';

addons.setConfig({
	theme: create({
		base: 'light',
		brandTitle: 'Pelagos',
		appBg: '#f4f4f4',
		fontBase: 'Open Sans, sans-serif',
		textColor: '#161616',
		textInverseColor: '#ffffff',
	}),
});
