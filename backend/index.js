import express from "express";
import dotenv from "dotenv";
import router from "./routes/authRoutes.js";
import nationalRoutes from "./routes/nationalRoutes.js"
import economicRoutes from "./routes/economicRoutes.js"
import internationalRoutes from "./routes/internationalRoutes.js"
import informationRoutes from "./routes/informationRoutes.js"
import entertainmentRoutes from "./routes/entertainmentRoutes.js"
import sportsRoutes from "./routes/sportsRoutes.js"
import othersRoutes from "./routes/othersRoutes.js"
import adsRoutes from "./routes/adsRoutes.js"
import imageRoutes from "./routes/imageRoutes.js"

import pool from "./lib/db.js";
import cors from "cors"
const app = express()
dotenv.config();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(router)
app.use(nationalRoutes)
app.use(economicRoutes)
app.use(internationalRoutes)
app.use(informationRoutes)

app.use(entertainmentRoutes)
app.use(sportsRoutes)
app.use(othersRoutes)
app.use(adsRoutes)
app.use(imageRoutes)

const PORT = process.env.PORT
app.listen(PORT,()=>{
  console.log(`running on PORT:${PORT}`)
})



