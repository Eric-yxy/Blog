module.exports = function(app){
    app.get('/' , function(req , res){
        res.render('/posts');
    });
    app.use('/main' , require('./main'));
    app.post('/express' , require('./api').api);
}