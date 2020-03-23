const socket = io.connect('http://localhost:3333');

socket.on('receiveMessage', renderMessage);

const form = document.forms['chat'];

form.addEventListener('submit', handleChatForm);

function handleChatForm(event) {
  event.preventDefault();

  const username = document.querySelector('input#username');
  const message = document.querySelector('input#messageContent');

  if (!username.value.length || !message.value.length) return;

  const messageObject = {
    username: username.value,
    message: message.value
  };

  socket.emit('sendMessage', messageObject);

  renderMessage(messageObject);

  message.value = '';
  message.focus();
}

function renderMessage({ username, message }) {
  const messagesContainer = document.querySelector('div#messages');
  const messageContainer = document.createElement('div');

  const usernameEl = document.createElement('strong');
  const usernameText = document.createTextNode(username + ': ');
  usernameEl.appendChild(usernameText);

  const messageEl = document.createElement('span');
  const messageText = document.createTextNode(message);
  messageEl.appendChild(messageText);

  messageContainer.appendChild(usernameEl);
  messageContainer.appendChild(messageEl);
  
  messagesContainer.appendChild(messageContainer);
}
