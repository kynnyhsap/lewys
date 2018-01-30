const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const dir = 'server'

const devConfig = {
    entry: `./${dir}/main.js`,

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: `./${dir}/index.html`
        })
    ],

    devServer: {
        contentBase: path.join(__dirname, dir),
        port: 1488,
        open: true,
        noInfo: true,
        overlay: true
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {}
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },

    resolve: {
        extensions: ['*', '.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
    },

    devtool: '#eval-source-map'
}

module.exports = devConfig
