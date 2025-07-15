const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    devServer: {
        port: 3000
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
            name: 'shell',
            remotes: {
                supportApp: 'supportApp@http://localhost:3001/remoteEntry.js'
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
