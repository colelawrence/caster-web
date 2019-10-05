// @ts-check
/* eslint-disable */

const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

const USE_SOURCEMAPS = true
const IS_DEV = true

/** @param {string[]} seg */
const root = (...seg) => path.resolve(__dirname, ...seg)

/** @type {import("webpack").WebpackOptions} */
module.exports = {
  entry: {
    main: './src/bootstrap.tsx',
    theme: './src/theme/bootstrap.tsx',
  },
  mode: IS_DEV ? 'development' : 'production',
  output: {
    filename: './[name].js',
    path: root('dist'),
    // webpack has the ability to generate path info in the output bundle. However, this puts garbage collection pressure on projects that bundle thousands of modules.
    pathinfo: USE_SOURCEMAPS,
    devtoolModuleFilenameTemplate:
      'source://[namespace]/[resource-path]?[loaders]',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: require.resolve('ts-loader'),
          options: {
            transpileOnly: IS_DEV,
            experimentalWatchApi: IS_DEV,
            compilerOptions: {
              sourceMap: USE_SOURCEMAPS,
              baseUrl: root(),
            },
          },
        },
        include: [root('src')],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: IS_DEV,
            },
          },
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              // Prefer `dart-sass`
              implementation: require('sass'),
            },
          },
        ],
        include: [root('src')],
      },
    ],
  },
  devServer: {
    contentBase: root('static'),
    compress: true,
    port: 9000,
    public: 'caster-cdn.ngrok.io',
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': 'https://caster.ngrok.io',
    },
    allowedHosts: ['https://caster.ngrok.io', 'https://caster-cdn.ngrok.io'],
  },
  devtool: IS_DEV
    ? USE_SOURCEMAPS
      ? 'inline-source-map'
      : 'eval'
    : 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    // @ts-ignore
    plugins: [new TsconfigPathsPlugin({ configFile: root('tsconfig.json') })],
  },
  resolveLoader: {
    // make our custom shiki-loader (syntax highlighter) available
    modules: ['node_modules'],
  },
  optimization: IS_DEV
    ? {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      }
    : {
        minimize: true,
        removeEmptyChunks: true,
        usedExports: true,
      },
  plugins: [
    new webpack.DllReferencePlugin({
      context: root(),
      // @ts-ignore
      manifest: require('./static/lib/library.json'),
    }),

    new webpack.DefinePlugin({
      CDN_PREFIX: '"https://caster-cdn.ngrok.io"',
    }),

    new CopyWebpackPlugin([{ from: root('static'), to: root('dist') }]),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],
}
