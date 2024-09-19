import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true 
  },
  users: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

const RoomSchema = mongoose.model('Room', roomSchema);

export default RoomSchema;
