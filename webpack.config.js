const path = require('path');
const webpack = require('webpack');

module.exports = {
    name: 'apple-clone-setting',
    mode: 'production',
    devtool: 'eval', // hidden-source-map
    resolve: {
      extensions: ['.js',]
    },
    entry: {
      app: ['./study/js/main'], // 입력
    },
    devServer: {
      contentBase: path.join(__dirname, "/study/public"),
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
        }],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist/'
    }, // 출력
};