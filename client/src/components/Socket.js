import io from 'socket.io-client';

// creating a var to connect the client with our server
const socket = io.connect('http://localhost:4000', {
    transports: ['websocket']
});

export default socket;