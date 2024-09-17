import express from "express"
import dotenv from "dotenv";
import cors from 'cors';
import http from 'http';
import connectDB from './config/db.js';


dotenv.config();

connectDB()


const app = express();
app.use(cors())
app.use(express.json());

const server = http.createServer(app);



const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));