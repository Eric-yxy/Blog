let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let extractCss = new ExtractTextPlugin('./stylesheets/[name].css');

module.exports = {
    entry : {
        managerIndex:'./public/managerIndex.js'
    },
    output : {
        path : path.resolve(__dirname, './dist'),
        filename : '[name].js',
        publicPath : '../../dist/',
        chunkFilename : '[name].chunk.js'
    },
    module : {
        loaders : [
            {
                test : /\.js$/ ,
                loader : 'babel-loader' ,
                exclude : /node_modules/,
                query : { 
                    presets : ['react' , 'es2015'],
                    plugins : [
                        [
                            'import' , {
                                libraryName : 'antd',
                                style : 'css'
                            }
                        ]
                    ]
                }
            },
            {
                test : /\.[s]?css$/,
            //     loader : extractCss.extract([
            //     'css-loader',
            //     'sass-loader'
            // ])
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use : ['css-loader' , 'sass-loader']
              // "style-loader", "css-loader?modules"
                })
            },
            {
                test : /\.less$/,
                use : ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'less-loader']
                })
            }, 
            {
                test : /\.(png|jpg)$/,
                loader : 'url-loader?limit=8192'
            }
        ]
    },
    plugins : [
        extractCss,
        // {
        //     "libraryName": "antd",
        //     "libraryDirectory": "lib",   // default: lib
        //     "style": true
        // }  
    ]

};