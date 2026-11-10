import l10nSwcPlugin from '@bluecateng/l10n-swc-plugin/config';
import {mergeRsbuildConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';
import {pluginLess} from '@rsbuild/plugin-less';
import {pluginYaml} from '@rsbuild/plugin-yaml';

export default {
	stories: ['./welcome.mdx', '../packages/**/*.@(mdx|stories.js)'],
	addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
	framework: {name: 'storybook-react-rsbuild'},
	rsbuildFinal: (config) =>
		mergeRsbuildConfig(config, {
			plugins: [pluginReact(), pluginLess(), pluginYaml()],
			tools: {
				swc: {jsc: {experimental: {plugins: [l10nSwcPlugin()]}}},
				rspack: (rspackConfig) => {
					rspackConfig.module.rules.push({test: /\.po$/, loader: '@bluecateng/l10n-loader'});
					return rspackConfig;
				},
			},
		}),
};
