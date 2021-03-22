module.exports = {
	stories: ['../stories/*-story.js'],
	addons: [
		{name: '@storybook/addon-essentials', options: {backgrounds: false}},
		'@storybook/addon-a11y',
		'storybook-addon-themes',
	],
};
