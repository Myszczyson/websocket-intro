const express = require('express');
const socket = require('socket.io');
const path = require('path');

const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client')));

app.get('/', (req, res) => {
    res.sendFile('index.html');
})

const server = app.listen(8000, () => {
    console.log('Server is running on Port:', 8000)
  });

const io = socket(server);

io.on('connection', 
(socket) => {
  console.log('New client! Its id – ' + socket.id);
  socket.on('message', () => { console.log('Oh, I\'ve got something from ' + socket.id) });
  socket.on('disconnect', () => { console.log('Oh, socket ' + socket.id + ' has left') });
  console.log('I\'ve added a listener on message and disconnect events \n');  
});