import express from "express";
import { checkAuth, signIn, signOut, signUp } from "../controllers/auth.controllers.js";


let authRouter = express.Router();

authRouter.post("/signup", signUp);

authRouter.post("/signin", signIn)

authRouter.post("/signout", signOut)

authRouter.get("/check",checkAuth)


export default authRouter;