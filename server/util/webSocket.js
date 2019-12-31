var webSocket = require('ws')


const wss= new webSocket.Server({
    host:'localhost',
    port:3001,
  })

  module.exports = wss