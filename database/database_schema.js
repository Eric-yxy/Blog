var mongoose = require('mongoose'),
    host = '127.0.0.1',
    port = '27017';
mongoose.Promise = global.Promise;  
mongoose.connect('mongodb://localhost/myblog');


var userSchema = mongoose.Schema({
    username : String,
    password : Number,
    blogNumber : {type : Number , default : 0},
    likes : [],
    attention : [],
    isAttention : [],
    store : [],
    comment : [{type : mongoose.Schema.Types.ObjectId , ref : 'comment'}],
    detail : {
        realName : {type : String , default : ''},
        sex : {type : String , default : '1'},
        birthday : {type : String , default : ''},
        intro : {type : String , default : ''},
        blood : {type : String , default : ''},
        qq : {type : Number , default : ''},
        email : {type : String , default : ''}
    }
});

//get one user data
userSchema.statics.getUserData = function(username , callback){
    this.find({'username' : username} , callback);
};

userSchema.statics.getAllUserData = function(callback){
    this.find({} , callback);
}

//addBlogId to likes
userSchema.statics.addLikes = function(username , blogId , callback){
    this.update({'username' : username} , {$push : {'likes' : blogId}} , callback)
};

//remove blogId in likes
userSchema.statics.minusLikes = function(username , blogId , callback){
    this.update({'username' : username} , {$pull : {'likes' : blogId}} , callback)
};

//update user detail
userSchema.statics.updateUserDetail = function(username , data , callback){
    this.findOne({username : username} , (err , doc) =>{
        console.log(doc);
        doc.set({detail : data});
        doc.save();
        callback();
    })
}

//addBlogId to store
userSchema.statics.addCollection = function(username , blogId , callback){
    this.update({'username' : username} , {$push : {'store' : blogId}} , callback)
};

//remove blogId in store
userSchema.statics.minusCollection = function(username , blogId , callback){
    this.update({'username' : username} , {$pull : {'store' : blogId}} , callback)
};

var blogSchema = mongoose.Schema({
    author : String,
    authorId : String,
    date : String,
    contentText : String,
    likes : {type : Number , default : 0},
    commentNumber : {type : Number , default : 0},
    reprintNumber : {type : Number , default : 0},
    collectionNumber : {type : Number , default : 0},
    img : [],
    _comment : {type : String , ref : 'comment' , default : ''}
});

//addCollection
blogSchema.statics.addLikes = function(blogId){
    this.update({'_id' : blogId} , {$inc : {'likes' : +1}} , ()=>{});
};

//minusCollection
blogSchema.statics.minusLikes = function(blogId){
    this.update({'_id' : blogId} , {$inc : {'likes' : -1}} , ()=>{});
}

//addCollection
blogSchema.statics.addCollection = function(blogId){
    this.update({'_id' : blogId} , {$inc : {'collectionNumber' : +1}} , ()=>{});
};

//minusCollection
blogSchema.statics.minusCollection = function(blogId){
    this.update({'_id' : blogId} , {$inc : {'collectionNumber' : -1}} , ()=>{});
}

//getBlogList  (type likes)
blogSchema.statics.findByLikes = function(number , skipNumber , cb){
    this.find().sort({'likes' : -1}).limit(number).skip(skipNumber).exec(cb);
};

blogSchema.statics.findAllBlog = function(cb){
  this.find().sort({'likes' : -1}).exec(cb);
}

//getBlogList (type personal but have no attention)
blogSchema.statics.findByOneUser = function(number , skipNumber , username , cb){
    this.find({'author' : username}).sort({'date' : -1}).limit(number).skip(skipNumber).exec(cb);
};


var commentSchema = mongoose.Schema({
    commentArray : [{
        author : {type : String , ref : 'user'} ,
        date : String ,
        contentText : String ,
        childComment : [{
            author : String ,
            date : String ,
            contentText : String
        }]
    }],
    blog : [{type : mongoose.Schema.Types.ObjectId , ref : 'blog'}]
});

//add comment
//commentSchema.statics.addComment = function(blogId){
//
//}
var schema = {
    userSchema : userSchema,
    blogSchema : blogSchema,
    commentSchema : commentSchema
}

module.exports = schema;
