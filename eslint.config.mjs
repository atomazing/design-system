import { globalIgnores } from 'eslint/config'
import { defineAtomazingConfig } from '@atomazing-org/eslint-config'

export default [
	globalIgnores([
		'public/**',
		'dev-dist/**',
		'src/templates/**',
		'src/vite-env.d.ts',
		'node_modules',
		'dist',
		'plopfile.js',
		'workbox.config.ts',
		'manifest.ts',
		'vite.config.ts',
	]),
	...defineAtomazingConfig({ dirname: import.meta.dirname }),
	{
		rules: {
			'unicorn/prefer-top-level-await': 'off',
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
