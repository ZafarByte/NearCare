import express from "express";

import {addDoctor,adminLogin} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";

const adminRouter = express.Router();


adminRouter.post('/add-doctor',upload.single('image'),addDoctor);
adminRouter.post('/admin-login',adminLogin);

export default adminRouter;