import express from "express";
import cors from "cors";
import 'dotenv/config'
import mongoose from "mongoose";
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/claudinary.js'
import adminRouter from './routes/adminRoute.js'
import bodyParser from "body-parser";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
const app = express();

app.use(cors()); // allow frontend to connect backend
app.use(express.json());//parse json data

app.use('/api/admin',adminRouter);
// localhost:5000/api/admin/add-doctor
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)


// Add debugging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});


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