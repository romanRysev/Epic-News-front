const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {
  entry: { main: './src/index.js', articles: './src/articles.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: { loader: 'babel-loader' },
      exclude: /node_modules/,
    },
    {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
    },
    {
      test: /\.(png|jpg|gif|ico|svg)$/,
      use: [{
        loader: 'file-loader',
        options: { name: './images/[name].[ext]' },
      },
      {
        loader: 'image-webpack-loader',
        options: {},
      },
      ],
    },
    {
      test: /\.(eot|ttf|woff|woff2)$/,
      use: [{
        loader: 'file-loader',
        options: { name: './vendor/[name].[ext]' },
      }],
    },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/articles.html',
      filename: 'articles.html',
    }),
    new WebpackMd5Hash(),
  ],
};
