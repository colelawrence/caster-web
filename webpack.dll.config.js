// @ts-check
/* eslint-disable */

const path = require('path')
const webpack = require('webpack')

const USE_SOURCEMAPS = true

/** @param {string[]} seg */
const root = (...seg) => path.resolve(__dirname, ...seg)

/** @type {(isDev: boolean) => import("webpack").Configuration} */
module.exports = isDev => ({
  entry: {
    library: ['react', 'rxjs', 'csx', 'typestyle'],
  },
  mode: 'production',
  output: {
    filename: './[name].dll.js',
    path: root('static/lib'),
    library: '[name]',
    // webpack has the ability to generate path info in the output bundle. However, this puts garbage collection pressure on projects that bundle thousands of modules.
    pathinfo: USE_SOURCEMAPS,
    devtoolModuleFilenameTemplate:
      'source://[namespace]/[resource-path]?[loaders]',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },
  optimization: {
    minimize: true,
    removeEmptyChunks: true,
    usedExports: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      CDN_PREFIX: '"https://caster-cdn.ngrok.io"',
    }),
    new webpack.DllPlugin({
      name: '[name]',
      path: root('static/lib/[name].json'),
    }),
  ],
})
