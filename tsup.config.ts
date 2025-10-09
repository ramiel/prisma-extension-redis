import { defineConfig } from 'tsup';

const isProduction = process.env.NODE_ENV === 'production';
const pkg = require("./package.json");
const external = Object.keys(pkg.peerDependencies || {})
  .concat(Object.keys(pkg.optionalDependencies || {}))
  .reduce<string[]>((acc, entry) => {
    if (entry.includes("/")) {
      return [...acc, entry, entry.split("/")[0]];
    }
    return [...acc, entry];
  }, []);

export default defineConfig(({ watch = false }) => ({
  clean: true,
  dts: true,
  entry: {
    index: 'src/index.ts',
  },
  external,
  format: ['cjs', 'esm', 'iife'],
  minify: isProduction,
  sourcemap: isProduction,
  watch,
}));
