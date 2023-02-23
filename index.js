const express = require('express')
const app = express()
const path = require('path')
const http = require('http')

const server = http.createServer(app)

const { Server } = require('socket.io')

const io = new Server(server)

require('./socket')(io)

app.use(express.static(path.join(__dirname, 'public')))

server.listen(3000, () => console.log('Server on port 3000'))