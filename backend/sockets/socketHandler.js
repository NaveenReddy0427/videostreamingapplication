const socketHandler = (io)=>{
    io.on('connection', (socket)=>{
        console.log('New WebSocket Connection')

        // Handle user joining a room
        socket.on('joinRoom', ({ roomId, userId }) => {
            socket.join(roomId);
            console.log(`User ${userId} joined room ${roomId}`);
            socket.to(roomId).emit('userJoined', { userId });
        });

        // Handle WebRTC signaling
        socket.on('signal', (data) => {
            io.to(data.roomId).emit('signal', data);
        });

        // Handle user disconnect
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });

    }) 
}

export default socketHandler;