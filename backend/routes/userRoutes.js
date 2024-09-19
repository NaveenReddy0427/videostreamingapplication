import express from "express";
import { addUserToRoom } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/join', addUserToRoom)

export default userRouter