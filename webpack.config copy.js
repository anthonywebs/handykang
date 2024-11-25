const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const entry = {};
fs.readdirSync('./js').forEach(file => {
if (file.endsWith('.js')) {
    const name = file.replace('.js', '');
    entry[name] = `./js/${file}`;
}
});

module.exports = {
  mode: 'production', // Change to 'development' if needed
//   entry: './js/index.js',
  entry: entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // Add loaders for image files if needed
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
  performance: {
    maxAssetSize: 10000000, // 10MB
    maxEntrypointSize: 10000000, // 10MB
  },
  devtool: 'source-map', // Optional: Adds source maps for better debugging
};
