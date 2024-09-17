import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import http from 'http';
import { Server } from "socket.io"; 
import connectDB from './config/db.js';
import router from "./routes/roomRoutes.js";
import { handSignal } from "./controllers/roomController.js";


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/rooms', router);

const server = http.createServer(app);
const io = new Server(server, {  
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('new user connected');
    handSignal(io, socket);

    socket.on('joinRoom', ({ roomId, userId }) => {
        socket.join(roomId);
        console.log(`${userId} joined room: ${roomId}`);
        socket.broadcast.to(roomId).emit('userJoined', { userId });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
