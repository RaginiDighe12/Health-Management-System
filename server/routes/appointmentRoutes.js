import express from "express";

import {
    bookAppointment,
    getPatientAppointments,
    getDoctorAppointments,
    updateAppointmentStatus
} from "../controllers/appointmentController.js";
import { protect, patientOnly, doctorOnly } from "../middleware/authMiddleware.js";

const router = express.Router();


// Book appointment
router.post(
    "/",
    protect,
    patientOnly,
    bookAppointment
);


// Get patient's appointments
router.get(
    "/patient/:patientId",
    protect,
    patientOnly,
    getPatientAppointments
);


// Get doctor's appointments
router.get(
    "/doctor/:doctorId",
    protect,
    doctorOnly,
    getDoctorAppointments
);


// Update appointment status
router.put(
    "/:appointmentId/status",
    protect,
    updateAppointmentStatus
);

export default router;