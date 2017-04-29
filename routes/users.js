var http = require('http');
var mongoose = require('mongoose');
var fs = require('fs');
var multiparty = require('multiparty');
var async = require('async');


var checkLogin = require('../middlewares/check.js').checkLogin;
var ObjectId = mongoose.Types.ObjectId;
var schemaObj = require('../database/database_schema');
var userSchema = schemaObj.userSchema,
    blogSchema = schemaObj.blogSchema
    commentSchema = schemaObj.commentSchema;
var UserModel = mongoose.model('user' , userSchema),
    blogModel = mongoose.model('blog' , blogSchema),
    commentModel = mongoose.model('comment' , commentSchema);
var resObj = {'msg' : 'true'};

var uploadImg = function(req , res){
    var form = new multiparty.Form({
        uploadDir : './public/img/blog_img/'
    });
    form.parse(req , function(err , fields , files){
        if(err) return console.log(err);
        console.log(files);
        var inputImg = files.upload[0];
        var uploadedPath = inputImg.path;
        var newPath = 'public/img/blog_img/' + new Date().getTime() + inputImg.originalFilename;
        fs.renameSync(uploadedPath , newPath );
        res.send(newPath);
    })
}

var deleteImg = function(req , res){

}

var login = function(req , res , dbConnect){
    var resObj = {
        'msg': 'true',
        data : {}
    };
    console.log(req.body.password == '');
    console.log('login successfully');
    var data = req.body,
        loginType = 'pwd';
    if(data.username == req.session.username){
        data = {'username' : data.username};
        loginType = 'auto';
    }
    if(data.password == ''){
        loginType = 'auto';
    }
    UserModel.find( data , function(err , item){
        if(err) res.send({'msg' : 'error'});
        //console.log(item[0]._id);
        if(err) {
            return console.err(err);
        }
        if(item[0] == undefined){
            resObj.msg = 'error';
        }else{
            console.log(req.session);
            console.log(req.headers.cookie);
            req.session.username = resObj.data.username = item[0].username;
            res.cookie('username' , resObj.data.username);
            resObj.data._id = item[0]._id;
            resObj.data.attentionNumber = item[0].attention.length;
            resObj.data.isAttentionNumber = item[0].isAttention.length;
            resObj.data.blogNumber = item[0].blogNumber;
            resObj.data.attention = item[0].attention;
            resObj.data.store = item[0].store;
            resObj.data.likes = item[0].likes;
            resObj.data.userDetail = item[0].detail
            //req.session.cookie
        }
        resObj.loginType = loginType;
        console.log(req.session);
        res.send(resObj);
    })

}

var register = function(req , res , dbConnect){
    var resObj = {
        'msg' : 'true'
    }
    var data = req.body;
    var user = new UserModel(data);
    user.save(function(err , res){
        if(err) return console.error(err);
        console.log(res);
    });
    console.log('register successfully')
    res.send(resObj);
}

var isLogin = function(req , res , dbConnect){
    var resObj = {
        'msg' : 'true'
    }
    console.log(req.session);
    console.log(resObj);
    if(req.session.username){
        res.send(resObj);
    }else{
        resObj.msg = 'false';
        res.send(resObj);
    }
}

var loginOut = function(req , res){
    var resObj = {
        'msg' : 'true'
    };
    res.clearCookie('username');
    req.session.username = null;
    console.log(req.session);
    res.send(resObj);
}

var getUserData = function(req , res){
    var resObj = {
        'msg' : 'true',
        data : {}
    };
    var username = req.body.username;
    UserModel.getUserData(username , (err , item) =>{
        if(err) return console.error(err);
        console.log(item);
        resObj.data._id = item[0]._id;
        resObj.data.attentionNumber = item[0].attention.length;
        resObj.data.isAttentionNumber = item[0].isAttention.length;
        resObj.data.blogNumber = item[0].blogNumber;
        resObj.data.attention = item[0].attention;
        resObj.data.userDetail = item[0].detail
        res.send(resObj);
    });
}

var getAllUserData = function(req , res){
  var resObj = {
    'msg' : 'true',
    'data' : {}
  }
  let cb = (err , item) => {
    if(err) return console.err(err);
    let result = {};
    result.data = item;
    for(let a in result){
      console.log(a);
      delete result[a].password;
    }
    res.send(result);
  }
  UserModel.getAllUserData(cb);
}

