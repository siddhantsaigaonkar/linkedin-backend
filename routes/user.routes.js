import expres from "express";
import { getCurrentUser } from "../controllers/user.controllers.js";
import isAuth from "../middlewares/isAuth.js";



let userRouter = expres.Router();

userRouter.get("/currentuser", isAuth, getCurrentUser);

export default userRouter;