import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const UserSchema = mongoose.model('User', userSchema);

export default UserSchema;
