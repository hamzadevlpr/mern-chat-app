const socketHandler = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log('A user connected');

        // Handle incoming messages
        socket.on('sendMessage', (data) => {
            console.log('Received message:', data);

            // Broadcast the message to all connected clients
            io.emit('newMessage', data);
        });

        // Handle disconnect
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

    return io;
};

module.exports = socketHandler;
