import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
      },
      socketId: {
        type: String,
        required: true,
      },
})

const UserSchema = mongoose.model('User', userSchema);

export default UserSchema;