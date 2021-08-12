// Selectors
const loginForm = document.getElementById('welcome-form')
const messagesSection = document.getElementById('messages-section')
let messagesList = document.getElementById('messages-list')
const addMessageForm = document.getElementById('add-messages-form')
const userNameInput = document.getElementById('username')
const messageContentInput = document.getElementById('message-content')

// Global var

let userName = ''

// Functions 

const login = (e) => {
    e.preventDefault();
    if(!userNameInput.value){
        alert('Write your login first please!');
    } else {
        userName = userNameInput.value;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    }
}

const addMessage = (author, content) => {
    let message = document.createElement('li');
    message.classList.add('message','message--received', author === userName ? 'message__self' : undefined);
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
    }
    
}
// Events

loginForm.addEventListener('submit', e => {
    login(e);
})

addMessageForm.addEventListener('submit', e => {
    sendMessage(e);
})
