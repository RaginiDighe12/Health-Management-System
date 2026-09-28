import Appointment from "../models/Appointment.js";
import User from "../models/User.js";

// ===============================
// Book Appointment
// ===============================
export const bookAppointment = async (req, res) => {
    try {
        const {
            patient,
            doctor,
            appointmentDate,
            appointmentTime,
            reason
        } = req.body;

        // Check required fields
        if (
            !patient ||
            !doctor ||
            !appointmentDate ||
            !appointmentTime ||
            !reason
        ) {
            return res.status(400).json({
                success: false,
                message: "All appointment fields are required"
            });
        }

        // Check patient
        const patientExists = await User.findOne({
            _id: patient,
            role: "patient"
        });

        if (!patientExists) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }

        // Check doctor
        const doctorExists = await User.findOne({
            _id: doctor,
            role: "doctor"
        });

        if (!doctorExists) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }

        // Check if same doctor already has appointment
        const existingAppointment = await Appointment.findOne({
            doctor,
            appointmentDate,
            appointmentTime,
            status: {
                $in: ["Pending", "Confirmed"]
            }
        });

        if (existingAppointment) {
            return res.status(400).json({
                success: false,
                message: "This time slot is already booked"
            });
        }

        // Create appointment
        const appointment = await Appointment.create({
            patient,
            doctor,
            appointmentDate,
            appointmentTime,
            reason,
            status: "Pending"
        });

        res.status(201).json({
            success: true,
            message: "Appointment booked successfully",
            appointment
        });

    } catch (error) {

        console.error("Book appointment error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ===============================
// Get Patient Appointments
// ===============================
export const getPatientAppointments = async (req, res) => {
    try {

        const { patientId } = req.params;

        const appointments = await Appointment.find({
            patient: patientId
        })
            .populate(
                "doctor",
                "name specialty experience location qualification fee"
            )
            .sort({
                appointmentDate: 1
            });

        res.status(200).json({
            success: true,
            appointments
        });

    } catch (error) {

        console.error(
            "Get patient appointments error:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ===============================
// Get Doctor Appointments
// ===============================
export const getDoctorAppointments = async (req, res) => {
    try {

        const { doctorId } = req.params;

        const appointments = await Appointment.find({
            doctor: doctorId
        })
            .populate(
                "patient",
                 "name email phone age gender bloodGroup address medicalHistory allergies medications"
            )
            .sort({
                appointmentDate: 1
            });

        res.status(200).json({
            success: true,
            appointments
        });

    } catch (error) {

        console.error(
            "Get doctor appointments error:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ===============================
// Update Appointment Status
// ===============================
export const updateAppointmentStatus = async (req, res) => {
    try {

        const { appointmentId } = req.params;
        const { status } = req.body;

        const allowedStatuses = [
            "Pending",
            "Confirmed",
            "Rejected",
            "Completed",
            "Cancelled"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid appointment status"
            });
        }

        const appointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            { status },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Appointment status updated successfully",
            appointment
        });

    } catch (error) {

        console.error(
            "Update appointment status error:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};