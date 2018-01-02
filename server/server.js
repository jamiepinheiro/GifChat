const express = require('express');
const config = require('./config/config');
const mongoose = require('./db/mongoose');
const {Message} = require('./models/message');
const schedule = require('node-schedule');

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', async (req, res) => {
    var message = new Message({word: 'hi', url: 'google.com'});
    try {
        await message.save();
        res.send('message saved');
    } catch (e) {
        console.log(e);
        res.send('message not saved');
    }
});

var hourlyJob = schedule.scheduleJob('0 * * * *', () => {
  console.log('The answer to life, the universe, and everything!');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
