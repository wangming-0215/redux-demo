const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

const PATHS = {
  app: path.resolve(__dirname, 'src/index.js'),
  build: path.resolve(__dirname, 'build')
};

module.exports = {
  devtool: 'source-map',
  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    hot: true
  },
  entry: {
    app: ['react-hot-loader/patch', PATHS.app]
  },
  output: {
    path: PATHS.build,
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlPlugin({
      title: 'redux',
      filename: 'index.html'
    }),
    new CleanPlugin([PATHS.build])
  ]
};
