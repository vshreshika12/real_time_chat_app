const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
var audio= new Audio('tone.mp3')

const name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`,'right')
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`,'left')
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`,'left')
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message,position){
  const messageElement = document.createElement('div')
  messageElement.classList.add('message')
  messageElement.classList.add(position)
  messageElement.innerText = message
  messageContainer.append(messageElement)
  audio.play()
}