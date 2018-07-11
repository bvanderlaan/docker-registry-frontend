const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractSass = new MiniCssExtractPlugin({
  filename: '[name].[hash].css',
  disable: process.env.NODE_ENV === 'development',
});

const jsonFiles = new CopyWebpackPlugin([
  { from: 'app/*.json', to: '', flatten: true },
]);

const indexHTML = new HtmlWebpackPlugin({
  template: 'app/index.html',
});

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: './app/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: '[name].[hash].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [{
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true,
        },
      }],
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env'],
          plugins: ['angularjs-annotate'],
        },
      },
    }, {
      test: /\.css/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        'css-loader',
      ],
    }, {
      test: /\.(ttf|eot|svg|woff|woff2)$/, loader: 'file-loader?name=[name].[ext]&outputPath=fonts/',
    }, {
      test: /\.(png)$/, loader: 'file-loader?name=[name].[ext]&outputPath=images/',
    }],
  },
  plugins: [
    extractSass,
    jsonFiles,
    indexHTML,
  ],
  devServer: {
    historyApiFallback: true,
    port: 9000,
    host: '0.0.0.0',
    proxy: {
      '/v2': {
        secure: false,
        xforward: false,
        headers: {
          'x-custom-added-header': 'custom-value',
        },
        target: `http://${process.env.DOCKER_REGISTRY_HOST || 'localhost'}:${process.env.DOCKER_REGISTRY_PORT || 5000}`,
      },
    },
  },
};
