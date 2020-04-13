// I'm using the host "localhost" and port "3333" as an example
// you will need to change it
const socket = io.connect('http://localhost:3333');

socket.on('receiveMessage', renderMessage);
// Testing
socket.emit('onlineUser', document.querySelector('input[type=hidden]').value);

const form = document.forms['chat'];

scrollMessages();

form.addEventListener('submit', handleChatForm);

function handleChatForm(event) {
  event.preventDefault();

  const username = document.querySelector('input#username');
  const message = document.querySelector('#messageContent');

  // No message will be sent if the username or message is empty
  if (!username.value.length || !message.value.length) return;

  const messageObject = {
    username: username.value,
    message: message.value,
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

  scrollMessages();
}

function scrollMessages() {
  document.querySelector('#messages').scrollTop = document.querySelector(
    '#messages'
  ).scrollHeight;
}
