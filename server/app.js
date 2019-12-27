var createError = require('http-errors');
var express = require('express');
var webSocket = require('ws')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const wss= new webSocket.Server({
  host:'127.0.0.1',
  port:3001,
})

let clients=[]


function noop() {}
function heartbeat(){
  this.isAlive = true
}

wss.on('connection', function(ws,req){
  ws.isAlive = true
  ws.on('pong', heartbeat);

  const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
      if (ws.isAlive === false) return ws.terminate();
   
      ws.isAlive = false;
      ws.ping(noop);
    });
  }, 30000);

  clients.push(ws)
  const ip = req.connection.remoteAddress;
  const port = req.connection.remotePort;
  const clientName = ip + port;

  ws.on('message',function(message){
      ws.send(clientName+': '+message)
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
