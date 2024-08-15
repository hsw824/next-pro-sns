import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import typescriptEslint from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

export default [
	{ ignores: ['**/*.css', '**/*.scss'] },
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
	{
		languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
		globals: { ...globals.browser, ...globals.node },
		parser: typescriptEslint,
	},
	{
		plugins: {
			'@typescript-eslint': typescriptPlugin,
		},
		env: {
			browser: true,
			es2021: true,
			node: true,
		},
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReactConfig,
];
