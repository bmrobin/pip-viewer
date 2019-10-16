const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const srcBase = __dirname;
const srcDir = `${srcBase}/js`;
const cssDir = `${srcBase}/css`;
const buildDir = `${srcBase}/build`;

module.exports = {
  context: srcBase,
  entry: ['babel-polyfill', './js/index.js'],
  output: {
    path: buildDir,
    filename: '[name].js',
    publicPath: buildDir,
  },
  resolve: {
    alias: {
      // this will enable us to use 'src' as a prefix for imports
      src: srcDir,
      css: cssDir,
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
