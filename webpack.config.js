var HTMLWebpackPlugin = require('html-webpack-plugin'),
    HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
        template: './app/index.html',
        filename: 'index.html',
        inject: 'body'
    });
module.exports = {
    entry: './app/index.tsx',
    watch: false,
    module: {
        rules: [{
                test: /\.tsx$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader'
            }, {
                test: /\.less$/,
                exclude: /node_modules/,
                loaders: [
                    'style-loader',
                    'css-loader?url=false',
                    'less-loader'
                ]
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    devtool: "inline-source-map",
    resolve: {
        extensions: [
            '.ts', '.tsx', '.js', '.json'
        ]
    },
    mode: 'development',
    externals: {
        'react-dom': 'ReactDOM',
        'react': 'React'
    },
    plugins: [HTMLWebpackPluginConfig]
};