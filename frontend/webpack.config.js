const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
    clean: true,
  },
  devServer: {
    static: {directory: path.join(__dirname, 'dist'),},
    open: true, 
    hot: true,
    historyApiFallback: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource', // Handles image files as assets
        generator: {
          filename: 'assets/images/[name][ext][query]', // Store images in the "assets/images" folder
        },
      },
      {
        test: /\.scss$/,
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader',],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource', // Handles image files as assets
        generator: {
          filename: 'assets/images/[name][ext][query]', // Store images in the "assets/images" folder
        },
      },
    ],
  },
  devtool: 'source-map', // Enable source maps
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    })
  ],
};
