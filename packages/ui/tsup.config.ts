import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: {
    index: 'src/index.ts'
  },
  banner: {
    js: "'use client'"
  },
  format: ['cjs', 'esm'],
  dts: true,
  ...options
}));
