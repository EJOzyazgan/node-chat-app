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
});

io.on('disconnect', (socket) => {
    console.log("Disconnected from Server");
});

server.listen(port, () =>{
    console.log(`server on port ${port}`);
});