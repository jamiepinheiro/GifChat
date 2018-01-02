const http = require('http');

const express = require('express');
const socketIO = require('socket.io');
const schedule = require('node-schedule');
const axios = require('axios');

const config = require('./config/config');
//const mongoose = require('./db/mongoose');
//const {Message} = require('./models/message');
const {Rooms} = require('./utils/rooms');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var rooms = new Rooms();
var port = process.env.PORT || 3000;

app.use(express.static('public'));

//socket.io
io.on('connection', (socket) => {

    socket.on('join', (params) => {
        socket.join(params.room);
        rooms.joinRoom(params.room, socket.id);
        console.log(rooms.findRoomBySocket(socket.id));
        console.log(rooms.rooms);
    });

    socket.on('disconnect', () => {
        rooms.leaveRoom(socket.id);
        console.log(rooms.rooms);
    });

});

// api routes
app.get('/newRoom', async (req, res) => {
    res.send(`/chat.html?room=${rooms.findRoomToJoin()}`);
});

app.get('/gifs', async (req, res) => {
    var search = req.query.search;
    res.send({gifs: []});
});


var hourlyJob = schedule.scheduleJob('0 * * * *', () => {
  console.log('The answer to life, the universe, and everything!');
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
