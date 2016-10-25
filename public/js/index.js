/**
 * Created by fanzhang on 10/25/16.
 */
var socket = io();
var nickName;

// emit an custom event for sending some message
$('#messagesInputWrap').submit(function () {
  socket.emit('chatmsg', {
    name:nickName?nickName:'Joe',
    text:$('#m').val()
  });
  $('#m').val('')
  return false
})

$('#nickNameInputWrap').submit(function () {
  nickName = $('#nick').val();

  socket.emit('clientConnect', nickName?nickName:'Joe');

  $('#nickNameInputWrapBig').hide()
  $('#messagesInputWrap').show()
  return false
})

socket.on('chatmsgBC', function (msg) {
  $('#messages').append('<li>'+ msg.name + ': ' + msg.text +'</li>')
})
  .on('userConnection',function (msg) {
    $('#messages').append('<li class="info">'+ msg +'</li>')
  })
  .on('userDisconnection',function (msg) {
    $('#messages').append('<li class="info">'+ msg +'</li>')
  })
  .on('userListChange', function (msg) {

  })
