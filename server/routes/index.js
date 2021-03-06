var express = require('express');
var crypto = require('crypto')
var router = express.Router();
var jwt = require('jsonwebtoken')
var wss = require('../util/webSocket')

var connection = require('../util/mysqlConfig.js')

/**
 * 如果报错 Client does not support authentication protocol requested by server; consider upgrading MySQL client
 * 在mysql中运行  ` ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password' `
 */
//如果报错在mysql中运行

router.use(function (req, res, next) {
  res.set({ 'Access-Control-Allow-Origin': '*' })
  next();
})


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * 页面逻辑,注册登录..............
 */

//注册接口
router.post('/register', function (req, res) {
  if (!req.body.admin || !req.body.password || !req.body.email) {
    res.json({
      data: {
        message: '注册失败,请确认信息正确'
      }
    })
  } else {
    //判断用户是否存在
    connection.getConnection(function (err, connect) {
      var sql = `select * from users where admin='${req.body.admin}'`
      connect.query(sql, function(err, result, fields){
        if(err) throw err;
        if(result.length>=1){
          res.json({
            data: {
              status: 'fail',
              message: '用户名已被注册',
            }
          })
          return false
        }else if(result.length == 0){
          sql = `select admin from users where email='${req.body.email}'`
          connect.query(sql, function (err, result, fields) {
            if (err) throw err;
            if (result.length >= 1) {
              res.json({
                data: {
                  status: 'fail',
                  message: '邮箱已被注册',
                }
              })
              return false
            }else{
              let hmac = crypto.createHmac('md5', 'ye')
              hmac.update(req.body.password);
              let crypt_password = hmac.digest('hex')
    
              var sql = `insert into users values('${req.body.admin}','${crypt_password}','${new Date().getTime()}','${req.body.email}')`
              connect.query(sql, function (err, result, fields) {
                connect.release();
                if (err) throw err;
                res.json({
                  data: {
                    status: 'success',
                    message: '注册成功'
                  }
                })
              })
            }
          })
        }
      })
    })
  }
})

//登录接口
router.post('/login', function (req, res) {
  connection.getConnection(function (err, connect) {
    var sql = `select * from users where admin='${req.body.email}' `
    connect.query(sql, function (err, result, fields) {
      connect.release();
      if (err) throw err;
      //是否存在用户
      if (result.length >= 1) {
        //验证加密密码
        let hmac = crypto.createHmac('md5', 'ye')
        hmac.update(req.body.password);
        let crypt_password = hmac.digest('hex')
        //验证用户密码
        if (crypt_password == result[0].password) {

          var token = jwt.sign({
            data:req.body.email
          },'secret',{expiresIn: 20})
          res.json({
            status: 'success',
            message: '登录成功',
            data: {
              admin: result[0].admin,
              email: result[0].email,
              token:token
            }
          })
        } else {
          res.json({
            status: 'fail',
            message: '密码错误'
          })
        }
      }else{
        res.json({
          status:'fail',
          message:'用户不存在'
        })
      }

    })

  })
})

//判断用户状态
/**
 * 参数1:用户邮箱token
 */
router.post('/status',function(req,res){
    jwt.verify(req.body.token, 'secret', function(err,decoded){
      if(err){
        res.json({
          status:'fail',
          message:'验证已过期'
        })
      }else{
        res.json({
          status:'success',
          message:'用户登录中'
        })
      }
    })

})

//获取房间人数数量
router.get('/roomNumber', function (req, res) {
  res.json({
    data: {
      roomNumber: wss.clients.size
    }
  })
})

module.exports = router;
