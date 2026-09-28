
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// ================= REGISTER USER =================

export const registerUser = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            role,

            // Doctor information
            specialty,
            experience,
            location,
            rating,
            availableDays,
            consultationTime,
            fee,
            qualification,
            about,

            // Patient information
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


        // Check required fields

        if (!name || !email || !password) {

            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });

        }


        // Check existing user

        const existingUser =
            await User.findOne({ email });


        if (existingUser) {

            return res.status(400).json({
                success: false,
                message: "User already exists"
            });

        }


        // Hash password

        const hashedPassword =
            await bcrypt.hash(password, 10);


        // Create user

        const user = await User.create({

            name,

            email,

            password: hashedPassword,

            role: role || "patient",


            // =========================
            // DOCTOR INFORMATION
            // =========================

            specialty,

            experience,

            location,

            rating,

            availableDays,

            consultationTime,

            fee,

            qualification,

            about,


            // =========================
            // PATIENT INFORMATION
            // =========================

            phone,

            age,

            dateOfBirth,

            gender,

            bloodGroup,

            address,

            medicalHistory,

            allergies,

            medications

        });


        // Response

        res.status(201).json({

            success: true,

            message: "User registered successfully",

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role,


                // Doctor information

                specialty: user.specialty,

                experience: user.experience,

                location: user.location,

                rating: user.rating,

                availableDays: user.availableDays,

                consultationTime: user.consultationTime,

                fee: user.fee,

                qualification: user.qualification,

                about: user.about,


                // Patient information

                phone: user.phone,

                age: user.age,

                dateOfBirth: user.dateOfBirth,

                gender: user.gender,

                bloodGroup: user.bloodGroup,

                address: user.address,

                medicalHistory: user.medicalHistory,

                allergies: user.allergies,

                medications: user.medications

            }

        });


    } catch (error) {

        console.error(
            "Register user error:",
            error
        );

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// ================= LOGIN USER =================

export const loginUser = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        // Find user

        const user =
            await User.findOne({ email });


        if (!user) {

            return res.status(401).json({

                success: false,

                message: "Invalid email or password"

            });

        }


        // Check password

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!isMatch) {

            return res.status(401).json({

                success: false,

                message: "Invalid email or password"

            });

        }


        // Create JWT token

        const token =
            jwt.sign(

                {
                    id: user._id,
                    role: user.role
                },

                process.env.JWT_SECRET,

                {
                    expiresIn: "7d"
                }

            );


        // Login response

        res.status(200).json({

            success: true,

            message: "Login successful",

            token,


            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role,


                // Doctor information

                specialty: user.specialty,

                experience: user.experience,

                location: user.location,

                rating: user.rating,

                availableDays: user.availableDays,

                consultationTime: user.consultationTime,

                fee: user.fee,

                qualification: user.qualification,

                about: user.about,


                // Patient information

                phone: user.phone,

                age: user.age,

                dateOfBirth: user.dateOfBirth,

                gender: user.gender,

                bloodGroup: user.bloodGroup,

                address: user.address,

                medicalHistory: user.medicalHistory,

                allergies: user.allergies,

                medications: user.medications

            }

        });


    } catch (error) {

        console.error(
            "Login user error:",
            error
        );

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
