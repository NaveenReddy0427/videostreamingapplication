import RoomSchema from '../models/Room.js';
import UserSchema from '../models/user.js';

const addUserToRoom = async (req, res) => {
  const { username, roomId } = req.body;

  try {
    const room = await RoomSchema.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Check if the user is already in the room
    let user = await UserSchema.findOne({ username, room: roomId });
    if (user) {
      return res.status(400).json({ message: 'User is already in the room' });
    }

    // Add the user to the room
    user = new UserSchema({ username, room: roomId });
    await user.save();

    room.users.push(user);
    await room.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export { addUserToRoom };
