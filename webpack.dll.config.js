const path = require("path");
const DLL_DIR = path.resolve(__dirname, "./dll");
const webpack = require("webpack");
module.exports = {
  entry: {
    vendor: [
      'styled-components',
      'react',
      'redux',
      'react-dom',
      'redux-thunk',     
    ]
  },
  output: {
    path: DLL_DIR,
    filename: "[name].dll.js",
    library: '[name]',

  },
  node: {
    fs: "empty"
  },
  stats: 'none',

  resolve: {
    modules: ['node_modules'],
  },
  plugins: [
    new webpack.DllPlugin({
      context: './',
      name: '[name]',
      path: path.join(DLL_DIR, '[name]-manifest.json'),
    })
  ]

}