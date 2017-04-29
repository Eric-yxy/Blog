var http = require('http'),
    users = require('./users');
var schemaObj = require('../database/database_schema');
var userSchema = schemaObj.userSchema;
var blogSchema = schemaObj.blogSchema;

exports.api = function(req , res , next){
    // mongodb connect
    console.log(req.query.do + '=============');
    //distribute api
    if(req.query.do == 'express.user.uploadImg'){
        users.uploadImg(req , res);
    }

    if(req.query.do == 'express.user.login'){
        users.login(req , res);
    }
    if(req.query.do == 'express.user.register'){
        users.register(req , res);
    }
    if(req.query.do == 'express.user.isLogin'){
        users.isLogin(req , res);
    }
    if(req.query.do == 'express.user.loginOut'){
        users.loginOut(req , res);
    }
    if(req.query.do == 'express.user.getBlogList'){
        users.getBlogList(req , res );
    }
    if(req.query.do == 'express.user.addOneBlog'){
        users.addOneBlog(req , res );
    }
    if(req.query.do == 'express.user.addComment'){
        users.addComment(req , res );
    }
    if(req.query.do == 'express.user.addLikes'){
        users.addLikes(req , res );
    }
    if(req.query.do == 'express.user.addCollection'){
        users.addCollection(req , res );
    }
    if(req.query.do == 'express.user.addAttention'){
        users.addAttention(req , res );
    }
    if(req.query.do == 'express.user.getUserData'){
        users.getUserData(req , res);
    }
    if(req.query.do == 'express.user.getAllUserData'){
        users.getAllUserData(req ,res);
    }
    if(req.query.do == 'express.user.getComment'){
        users.getComment(req , res);
    }
    if(req.query.do == 'express.user.updateUserDetail'){
        users.updateUserDetail(req , res);
    }

}
