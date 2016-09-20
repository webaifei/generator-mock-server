/**
 * 加载中间件
 * path
 * favicon
 * logger=>log
 * cookieParser=>cookies
 * bodyParser=>urlencoded (表单提交，post)
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var apiList = [];
/**
 * 下面的两句其实就是对应不同的route的逻辑处理
 */
var routes = require('./routes/index')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(allowCors)

for(var k in routes){
  apiList.push({
    name:k,
    path: routes[k].stack[0].route.path
  })
  app.use('/', routes[k])
}
/**
 * 使用use来使用中间件
 */
for(var k in routes){
  app.use('/', routes[k])
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



// 允许cors
function allowCors(req, res, next){
  res.set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type"
  })
  next();
}
module.exports = app;
