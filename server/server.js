const express = require('express');
const socketIO = require('socket.io');
const schedule = require('node-schedule');

const config = require('./config/config');
const mongoose = require('./db/mongoose');
const {Message} = require('./models/message');
const {Rooms} = require('./utils/rooms');
var rooms = new Rooms();

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/newRoom', async (req, res) => {
    res.send(`/chat.html?q=room${rooms.joinRoom()}`);
});

var hourlyJob = schedule.scheduleJob('0 * * * *', () => {
  console.log('The answer to life, the universe, and everything!');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
