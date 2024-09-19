import express from "express";
import { addUserToRoom } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post('/join', protect, addUserToRoom);

export default userRouter;
