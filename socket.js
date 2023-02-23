module.exports = io => {
    let users = []
    io.on('connection', (socket) => {
        const addUser = () => {
            io.sockets.emit('add user', users)
        }
        addUser()
        socket.on('disconnect', () => {
            let index = users.indexOf(socket.user)
            users.splice(index, 1)
            addUser()
        })
        socket.on('user logged', (data) => {
            users.push(data)
            socket.user = data
            console.log(socket.user)
            addUser()
        })
        socket.on('send message', msg => {
            io.sockets.emit('new message', {
                msg,
                user: socket.user
            })
        })
    })
}