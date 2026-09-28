
import User from "../models/User.js";

export const getDoctors = async (req, res) => {
    try {
        const doctors = await User.find(
            { role: "doctor" },
            "-password"
        );

        res.status(200).json({
            success: true,
            doctors
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// GET DOCTOR PROFILE
export const getDoctorProfile = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const doctor = await User.findOne({
            _id: doctorId,
            role: "doctor"
        }).select("-password");

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }

        res.status(200).json({
            success: true,
            doctor
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// UPDATE DOCTOR PROFILE

export const updateDoctorProfile = async (req, res) => {

    try {

        const { doctorId } = req.params;

        const {
            name,
            email,
            specialty,
            qualification,
            experience,
            location,
            fee,
            availableDays,
            consultationTime,
            about
        } = req.body;


        const doctor = await User.findOne({
            _id: doctorId,
            role: "doctor"
        });

        if (!doctor) {

            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });

        }


        doctor.name = name;
        doctor.email = email;
        doctor.specialty = specialty;
        doctor.qualification = qualification;
        doctor.experience = experience;
        doctor.location = location;
        doctor.fee = fee;
        doctor.availableDays = availableDays;
        doctor.consultationTime = consultationTime;
        doctor.about = about;


        const updatedDoctor = await doctor.save();


        res.status(200).json({

            success: true,

            message: "Doctor profile updated successfully",

            doctor: {
                id: updatedDoctor._id,
                name: updatedDoctor.name,
                email: updatedDoctor.email,
                role: updatedDoctor.role,
                specialty: updatedDoctor.specialty,
                qualification: updatedDoctor.qualification,
                experience: updatedDoctor.experience,
                location: updatedDoctor.location,
                fee: updatedDoctor.fee,
                availableDays: updatedDoctor.availableDays,
                consultationTime: updatedDoctor.consultationTime,
                about: updatedDoctor.about
            }

        });

    } catch (error) {

        console.error(
            "Update doctor profile error:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