var getBlogList = function(req , res){
    var resObj = {
        'msg' : 'true'
    };
    var type = req.body.type,
        number = Number(req.body.blogNumber),
        skipNumber = Number(req.body.rank) * number,
        blogAuthorArray = req.body['blogAuthorArray[]'];
    console.log(req.body);
    console.log(typeof(blogAuthorArray));

    if(type == 'all'){
        let cb = (err , item)=>{
          resObj.data = item;
          res.send(resObj);
        }
        blogModel.findAllBlog(cb);
    }
    else if(type == 'likes'){
        let cb = (err , item)=>{
            console.log(item);
            resObj.data = item;
            res.send(resObj);
        };
        blogModel.findByLikes(number , skipNumber , cb);
    }else if(type == 'personal' && typeof(blogAuthorArray) == 'string'){
        blogModel.findByOneUser(number , skipNumber , blogAuthorArray , function(err,item){
            resObj.data = item;
            console.log(item);
            res.send(resObj);
        });
    }else if(type == 'personal'){
        console.log(typeof(blogAuthorArray));
        let getBlogList = function(username , cb){
            blogModel.find({'author' : username} , function(err , item){
                cb(null , item);
            })
        };
        let compare = function(x , y ){
            if(x.date < y.date){
                return 1;
            }else if(x.date > y.date){
                return -1;
            }else{
                return 0;
            }
        };
        async.map(blogAuthorArray , function(username , cb){
            getBlogList(username , cb);
        } , function(err , item){
            let result = [];
            result = item[0];
            console.log(item);
            for(let i = 1 ; i < item.length ; i ++){
                result = result.concat(item[i]);
            }
            result.sort(compare);
            result = result.slice(skipNumber , skipNumber + number);
            resObj.data = result;
            res.send(resObj);
        });
    }else{ //other type(eg :

    }

}

var addOneBlog = function(req , res){
    //var isLogin = checkLogin(req , res , next);
    //if(!isLogin){
    //    return;
    //}
    var data = req.body,
        userId;
    data.img = [];
    if(typeof(data['img[]']) == 'string' && data['img[]']){
        data.img.push(data['img[]']);
    }else{
        data.img = data['img[]'];
    }
    console.log(data);
    var addBlogNum = () =>UserModel.update({'username' : data.author} , {$inc : {'blogNumber' : +1 }} , function(){});
    var getUserData = () => {
        UserModel.find({'username': data.author}, function (err, item) {
            userId = item[0]._id;
            data.authorId = userId;
        });
    };
    var addBlog = (commentId) =>{
        data._comment = commentId;
        var blog = new blogModel(data);
        console.log(data);
        blog.save();
    }
    var createComment = new Promise((resolve)=> {
        var commentDoc = new commentModel({});
        commentDoc.save((err , item)=>resolve(item._id));
    });
    createComment
        .then(addBlog)
        .then(addBlogNum)
        .then(getUserData)
        .then(() => {res.send(resObj)});

}

var addComment = function(req , res){
    // 验证登录
    //var isLogin = checkLogin(req , res , next);
    //if(!isLogin){
    //    return;
    //}
    var data = req.body;
    console.log(data);
    //var blogModel = mongoose.model('blog' , schema);
    //blogModel.update({'_id' : ObjectId('58762fab1af4d2408c1ffc4c')} , {'$addToSet' : {'comments' : data}});
    //blogModel.update({
    //    '_id' : ObjectId('58762fab1af4d2408c1ffc4c')
    //} , {
    //    $push : {
    //        'comments' : {'array' : '123'}
    //    }
    //} , function(err , number , raw){
    //    console.log( number);
    //    console.log('the raw is' + raw);
    //});
    //blogModel.findOneAndUpdate({'_id' : '58762fab1af4d2408c1ffc4c'} , { $push : {'comments' : data}} , function(err){
    //        if(err)console.log(err);
    //});

    //blogModel.findOne({ '_id' : data.blogId}).populate('_comment').exec(function(err , item){
    //    if(err) console.log(err);
    //    console.log(item._comment._id);
    //});

    let getBlog = new Promise((resolve , err) =>{
        blogModel.findOne({'_id' : data.blogId}).populate('_comment').exec((err , item) =>{resolve(item._comment._id)});
    });
    let addComment = (commentId) =>{
        commentModel.update({'_id' : ObjectId(commentId)} , {$push : {'commentArray' : data}} , () =>{});
    };
    let addCommentNum = ()=>{
        blogModel.update({'_id' : data.blogId} , {$inc : {'commentNumber' : +1}} , (err , item) =>{console.log(item)})
    };
    getBlog
        .then(addComment)
        .then(addCommentNum)
        .then(() => {    res.send(resObj);});

}

