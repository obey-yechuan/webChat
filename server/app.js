var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//config mysql
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'users'
});
connection.connect(function(){
  console.log('数据库连接成功')
})

/**
 * 如果报错 Client does not support authentication protocol requested by server; consider upgrading MySQL client
 * 在mysql中运行  ` ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password' `
 */
//如果报错在mysql中运行
connection.query('select * from users',function(err,rows,fields){
  if(err) throw err;
  console.log(rows)
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000,function(){
  console.log('服务器启动......')
})
module.exports = app;
