const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const path = require('path');

const srcBase = __dirname;
const srcDir = `${srcBase}/src`;
const cssDir = `${srcBase}/css`;
const imagesDir = `${srcBase}/images`;
const buildDir = path.join(srcBase, 'build');

module.exports = {
  context: srcDir,
  entry: ['babel-polyfill', './index.js'],
  output: {
    path: buildDir,
    filename: '[name]-[hash].js',
  },
  resolve: {
    alias: {
      // this will enable us to use 'src' as a prefix for imports
      src: srcDir,
      css: cssDir,
      images: imagesDir,
    },
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        // Preprocess our own .less files
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        // Preprocess css files
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.svg$/,
        loader: 'babel-loader!svg-react-loader',
      },
      {
        test: /\.(jpg|png|gif|ico)$/,
        use: [
          'url-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              mozjpeg: {
                progressive: true,
              },
              optiPng: {
                optimizationLevel: 7,
              },
            },
          },
        ],
      },
    ],
  },
  devtool: 'source-map',
  devServer: {
    host: 'localhost',
    port: 3000,
    hot: true,
    contentBase: buildDir,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html',
      // favicon: './src/public/favicon.ico'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CaseSensitivePathsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};
