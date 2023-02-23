const socket = io()

socket.on('connect', () => {
    console.log(socket)
})

const loginForm = document.getElementById('login')

const chatContainer = document.getElementById('chat-container')
const loginContainer = document.getElementById('login-container')

const messagesContainer = document.getElementById('messages-container')
const messageForm = document.getElementById('send-message')
const usersList = document.getElementById('users-list')

const login = e => {
    e.preventDefault()
    const username = e.currentTarget.elements[0].value.trim()
    if(username === '') return alert('Introduce a username')
    
    loginContainer.style.display = 'none'
    chatContainer.style.display = 'block'

    socket.emit('user logged', username)
}
loginForm.addEventListener('submit', login)


const sendMessage = e => {
    e.preventDefault()
    const text = e.currentTarget.elements[0].value
    socket.emit('send message', text)
    e.currentTarget.elements[0].value = ''
}
messageForm.addEventListener('submit', sendMessage)

socket.on('add user', (users) => {
    usersList.innerHTML = `
    <ul>
        ${users.map(user => (`<li>${user}</li>`))}
    </ul>
    `
})

socket.on('new message', data => {
    messagesContainer.innerHTML += `
    <p><b>${data.user}: </b>${data.msg}</p>
    `
    
})