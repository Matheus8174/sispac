import baseConfig from '@sispac/eslint-config/base';
import reactConfig from '@sispac/eslint-config/react';

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ['dist/**']
  },
  ...baseConfig,
  ...reactConfig
];
