module.exports = {
	stories: ['./welcome.stories.mdx', '../packages/*/stories/*-story.js'],
	addons: [{name: '@storybook/addon-essentials', options: {backgrounds: false}}, '@storybook/addon-a11y'],
};
