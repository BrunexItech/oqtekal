import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      // Features stay self-contained: import a feature through its public index only.
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features/*/*'],
              message: 'Import features through their public index, e.g. "@/features/team".',
            },
          ],
        },
      ],
    },
  },
  {
    // Tests may reach into feature internals, and Playwright's fixture `use()` is not a React hook.
    files: ['tests/**'],
    rules: { 'no-restricted-imports': 'off', 'react-hooks/rules-of-hooks': 'off' },
  },
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'media/**',
      'brand/**',
      'src/payload-types.ts',
      'src/migrations/**',
      'src/app/(payload)/**',
      'playwright-report/**',
      'test-results/**',
    ],
  },
]

export default eslintConfig
