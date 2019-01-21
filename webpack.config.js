const path = require('path');
const os = require('os');

const APP_DIR = path.resolve(__dirname, './src');
const BUILD_DIR = path.resolve(__dirname, './docs');
const DLL_DIR = path.resolve(__dirname, './dll');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

const styledComponentsTransformer = createStyledComponentsTransformer();

const smp = new SpeedMeasurePlugin();



/**
 * @todo
 * add optimisation
 * https://slack.engineering/keep-webpack-fast-a-field-guide-for-better-build-performance-f56a5995e8f1
 */
const dllManifest = path.join(DLL_DIR, 'vendor-manifest.json');
module.exports = () => {

  return smp.wrap({
    entry: {
      app: ['./src/index.tsx'],
    },
    devtool: 'cheap-module-eval-source-map',
    output: {
      path: BUILD_DIR,
      filename: '[name].js',
    },
    devServer: {
      stats: 'minimal',
      hot: true,
      contentBase: APP_DIR,
      port: 8081,
    },
    node: {
      fs: 'empty',
    },
    stats: 'none',

    module: {
      rules: [{
          test: /\.(tsx|ts)$/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }, {
            loader: 'ts-loader',
            options: {
              allowTsInNodeModules: true,
              getCustomTransformers: () => ({
                before: [styledComponentsTransformer]
              }),
            },
          }, ],
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ],  
        },
        {
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
          },
        },

      ],
    },
    resolve: {
      alias: {

      },
      extensions: ['.js', '.html', '.tsx', '.ts', 'd.ts'],
      plugins: [new TsconfigPathsPlugin({
        configFile: 'tsconfig.json'
      })],
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {},
      }),
      new HtmlWebpackPlugin({
        title: 'Development mode',
        template: 'assets/dev.index.ejs',
        chunksSortMode: 'none',
      }),

      new webpack.DllReferencePlugin({
        context: './docs',
        manifest: require(dllManifest),
      }),
    ],
  });
};