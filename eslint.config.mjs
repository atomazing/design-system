import { globalIgnores } from 'eslint/config'
import { defineAtomazingConfig } from '@atomazing-org/eslint-config'

export default [
	globalIgnores([
		'public/**',
		'dev-dist/**',
		'src/templates/**',
		'src/styles/__tests__/**',
		'src/vite-env.d.ts',
		'node_modules',
		'dist',
		'plopfile.js',
		'workbox.config.ts',
		'tsup.config.ts',
		'manifest.ts',
		'vite.config.ts',
		'vitest.config.ts',
		'src/__tests__/**',
		'examples/**',
	]),
	...defineAtomazingConfig({ dirname: import.meta.dirname }),
	{
		settings: {
			'import/resolver': {
				typescript: {
					project: './tsconfig.json',
				},
			},
		},
		rules: {
			'unicorn/prefer-top-level-await': 'off',
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'unicorn/consistent-function-scoping': 'off',
			'import/no-unresolved': [
				'error',
				{
					ignore: ['^virtual:', '^ntc-'],
				},
			],
			'no-restricted-imports': [
				'error',
				{
					paths: [
						{
							name: '@mui/icons-material',
							message: 'Import icons directly to avoid EMFILE issues',
						},
					],
				},
			],
		},
	},
]
