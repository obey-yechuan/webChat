var createError = require('http-errors');
var express = require('express');
var webSocket = require('ws')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const wss= new webSocket.Server({
  host:'192.168.1.111',
  port:3001,
})

let clients=[]


function noop() {}
function heartbeat(){
  this.isAlive = true
}

wss.on('connection', function(ws,req){
  // console.log(wss.clients)
  const ip = req.connection.remoteAddress;
  const port = req.connection.remotePort;
  const clientName = ip + port;
  wss.clients.forEach(function(client){
    //wss.clients为set数据结构,使用size获取数量
    client.send('欢迎:ip为'+clientName+'的进入聊天室,当前人数为'+wss.clients.size)
  })

  //接受客户端的消息
  ws.on('message',function(message){
    wss.clients.forEach(function(client){
      client.send(clientName+': '+message)
    }) 
  })

  ws.on('close',function(){
    wss.clients.forEach(function(client){
      client.send(`用户${clientName}离开了聊天室,当前人数${wss.clients.size}`)
    }) 
  })

})


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

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
