const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
require('./database.js');

// socket server
const server = http.createServer(app);

/** settings */
// app.set('port', process.env.PORT || 4000);
const port = process.env.PORT || 4000;

/** middlewares */
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}));


// socket server config
const socketio = require('socket.io');
const io = socketio(server);

// stabliching the connection
io.on('connection', ( socket ) => {
    
    socket.emit('welcomeMessage', 'Bienvenido al server');
});

/** routes */
app.use('/api/users', require('./routes/usersRoute.js'));

// module.exports = app;
async function main() {
    await server.listen(4000, () => {
        console.log('Server on port ', port);
    });
    // await app.listen(app.get('port'));
    // console.log('Server on port ', app.get('port'));
}

main();
