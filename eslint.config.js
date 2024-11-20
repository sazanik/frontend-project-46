import globals from 'globals';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import eslintConfigPrettier from 'eslint-config-prettier';

import { __dirname } from './globalVariables.js';

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

export default [
  {
    settings: {
      'import/resolver': {
        node: {
          'extensions': ['.js', '.ts', '.json'],
          moduleDirectory: ['node_modules', 'src'],
        },
      },
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      ...importPlugin.configs.recommended.rules,
    },
  },
  ...compat.extends('airbnb-base'),
  {
    rules: {
      'no-underscore-dangle': [
        'error',
        {
          allow: ['__filename', '__dirname'],
        },
      ],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'always',
        },
      ],
      'import/named': ['error'],
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/prefer-default-export': 'off',
      'max-len': ['warn', { code: 120 }],
      'no-unused-vars': 'error',
      'no-console': 'off',
      'no-debugger': 'warn',
      'prefer-const': 'error',
      'import/no-unresolved': 'error',
      'import/order': [
        'error', {
          'newlines-between': 'always',
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        }],
      indent: ['error', 2],
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
    },
  },
  eslintConfigPrettier,
];
