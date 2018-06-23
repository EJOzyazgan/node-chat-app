const path = require('path');
const http = require('http');
const express = require('express');
const sockerIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port  = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = sockerIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("New Client Connected");

    socket.emit('newMessage', {
        from: "ej",
        text: "hi how are you",
        createdAt: 123
    });

    socket.on('createEmail', (newEmail) => {
        console.log("createdEmail", newEmail);
    });

    socket.on('createMessage', (message) => {
        console.log("createdMessage", message);
    });

    socket.on('disconnect', () => {
       console.log("Client Disconnected");
    });
});

server.listen(port, () =>{
    console.log(`server on port ${port}`);
});