import colors from '../defs/colors.yaml';
import './preview.less';

export const parameters = {
	backgrounds: {
		default: 'page',
		values: [
			{name: 'page', value: colors.oxford.value},
			{name: 'dialog', value: colors['bg-24'].value},
		],
	},
	controls: {expanded: true, hideNoControlsWarning: true},
};
