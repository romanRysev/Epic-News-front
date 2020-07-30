const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: { main: './src/js/index.js', articles: './src/js/articles.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
{
  test: /\.css$/,
  use:  [{
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../',
    },
  }, 'css-loader', 'postcss-loader']
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
    ]
},
plugins: [
  new MiniCssExtractPlugin({
    filename: './styles/[name].[contenthash].css',
  }),
  new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: require('cssnano'),
    cssProcessorPluginOptions: {
            preset: ['default'],
    },
    canPrint: true
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

devServer: {
  https: true,
  proxy: {
    "/api": {
      target: "http://localhost:8080"
    }
  }
}
};