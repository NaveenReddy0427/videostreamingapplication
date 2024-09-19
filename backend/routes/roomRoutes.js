import express from "express";
import { createRoom, getRooms } from "../controllers/roomController.js";


const roomRouter = express.Router();

roomRouter.post('/create', createRoom);
roomRouter.post('/all', getRooms);

export default roomRouter;









