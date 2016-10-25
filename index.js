/**
 * Created by fanzhang on 10/25/16.
 */

var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', function (socket) {
  // io.emit('userConnection', 'a user is connected')
  console.log('a user is connected')
  socket.on('disconnect', function () {
    io.emit('userDisconnection', 'a user is disconnected')
  })
    .on('chatmsg',function (msg) {
      // console.log('message: ', msg)
      io.emit('chatmsgBC', msg)
    })
    .on('clientConnect',function (msg) {
      io.emit('userConnection', msg + ' is connected')
    })
})


http.listen(5000,function () {
  console.log('on *:5000')
})
