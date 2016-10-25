/**
 * Created by fanzhang on 10/25/16.
 */
function updateUserList(list){
  $('#userList').html('')
  for(var i in list){
    $('#userList').append('<li>'+list[i].name+'</li>')
  }
}
