const common = require('./webpack.common')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OtmCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('./config/index.json')

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].[contenthash:8].bundle.js'
    },
    devtool: 'none',
    optimization: {
        usedExports: true,
        minimize: true,
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [
            new TerserWebpackPlugin(),
            new OtmCssAssetsWebpackPlugin()
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    // 'vue-style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            BASE_URL: JSON.stringify(config.production.BASE_URL)
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public' },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].bundle.css'
        })
    ]
})
