const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
    entry: {
        popup: './src/popup/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "js/[name]/[hash:8].js"
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                options: {
                    presets: ["@babel/react", "@babel/env"],
                    plugins: [
                        ["import", {
                            "libraryName": "antd",
                            "libraryDirectory": "es",
                            "style": "css"
                        }], // import antd
                        [
                            "@babel/plugin-proposal-decorators",
                            {
                                "legacy": true
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'sass-loader',
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'popup',
            filename: 'popup.html',
            chunks: ['popup'],
            template: 'public/index.ejs'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name]/[hash:8].css',
            chunkFilename: 'css/[name]/[id].[hash:8].css',
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: __dirname + '/public/manifest.json',
                to: __dirname + '/dist/manifest.json'
            }
        ]),
        new CopyWebpackPlugin([
            {
                from: __dirname + '/public/manifest.json',
                to: __dirname + '/dist/manifest.json'
            },
            {
                from: __dirname + '/public/img',
                to: __dirname + '/dist/img'
            },
        ])
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    },
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        hot: true
    },
};

module.exports = config;