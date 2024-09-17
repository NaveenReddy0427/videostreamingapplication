import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        unique: true,
    },
    users:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

const RoomSchema = mongoose.model('Room', roomSchema);

export default RoomSchema;