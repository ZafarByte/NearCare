import express from "express";
import cors from "cors";
import 'dotenv/config'
import mongoose from "mongoose";
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/claudinary.js'
import adminRouter from './routes/adminRoute.js'
const app = express();

app.use(cors()); // allow frontend to connect backend
app.use(express.json());//parse json data

app.use('/api/admin',adminRouter);
// localhost:5000/api/admin/add-doctor





const PORT = process.env.PORT || 5000;
connectDB()
connectCloudinary()

//api endpoint

app.get('/', (req, res) => {
    res.send("Hello from backend");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})