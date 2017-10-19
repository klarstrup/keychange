import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";
import ramda from "rollup-plugin-ramda";
import commonjs from "rollup-plugin-commonjs";

const cjs = () =>
  commonjs({
    // non-CommonJS modules will be ignored, but you can also
    // specifically include/exclude files
    include: "node_modules/**" // Default: undefined
  });

const babelConfigBrowser = {
  presets: [
    [
      "env",
      {
        targets: {
          browsers: ["> 1%"]
        },
        modules: false
      }
    ]
  ]
};

const babelConfigNode = {
  exclude: "node_modules/**", // only transpile our source code
  presets: [
    [
      "env",
      {
        targets: {
          node: "4"
        },
        modules: false
      }
    ]
  ]
};

export default [
  {
    input: "src/index.js",
    name: "keychange",
    output: {
      file: "dist/keychange.umd.js",
      format: "umd"
    },
    plugins: [
      resolve(),
      cjs(),
      babel(babelConfigBrowser),
      ramda({})
    ]
  },
  {
    input: "src/index.js",
    name: "keychange",
    output: {
      file: "dist/keychange.umd.min.js",
      format: "umd"
    },
    plugins: [
      resolve(),
      cjs(),
      babel(babelConfigBrowser),
      ramda({}),
      uglify()
    ]
  },
  {
    input: "src/index.js",
    output: {
      file: "dist/keychange.cjs.js",
      format: "cjs"
    },
    plugins: [
      babel(babelConfigNode),
      ramda({})
    ]
  },
  {
    input: "src/index.js",
    output: {
      file: "dist/keychange.es.js",
      format: "es"
    },
    plugins: [
      babel(babelConfigNode),
      ramda({})
    ]
  }
];
