var express = require('express');
var crypto = require('crypto')
var router = express.Router();
var connection = require('../util/mysqlConfig.js')

/**
 * 如果报错 Client does not support authentication protocol requested by server; consider upgrading MySQL client
 * 在mysql中运行  ` ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password' `
 */
//如果报错在mysql中运行

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * 页面逻辑,注册登录..............
 */

 //注册接口
router.post('/register',function(req,res){
  if(!req.body.admin || !req.body.password || !req.body.email){
    res.json({
      data: {
        message:'注册失败,请确认信息正确'
      }
    })
  }else{
    //判断用户是否存在
    connection.getConnection(function(err,connect){
      var sql = `select admin from users where admin='${req.body.admin}'`
      connect.query(sql,function(err,result,fields){
        if(err) throw err;
        if(result.length >= 1){
          res.json({
            data:{
              status:'fail',
              message: '用户已存在'
            }
          })
        }
      })
    })
    connection.getConnection(function(err,connect){
      let hmac = crypto.createHmac('md5','ye')
      hmac.update(req.body.password);
      let crypt_password = hmac.digest('hex')
      var sql = `insert into users values('${req.body.admin}','${crypt_password}','${new Date().getTime()}','${req.body.email}')`
      connect.query(sql,function(err,result,fields){
        connect.release();
        if(err) throw err;
        res.json({data: {
          status: 'success',
          message: '注册成功'
        }})
      })
    })
  }

})

//登录接口
router.post('/login',function(req,res){
  connection.getConnection(function(err,connect){
    var sql = `select password from users where admin='${req.body.admin}' `
    connect.query(sql,function(err,result,fields){
      connect.release();
      if(err) throw err;
      let hmac = crypto.createHmac('md5','ye')
      hmac.update(req.body.password);
      let crypt_password = hmac.digest('hex')
      if(crypt_password == result[0].password){
        res.json({
          status:'success',
          message: '登录成功'
        })
      }else{
        res.json({
          status: 'fail',
          message: '密码错误'
        })
      }
    })

  })
})

module.exports = router;
