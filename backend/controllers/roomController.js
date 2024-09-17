import RoomSchema from "../models/room.js";
import UserSchema from "../models/user.js";

const createRoom = async(req, res)=>{
    try {
        const { roomId } = req.body;
        const room = new RoomSchema({ roomId });
        await room.save();
        res.status(201).json({ message: 'Room created successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Error creating room' });
      }
}

const joinRoom = async(req, res)=>{
    try {
        const { roomId, username, socketId } = req.body;
        const room = await RoomSchema.findOne({ roomId });
    
        if (!room) {
          return res.status(404).json({ message: 'Room not found' });
        }
    
        const user = new UserSchema({ username, socketId });
        await user.save();
    
        room.users.push(user);
        await room.save();
    
        res.status(200).json({ message: 'Joined room successfully', room });
      } catch (error) {
        res.status(500).json({ error: 'Error joining room' });
      }
}

const handSignal = (io, socket)=>{
    socket.on('signal', (data) => {
        const { roomId, signal, to } = data;
        io.to(roomId).emit('signal', { signal, to });
      });
}

export { createRoom, joinRoom, handSignal };