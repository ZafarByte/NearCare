import express from "express";
import { doctorList,loginDoctor ,appointmentsDoctor} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter=express.Router()

// Add debugging middleware
doctorRouter.use((req, res, next) => {
    console.log('Doctor route accessed:', req.method, req.url);
    next();
});

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoctor,appointmentsDoctor)

export default doctorRouter