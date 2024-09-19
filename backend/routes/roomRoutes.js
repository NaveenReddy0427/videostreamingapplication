import express from "express";
import { createRoom, getRooms } from "../controllers/roomController.js";
import protect from "../middleware/authMiddleware.js";

const roomRouter = express.Router();

roomRouter.post('/create', protect, createRoom);
roomRouter.get('/all', protect, getRooms);

export default roomRouter;