var addLikes = function(req , res ){
    //var isLogin = checkLogin(req , res , next);
    //if(!isLogin){
    //    return;
    //}
    //var data = req.body;
    //blogModel.update({'_id' : data.blogId} , {$inc : {'likes' : +1}} , function(err , item){
    //    if(err) console.error(err);
    //    console.log(item);
    //});
    //UserModel.update({'username' : data.username} , {$push : {'likes' : {'blogId' : data.blogId}}} ,function(){});
    //res.send(resObj);


    var resObj = {
        msg : true,
        data : {}
    }
    var data = req.body;
    let changeUserData = new Promise((resolve) =>{
        UserModel.findOne({'username' : data.username} , (err , item) =>{
            let hasCollection = item.likes.includes(data.blogId);
            if(hasCollection){
                UserModel.minusLikes( data.username , data.blogId , ()=>{
                    resolve(true);
                })
            }else{
                UserModel.addLikes( data.username , data.blogId , ()=>{
                    resolve(false);
                })
            }
        });
    });
    let changeBlogData = (hasCollection) =>{
        console.log(hasCollection);
        if(hasCollection){
            blogModel.minusLikes(data.blogId);
        }else{
            blogModel.addLikes(data.blogId);
        }
    };
    changeUserData
        .then(changeBlogData)
        .then(() =>{
            res.send(resObj);
        })
}

var addAttention = function(req , res){
    //var isLogin = checkLogin(req , res , next);
    //if(!isLogin){
    //    return;
    //}
    var data = req.body;
    UserModel.update({'username' : data.username} , {$push : {'attention' : data.attentionUserName}} , function(){});
    UserModel.update({'username' : data.attentionUserName} , {$push : {'isAttention' : data.username}} , function(){});
    res.send(resObj);
}

var addCollection = function(req , res){
    var resObj = {
        msg : true,
        data : {}
    }
    var data = req.body;
    let changeUserData = new Promise((resolve) =>{
        UserModel.findOne({'username' : data.username} , (err , item) =>{
            let hasCollection = item.store.includes(data.blogId);
            if(hasCollection){
                UserModel.minusCollection( data.username , data.blogId , ()=>{
                    resolve(true);
            })
            }else{
                UserModel.addCollection( data.username , data.blogId , ()=>{
                    resolve(false);
                })
            }
        });
    });
    let changeBlogData = (hasCollection) =>{
        console.log(hasCollection);
        if(hasCollection){
            blogModel.minusCollection(data.blogId);
        }else{
            blogModel.addCollection(data.blogId);
        }
    };
    changeUserData
        .then(changeBlogData)
        .then(() =>{
            res.send(resObj);
        })
}

var getComment = function(req , res){
    let resObj = {
        'msg' : true,
        data : {}
    }
    var data = req.body;
    blogModel.findOne({ '_id' : ObjectId(data.blogId)}).populate('_comment author').exec(function(err , item){
        if(err) console.log(err);
        let compare = (x , y ) =>{
            if(x.date < y.date){
                return 1;
            }else if(x.date > y.date){
                return -1;
            }else{
                return 0;
            }
        };
        resObj.data = item._comment.commentArray;
        console.log(item);
        resObj.data.sort(compare);
        res.send(resObj);
    });
}

var updateUserDetail = function(req , res){
    var resObj = {
        msg : 'true'
    }
    var data = JSON.parse(req.body.data);
    //console.log(JSON.parse(req.body));
    var userData = data.userData;
    var username = data.username;
    console.log(userData);
    UserModel.updateUserDetail(username , userData , ()=>{res.send(resObj)});
}



exports.uploadImg = uploadImg;
exports.login = login;
exports.register = register;
exports.isLogin = isLogin;
exports.loginOut = loginOut;
exports.getUserData = getUserData;
exports.getAllUserData = getAllUserData;
exports.getBlogList = getBlogList;
exports.addOneBlog = addOneBlog;
exports.addComment = addComment;
exports.addLikes = addLikes;
exports.addAttention = addAttention;
exports.addCollection = addCollection;
exports.getComment = getComment;
exports.updateUserDetail = updateUserDetail;
