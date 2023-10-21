const path = require('path');

module.exports = ({ development }) => ({
    entry: './src/index.ts',
    devtool: development ? 'inline-source-map' : false,
    mode: development ? 'development' : 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: {
            name : "SmoothZoom",
            type : 'umd',
            export : 'default'
        },
        umdNamedDefine: true,
        globalObject: 'typeof self === \'undefined\' ? this : self',
    },
    resolve: {
        extensions: ['.ts'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'ts-loader'],
            },
        ],
    }
});