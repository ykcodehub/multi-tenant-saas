const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    devServer: {
        port: 3001
    },
    output: {
        publicPath: 'auto'
    },
    module: {
        rules: [
            { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'supportApp',
            filename: 'remoteEntry.js',
            exposes: {
                './Support': './src/Support'
            },
            shared: {
                react: { singleton: true, eager: true },
                'react-dom': { singleton: true, eager: true }
            }
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
