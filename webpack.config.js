const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    name: 'apple-clone-setting',
    mode: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
    devtool: 'eval', // hidden-source-map
    resolve: {
      extensions: ['.js']
    },
    entry: {
      app: ['./study/js/main'] // 입력
    },
    devServer: {
      contentBase: path.join(__dirname, "apple-clone"),
    },
    module: {
        rules: [{
          test: /\.js?/,
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  browsers: ['> 5% in KR'],
                },
                debug: true,
              }],
            ],
          }
        }, {
          test: /\.css?/,
          loader: [MiniCssExtractPlugin.loader, 'css-loader'],
        }],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
          debug: true 
        }),
        new MiniCssExtractPlugin({
          filename: 'css/style.css',
        }),
    ],
    output: {
        path: path.join(__dirname, 'apple-clone/static'),
        filename: 'app.js',
        publicPath: '/apple-clone/static/'
    }, // 출력
};