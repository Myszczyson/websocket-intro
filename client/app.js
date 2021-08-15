// Selectors
const socket = io();
const loginForm = document.getElementById('welcome-form')
const messagesSection = document.getElementById('messages-section')
const messagesList = document.getElementById('messages-list')
const addMessageForm = document.getElementById('add-messages-form')
const userNameInput = document.getElementById('username')
const messageContentInput = document.getElementById('message-content')

// Global var

let userName = ''

// Socket 

socket.on('addUser', ({ author, content }) => addMessage(author, content))

socket.on('message', ({ author, content }) => addMessage(author, content))

socket.on('removeUser', ({ author, content }) => addMessage(author, content))

// Functions 

const login = (e) => {
    e.preventDefault();
    if(!userNameInput.value){
        alert('Write your login first please!');
    } else {
        userName = userNameInput.value;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
        socket.emit('login', { name: userName, id: socket.id})
    }
}

const addMessage = (author, content) => {
    let message = document.createElement('li');
    message.classList.add('message','message--received', author === userName ? 'message--self' : 0);
    message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author }</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
    messagesList.appendChild(message);
}

const sendMessage = (e) => {
    e.preventDefault();
    if(!messageContentInput.value){
        alert('Write your message first please!');
    } else {
        addMessage(userName, messageContentInput.value);
        socket.emit('message', { author: userName, content: messageContentInput.value })
        messageContentInput.value = '';
    }
}

// Events

loginForm.addEventListener('submit', e => {
    login(e);
})

addMessageForm.addEventListener('submit', e => {
    sendMessage(e);
})

