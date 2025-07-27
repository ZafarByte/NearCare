import express from "express";
import { doctorList } from "../controllers/doctorController.js";

const doctorRouter=express.Router()

// Add debugging middleware
doctorRouter.use((req, res, next) => {
    console.log('Doctor route accessed:', req.method, req.url);
    next();
});

doctorRouter.get('/list',doctorList)

export default doctorRouter