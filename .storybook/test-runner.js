import {injectAxe, checkA11y} from 'axe-playwright';

export default {
	preVisit(page) {
		return injectAxe(page);
	},
	postVisit(page) {
		return checkA11y(
			page,
			'#storybook-root',
			{axeOptions: {rules: {'empty-table-header': {enabled: false}, 'heading-order': {enabled: false}}}},
			false,
			'html',
			{outputDir: 'build', reportFileName: 'a11y-audit.html'}
		);
	},
};
