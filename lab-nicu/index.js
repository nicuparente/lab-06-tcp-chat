'use strict';

const net = require('net');
const Client = require('./lib/client.js');

const server = net.createServer();
const app = module.exports = {};

app.init = () => {
  let clientPool = [];

  server.on('connection', (socket) => {
    let nickName = `Guest_${Math.floor(Math.random() * 100000)}`;
    let client = new Client(socket, nickName);
    client.socket.write('Welcome to the TCP chatroom  \n');
    
    console.log(`${client.socket.nickName} has connected`);

    clientPool = [...clientPool, client.socket];

    let handleDisconnect = () => {
      console.log(`${client.socket.nickName} left the chat`);
      clientPool = clientPool.filter(item => item !== client);
    };
    client.socket.on('error', handleDisconnect);
    client.socket.on('close', handleDisconnect);

    client.socket.on('data', (buffer) => {
      let data = buffer.toString().split(' ');

      if (data[0] === '/nick') {
        client.socket.nickName = data[1].trim() || client.socket.nickName;
        client.socket.write(`Your new nickname is now ${client.socket.nickName} \n`);
        return;
      }
      else if (data[0] === '/dm') {
        let dmTargetName = data[1].trim();
        let message = data.splice(2).toString().replace(',', ' ');
        let targetSocket = clientPool.filter((s) => s.nickName === dmTargetName);
        if (targetSocket) {
          targetSocket[0].write(`${targetSocket[0].nickName} : ${message}\n`);
          client.socket.write(`${client.socket.nickName} : ${message} \n`);
          return;
        }
      }
      else if(data[0] === '/troll'){
        let message = data.splice(2).toString().replace(',', ' ');
        let times = Number(data[1]);
        for(let i = 0; i < times; i++){
          clientPool.map((client) => client.write(`${client.nickName} : ${message} \n`));
        }
        return;
      }
      else if(data[0] === '/quit'){
        console.log(`disconnecting`, client.socket.nickName);
        client.socket.end();
        handleDisconnect();
      }
      else {
        let message = data.toString();
        clientPool.map((client) => client.write(`${client.nickName} : ${message} \n`));
      }
    });

  });

  server.listen(3000, () => {
    console.log('tcp server started');
  });
};

app.init();
