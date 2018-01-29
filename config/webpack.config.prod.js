const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function generateConfig (options) {
    const fileName = options.min ? 'lewy.min.js' : 'lewy.js'

    const config = {
        entry: './src/index.js',

        output: {
            path: path.join(__dirname, '../dist'),
            filename: fileName
        },

        plugins: [],

        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: [
                        'babel-loader',
                        'eslint-loader'
                    ],
                    exclude: /node_modules/
                },
            ]
        }
    }

    if (options.min) {
        config.plugins.push(
            new UglifyJsPlugin()
        )
    }

    return config
}

const prodConfig = generateConfig({ min: false })
const prodConfigMinimized = generateConfig({ min: true })

if (process.argv[2] === '--env.min') {
    module.exports = prodConfigMinimized
} else {
    module.exports = prodConfig
}
