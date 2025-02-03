import express from "express";
import dotenv from "dotenv";
import router from "./routes/authRoutes.js";
import nationalRoutes from "./routes/nationalRoutes.js"
import pool from "./lib/db.js";
import cors from "cors"
const app = express()
dotenv.config();



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(router)
app.use(nationalRoutes)


const PORT = process.env.PORT
app.listen(PORT,()=>{
  console.log(`running on PORT:${PORT}`)
})



