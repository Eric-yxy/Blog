let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let extractCss = new ExtractTextPlugin('./stylesheets/[name].css');


module.exports = {
    entry : {
        managerIndex:'./public/managerIndex.js'
    },
    output : {
        path : './dist',
        filename : '[name].js',
        publicPath : '../../',
        chunkFilename : '[name].chunk.js'
    },
    module : {
        loaders : [
            {
                test : /\.js$/ ,
                loader : 'babel' ,
                exclude : /node_modules/,
                query : { presets : ['react' , 'es2015']}
            },
            {
                test : /\.[s]?css$/,
                exclude : /node_modules/,
                loader : extractCss.extract([
                'css-loader',
                'sass-loader'
            ])
            },
            {
                test : /\.(png|jpg)$/,
                loader : 'url-loader?limit=8192'
            }
        ]
    },
    plugins : [
        extractCss
    ]

};