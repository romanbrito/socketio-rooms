const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 7000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('join', (data) => {
        socket.join(data.room);
        console.log(`New user joinded to ${data.room} room!`);
    });

    socket.on('message', (data) => {
        socket.broadcast.to(data.room).emit('message', data.msg);
    });

    socket.on('disconnect', () => {
        console.log(`user disconnected from ${data.room}`);
    });
});
