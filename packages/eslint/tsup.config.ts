import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    base: './src/base.ts',
    nextjs: './src/next.ts',
    react: './src/react.ts'
  },
  dts: true,
  clean: true,
  format: ['esm']
});
