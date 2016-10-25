/**
 * Created by fanzhang on 10/25/16.
 */

var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use('/', express.static(__dirname + '/public'));

var allUsers = []
var ausername
io.on('connection', function (socket) {

  // server level knows a user is been connected (for using socketIO)
  console.log('a user is boarding...')

  socket.on('disconnect', function () {
    // tell others a user is been disconnected
    console.log(ausername, ' is disconnected')
    io.emit('userDisconnection', ausername + ' is disconnected')
  })
    .on('chatmsg',function (msg) {

      // pass the message to everyone - broadcast
      io.emit('chatmsgBC', msg)
    })
    .on('clientConnect',function (msg) {

      // assign vars in to server
      ausername = msg
      allUsers.push(ausername)
      console.log(ausername, 'is connected')

      // tell others an user who is connected
      io.emit('userConnection', msg + ' is connected')

      // tell all that the users list is been changed
      io.emit('userListChange', allUsers)
    })
})


http.listen(5000,function () {
  console.log('on *:5000')
})
