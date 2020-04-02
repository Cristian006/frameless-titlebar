import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import localResolve from 'rollup-plugin-local-resolve';
import filesize from 'rollup-plugin-filesize';
import url from 'rollup-plugin-url'
import svgr from '@svgr/rollup'

import pkg from './package.json'

const INPUT_FILE_PATH = 'src/index.js';

const PLUGINS = [
  postcss({ extract: true }),
  babel({
    exclude: 'node_modules/**'
  }),
  localResolve(),
  resolve({
    browser: true
  }),
  commonjs(),
  filesize(),
  url(),
  svgr()
]

const EXTERNAL = [
  'react',
  'react-dom'
];

const GLOBALS = {
  'react': 'React',
  'react-dom': 'ReactDOM'
};

const OUTPUT_DATA = [
  {
    file: pkg.main,
    format: 'cjs'
  },
  {
    file: pkg.module,
    format: 'es'
  }
];

export default OUTPUT_DATA.map(({ file, format }) => ({
  input: INPUT_FILE_PATH,
  output: {
    file,
    format,
    globals: GLOBALS,
    sourcemap: true
  },
  external: EXTERNAL,
  plugins: PLUGINS
}));
/*
export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  external: [
    'react',
    'react-dom'
  ],
  plugins: [
    resolve(),
    external(),
    postcss({
      modules: true
    }),
    url(),
    svgr(),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [['env', { modules: false }], 'stage-0', 'react'],
      plugins: ['external-helpers']
      // externalHelpers: true
    }),
    commonjs()
  ]
}
*/
