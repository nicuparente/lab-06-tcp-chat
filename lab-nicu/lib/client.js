'use strict';

module.exports = function(socket, nickName){
  socket.nickName = nickName;
  this.socket = socket;
};