var webpack = require('webpack');

module.exports = {
    entry : [
        './public/js/init_index.js'
    ],
    output : {
        path : './public/js',
        filename : 'test.js'
    },
    module : {
        loaders : [
            { test : /\.js$/ ,
                loader : 'babel' ,
                exclude : /node_modules/,
                query : { presets : ['react' , 'es2015']}
            }
        ]
    },

};