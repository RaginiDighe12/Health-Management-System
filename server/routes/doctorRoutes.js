
import express from "express";

import {
    getDoctors,
    getDoctorProfile,
    updateDoctorProfile
} from "../controllers/doctorController.js";
import { protect, doctorOnly } from "../middleware/authMiddleware.js";

const router = express.Router();


// Get all doctors (public)
router.get("/", getDoctors);

// Get doctor profile (protected)
router.get("/:doctorId", protect, doctorOnly, getDoctorProfile);

// Update doctor profile (protected)
router.put("/:doctorId", protect, doctorOnly, updateDoctorProfile);


export default router;
