import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
  moduleName: 'AngularComponentTestSupport',
  entry: 'lib/index.ts',
  dest: 'dist/index.js',
  context: 'window',
  format: 'umd',
  sourceMap: 'inline',
  plugins: [
    typescript(
      {
        exclude: ['node_modules/**']
      }
    ),
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs({
      exclude: ['node_modules/**']
    })
  ],
  external: function (id) {
    return id.startsWith('@angular');
  },
  globals: {
    'jasmine': 'jasmine'
  }
};
