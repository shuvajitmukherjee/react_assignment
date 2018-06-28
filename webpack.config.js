var HTMLWebpackPlugin = require('html-webpack-plugin'),
    HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
        template: './app/index.html',
        filename: 'index.html',
        inject: 'body'
    });
module.exports = {
    entry: './app/index.tsx',
    module: {
        rules: [{
            test: /\.tsx$/,
            exclude: /node_modules/,
            loader: 'awesome-typescript-loader'
        }, {
            enforce: 'pre',
            test: /\.js$/,
            loader: 'source-map-loader'
        }]
    },
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    devtool: "source-map",
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