var express = require('express');
var router = express.Router();

var connection = require('../util/mysqlConfig')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.use(function(req,res,next){
  res.set({'Access-Control-Allow-Origin':'*'})
  next();
})


//创建房间
router.post('/createRoom',function(req,res,next){
  connection.getConnection(function(err,connect){
    var sql = `insert into rooms values (${null},'${req.body.roomName}','${req.body.roomMaster}')`
    connect.query(sql,function(err,result,fields){
      connect.release()
      if(err) throw err;
      console.log(result)
    })
  })
  res.json({message:'ok'})
})

//查询房间
router.get('/queryRoom',function(req,res,next){
  connection.getConnection(function(err,connect){
    var sql = `select * from rooms`
    connect.query(sql,function(err,result,fields){
      connect.release()
      if(err) throw err;
      res.json({message:'ok',data:result})

    })
  })
})

module.exports = router;
