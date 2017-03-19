var express = require('express');
var checkLogin = require('../middlewares/check').checkLogin;

var router = express();

router.get('/index' , function(req , res){
    res.render('index.jade');
});
router.get('/manager' , function(req ,res){
    res.render('manager.jade');
});
router.get('/userPage' , function(req ,res){
    var isLogin = checkLogin(req , res);
    if(!isLogin){
        res.redirect('/main/index');
        return;
    };
    console.log(req.query.currentUser);
    res.cookie('currentUser' , req.query.currentUser);
    console.log('why');
    res.render('userPage.jade');
});
module.exports = router;