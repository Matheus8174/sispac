import baseConfig from '@sispac/eslint-config/base';
import nextjsConfig from '@sispac/eslint-config/nextjs';
import reactConfig from '@sispac/eslint-config/react';

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ['.next/**']
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig
];
