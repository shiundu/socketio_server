var express = require('express');
var http = require('http')
var socketio = require('socket.io');

var app = express();
var server = http.Server(app);
var websocket = socketio(server);

var trainees = [
       {id: '1', name: 'Ben Shiundu', workouts: []},
       {id: '2', name: 'Tim Dettmann', workouts: []},
       {id: '3', name: 'Moritz Vossenberg', workouts: []},
       {id: '4', name: 'Jane Doe', workouts: []},
       {id: '5', name: 'Mercy Doe', workouts: []},
     ];
var workouts = [
      {id:'1',name: 'FullBody workout',},
      {id:'2',name: 'Tummy burn out',},
      {id:'3',name: 'Bum workout',},
    ];

server.listen(3000, () => console.log('listening on *:3000'));

// The event will be called when a client is connected.
websocket.on('connection', (socket) => {
  console.log('A client just joined on', socket.id);
  websocket.emit("trainees", (trainees));
  websocket.emit("workouts", (workouts));
});


websocket.on('update_trainees', (message) => {
  trainees = message;

  websocket.emit('trainees', trainees);
});
