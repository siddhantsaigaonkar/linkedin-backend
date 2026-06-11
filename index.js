import express from "express";
import { connectDb } from "./utils/db.js";
import dotenv from "dotenv"
import authRouter from "./routes/auth.routes.js";


dotenv.config()


let app = express();
let port = process.env.PORT
app.use(express.json());
app.use("/api/auth",authRouter)

app.get("/", (req,res) => {
  res.send(`server started at ${port}`);
  res.json({msg:"hiii"})
})


app.listen(port, () => {
  connectDb()
     console.log(`server started at ${port}`)
})

