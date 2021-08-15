const express = require('express');
const socket = require('socket.io');
const path = require('path');

const app = express()

let messages = []
let users = []

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

  socket.on('login', (user) => {
    users.push(user)
    const thisUser = users.find(user => user.id === socket.id)
    socket.broadcast.emit('addUser', { author: 'Chat Bot',  content: `<i>Wow, ${thisUser.name} just joined the chat! :O</i>`})

  })

  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  }); 

  socket.on('disconnect', () => { 
    console.log('Oh, socket ' + socket.id + ' has left')
    const thisUser = users.find(user => user.id === socket.id)
    socket.broadcast.emit('removeUser', { author: 'Chat Bot',  content: `<i>Ahh, ${thisUser.name} just left the chat! :/</i>`})
    users = users.filter(user => user.id !== socket.id)
  });

  console.log('I\'ve added a listener on message and disconnect events \n');  
});



