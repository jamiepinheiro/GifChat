
const config = require('./config/config');
const https = require('https');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');
const schedule = require('node-schedule');

const mongoose = require('./db/mongoose');
const {Message} = require('./models/message');
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
        var room = rooms.findRoomBySocket(socket.id);
        if (room) {
            if (room.people.length === 1) {
                io.to(room.id).emit("status", "Waiting");
            } else if (room.people.length === 2){
                io.to(room.id).emit("status", "Chating");
            }
        }
    });

    socket.on('createMessage', (message) => {
        var room = rooms.findRoomBySocket(socket.id).id;

        var message = new Message({
            word: message.name,
            url: message.url,
            createdAt: + new Date()
        });

        message.save().then(() => {
            console.log('saved message');
        }).catch((e) => {
            console.log(e);
        });

        io.to(room).emit("gotMessage", {
            name: message.name,
            url: message.url,
            id: socket.id
        });
    });

    socket.on('disconnect', () => {
        var room = rooms.findRoomBySocket(socket.id);
        rooms.leaveRoom(socket.id);

        if (room) {
            if (room.people.length === 1) {
                io.to(room.id).emit("status", "Ended");
            }
        }

    });

});

// api routes
app.get('/newRoom', (req, res) => {
    res.send(`/chat.html?room=${rooms.findRoomToJoin()}`);
});

app.get('/getMessages', async (req, res) => {
    try {
        var messages = await Message.find();
        res.send(messages);
    } catch (e) {
        res.status(400);
    }
});

app.get('/gifs', (req, res) => {
    var search = req.query.search;

    https.request({
        method : 'GET',
        hostname : 'api.cognitive.microsoft.com',
        path : '/bing/v7.0/images/search?count=4&imageType=AnimatedGif&q=' + encodeURIComponent(search),
        headers : {
            'Ocp-Apim-Subscription-Key' : process.env.BING_API_KEY
        }
    }, (response) => {
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            try {
                body = JSON.parse(body).value.map((item) => {return {name: search, url: item.contentUrl}});
                res.send(body);
            } catch (e) {
                res.status(404).send(body);
            }

        });
        response.on('error', function (e) {
            res.status(400).send(e.message);
        });
    }).end();
});

var hourlyJob = schedule.scheduleJob('0 * * * *', () => {
  console.log('The answer to life, the universe, and everything!');
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
