import {Router} from "express";
import { ensureAuthenticated } from "../middlewares/Auth.js";
import { enrollment } from "../controllers/enrollment.controller.js";


const router =Router();

router.get("/:courseId/status", ensureAuthenticated, enrollment)

export default router