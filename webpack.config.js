const path = require('path');

module.exports = {
    entry: './src/Index.js',
    output: {
        path: path.resolve('dist/'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname,'src'),
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env','@babel/preset-react']
                }
            }
        ]
    }
}
