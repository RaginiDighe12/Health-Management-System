
import express from "express";

import {
    getPatientProfile,
    updatePatientProfile
} from "../controllers/patientController.js";
import { protect, patientOnly } from "../middleware/authMiddleware.js";

const router = express.Router();


// Get patient profile
router.get("/:patientId", protect, patientOnly, getPatientProfile);


// Update patient profile
router.put("/:patientId", protect, patientOnly, updatePatientProfile);


export default router;
