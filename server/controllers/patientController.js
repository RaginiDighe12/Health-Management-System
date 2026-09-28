
import User from "../models/User.js";


// ==========================================
// GET PATIENT PROFILE
// ==========================================

export const getPatientProfile = async (req, res) => {

    try {

        const { patientId } = req.params;


        const patient = await User.findOne({
            _id: patientId,
            role: "patient"
        }).select("-password");


        if (!patient) {

            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });

        }


        res.status(200).json({

            success: true,

            patient

        });


    } catch (error) {

        console.error(
            "Get patient profile error:",
            error
        );


        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// ==========================================
// UPDATE PATIENT PROFILE
// ==========================================

export const updatePatientProfile = async (req, res) => {

    try {

        const { patientId } = req.params;


        const {
            name,
            email,
            phone,
            age,
            dateOfBirth,
            gender,
            bloodGroup,
            address,
            medicalHistory,
            allergies,
            medications
        } = req.body;


        const patient = await User.findOne({

            _id: patientId,

            role: "patient"

        });


        if (!patient) {

            return res.status(404).json({

                success: false,

                message: "Patient not found"

            });

        }


        // ==================================
        // UPDATE PATIENT INFORMATION
        // ==================================

        patient.name = name;
        patient.email = email;
        patient.phone = phone;
        patient.age = age;
        patient.dateOfBirth = dateOfBirth;
        patient.gender = gender;
        patient.bloodGroup = bloodGroup;
        patient.address = address;
        patient.medicalHistory = medicalHistory;
        patient.allergies = allergies;
        patient.medications = medications;


        const updatedPatient =
            await patient.save();


        res.status(200).json({

            success: true,

            message:
                "Patient profile updated successfully",

            patient: {

                id: updatedPatient._id,

                name: updatedPatient.name,

                email: updatedPatient.email,

                role: updatedPatient.role,

                phone: updatedPatient.phone,

                age: updatedPatient.age,

                dateOfBirth:
                    updatedPatient.dateOfBirth,

                gender: updatedPatient.gender,

                bloodGroup:
                    updatedPatient.bloodGroup,

                address:
                    updatedPatient.address,

                medicalHistory:
                    updatedPatient.medicalHistory,

                allergies:
                    updatedPatient.allergies,

                medications:
                    updatedPatient.medications

            }

        });


    } catch (error) {

        console.error(
            "Update patient profile error:",
            error
        );


        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
