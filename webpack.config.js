'use strict'

const webpack = require('webpack')
const path = require('path')
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


const config = module.exports = {
  entry: {
    app: path.resolve(__dirname, './src'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash:8].js',
  },
  plugins: [
    new CleanObsoleteChunks(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
      }
    }),
    new HtmlWebpackPlugin({
      title: 'OMG Hot',
      template: './src/theme/index.ejs',
    }),
    new ExtractTextPlugin({
      filename: '[name].[hash:8].css',
      disable: false,
      allChunks: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              }
            },
            'postcss-loader',
            'resolve-url-loader',
            'sass-loader?sourceMap',
          ],
        }),
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=10240&publicPath=assets/',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ]
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.jsx'],
  },
};

if (process.env.NODE_ENV === 'production') {
  config.plugins = [
    ...config.plugins,
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ]
}