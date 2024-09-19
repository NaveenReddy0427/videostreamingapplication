import RoomSchema from "../models/room.js";

const createRoom = async(req, res)=>{

  const { name } = req.body;
    try {
        const room = new RoomSchema({ name });
        await room.save();
        res.status(201).json({ message: 'Room created successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Error creating room' });
      }
}

const getRooms = async(req, res)=>{
  try {
    const rooms = await RoomSchema.find().populate('users')
    res.status(200).json({ rooms });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

export { createRoom, getRooms };