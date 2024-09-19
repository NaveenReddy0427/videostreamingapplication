import express from "express";
import { addUserToRoom } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post('/join', addUserToRoom)

export default userRouter