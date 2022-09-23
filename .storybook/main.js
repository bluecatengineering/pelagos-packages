module.exports = {
	stories: ['../packages/*/stories/*-story.js'],
	addons: [{name: '@storybook/addon-essentials', options: {backgrounds: false}}, '@storybook/addon-a11y'],
};
