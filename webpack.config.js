const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.jsx',
  ],
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
  },
  resolve: {
    modules: [
      path.resolve(__dirname),
      'node_modules',
      './src/components',
      './src/containers',
    ],
    alias: {
      App: 'src/App.jsx',
      styles: 'src/styles/style.sass',
    },
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loaders: [
        'babel-loader',
        'eslint-loader',
      ],
      exclude: /node_modules/,
    }, {
      test: /\.s(a|c)ss$/,
      use: [{
        loader: 'style-loader',
        options: { sourceMap: true },
      }, {
        loader: 'css-loader',
        options: { sourceMap: true },
      }, {
        loader: 'postcss-loader',
        options: {
          plugins: () => [autoprefixer],
          sourceMap: true,
        },
      }, {
        loader: 'sass-loader',
        options: {
          outputStyle: 'expanded',
          sourceMap: true,
        },
      }],
    }, {
      test: /\.(gif|jpe?g|png|svg)$/i,
      loader: 'url-loader',
      options: {
        limit: 2000,
      },
    }],
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    hot: true,
    overlay: true,
    port: 3000,
    watchContentBase: true,
  },
  externals: {
    // these lines are required for Enzyme
    'react/addons': true,
    'react/lib/ReactContext': 'window',
    'react/lib/ExecutionEnvironment': true,
  },
  devtool: 'cheap-module-eval-source-map',
};
