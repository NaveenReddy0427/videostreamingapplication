const socketHandler = (io) => {
    io.on("connection", (socket) => {
      console.log("New WebSocket Connection");
  
      // Handle user joining a room
      socket.on("joinRoom", ({ roomId, userId }) => {
        socket.join(roomId);
        console.log(`User ${userId} joined room ${roomId}`);
        socket.to(roomId).emit("userJoined", { userId });
      });
  
      // Handle WebRTC signaling for one-on-one and group calls
      socket.on("signal", ({ roomId, signalData, targetUserId }) => {
        // If targetUserId is provided, send the signal to that specific user (for one-on-one)
        if (targetUserId) {
          io.to(targetUserId).emit("signal", signalData);
        } else {
          // Broadcast to all users in the room (for group calls)
          socket.to(roomId).emit("signal", signalData);
        }
      });
  
      // Handle WebRTC ICE candidate exchange
      socket.on("iceCandidate", ({ roomId, candidate, targetUserId }) => {
        // If targetUserId is provided, send the ICE candidate to the specific peer
        if (targetUserId) {
          io.to(targetUserId).emit("iceCandidate", candidate);
        } else {
          socket.to(roomId).emit("iceCandidate", candidate);
        }
      });
  
      // Handle user disconnect
      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  };
  
  export default socketHandler;
  