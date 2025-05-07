import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import dotenv from "dotenv"
import { router as authRoutes } from "./routes/authRoutes.js";
dotenv.config()


const app = express();
app.use(express.json())

//loading environment variables from .env
const PORT = process.env.PORT || 3000
const DB_URL = process.env.DB_URL

//mongoDB connection
mongoose.connect(DB_URL)
.then(console.log('DB Connection successful'))
.catch((error)=>console.error(error));

//CORS setup to allow only credential request from frontend of our app
app.use(cors({
    origin : `http://localhost:${PORT}/`,
    credentials : true
}))

 app.use('/', authRoutes)


//app will run at PORT taken from .env
app.listen(PORT , ()=>{
    console.log(`Server is running at port ${PORT}`);
    
})


