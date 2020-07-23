const webpack = require('webpack')
const common = require('./webpack.common')
const { merge } = require('webpack-merge')
const config = require('./config/index.json')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        hotOnly: true,
        contentBase: ['public'],
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            BASE_URL: JSON.stringify(config.development.BASE_URL)
        }),
    ]
})
