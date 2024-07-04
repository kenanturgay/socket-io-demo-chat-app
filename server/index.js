const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket) => {
    console.log(socket.id, 'connected');
    socket.on('room', (data) => {
        console.log(data);
        console.log('roomJoined: ', data.room)
        socket.join(data.room)
    });
    socket.on('message', (data) => {
        console.log('message: ', data);
        console.log('roomBilgisi: ', data.room)
        socket.to(data.room).emit('messageReturn', data);

    });
});


const PORT = process.env.PORT || 3001;


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});