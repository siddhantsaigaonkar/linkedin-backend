import express from "express";
import { connectDb } from "./utils/db.js";
import dotenv from "dotenv"

dotenv.config()

let app = express();
let port = process.env.PORT

app.get("/", (req,res) => {
  res.send(`server started at ${port}`);
})


app.listen(port, () => {
  connectDb()
     console.log(`server started at ${port}`)
})

