var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('./config/default');
var routes = require('./routes');
var pkg = require('./package');
var cookieParser = require('cookie-parser');

var app = express();
//set module
app.set('views' ,path.join(__dirname , 'views'));
app.set('view engine' , 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use(express.static(path.join(__dirname , 'dist')));
app.use(express.static(path.join(__dirname , 'public')));
app.use(express.static(path.join(__dirname , '/')));
//app.use(exress.static(path.join(__dirname , '')))

app.use('*', function(req, res, next) {
    res.append("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.append("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.append("X-Powered-By",' 3.2.1')
    res.append("Content-Type", "application/json;charset=utf-8");
    next();
});


app.use(cookieParser());
//app.use(session({
//    secret : '1234',
//    name : 'myblog',
//    cookie : {maxAge : 999999},
//    resave : false,
//    saveUninitialized: true
//}));
app.use(session({
    name : config.session.key,
    secret : config.session.secret,
    cookie : {
        maxAge : 999999999
    },
    store : new MongoStore(config.mongodb),
    saveUninitialized: true,
    resave : true
}));
console.log(config.session.maxAge);

app.use(flash());


routes(app);


app.listen(config.port , function(){
    console.log(pkg.name + ' is listening on port ' + config.port);
})
