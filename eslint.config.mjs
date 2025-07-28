import {defineConfig} from 'eslint/config';
import regexpPlugin from 'eslint-plugin-regexp';
import tseslint from 'typescript-eslint';
import blueCatNode from '@bluecateng/eslint-config-node';
import blueCatReact from '@bluecateng/eslint-config-react';

export default defineConfig([
	blueCatReact,
	regexpPlugin.configs['flat/recommended'],
	{
		rules: {
			'react/no-unknown-property': ['error', {ignore: ['onPointerDown']}],
			'regexp/no-unused-capturing-group': 'off',
		},
		settings: {
			react: {
				version: '19',
			},
			formComponents: ['Form'],
		},
	},
	{
		files: ['**/*.stories.js'],
		rules: {
			'react-hooks/rules-of-hooks': 'off',
		},
	},
	{
		...blueCatNode,
		files: [
			'scripts/**/*.js',
			'packages/*/scripts/**/*.js',
			'packages/analyze-imports/**/*.js',
			'packages/jest-helpers/**/*.js',
		],
		languageOptions: {
			sourceType: 'script',
		},
		rules: {
			...blueCatNode.rules,
			strict: ['warn', 'global'],
		},
	},
	{
		files: ['packages/*/src/**/*.d.ts'],
		extends: [tseslint.configs.recommended],
	},
	{
		files: ['eslint.config.mjs'],
		rules: {
			'import/extensions': ['error', 'ignorePackages'],
		},
	},
	{
		ignores: ['build/**', '**/dist/**'],
	},
]);
