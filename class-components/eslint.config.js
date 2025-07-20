import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import { globalIgnores } from 'eslint/config';

export default tseslint.config([
  globalIgnores(['dist', 'node_modules/**', 'build/**']),
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    extends: [...tseslint.configs.recommended],
    plugins: {
      react: reactPlugin,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      '@typescript-eslint': tsEslintPlugin,
      prettier: prettierPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      'no-undef': 'warn',
      'prettier/prettier': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': [
        'error',
        { ignoreRestArgs: false },
      ],
      'no-warning-comments': [
        'warn',
        {
          terms: ['todo', 'fixme', 'xxx', 'hack', 'bug'],
          location: 'anywhere',
        },
      ],
    },
  },
]);
