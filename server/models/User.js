
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        // ================= BASIC USER INFORMATION =================

        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["patient", "doctor"],
            required: true
        },

        // =========================
        // PATIENT INFORMATION
        // =========================

        phone: {
            type: String,
            trim: true
        },

        age: {
            type: Number
        },
        dateOfBirth: {
         type: String,
          trim: true
         },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other"]
        },

        bloodGroup: {
            type: String,
            trim: true
        },

        address: {
            type: String,
            trim: true
        },

        medicalHistory: {
            type: String,
            trim: true
        },

        allergies: {
            type: String,
            trim: true
        },

        medications: {
            type: String,
            trim: true
        },


        // ================= DOCTOR INFORMATION =================

        specialty: {
            type: String,
            trim: true
        },

        experience: {
            type: String,
            trim: true
        },

        location: {
            type: String,
            trim: true
        },

        rating: {
            type: Number
        },

        availableDays: {
            type: String,
            trim: true
        },

        consultationTime: {
            type: String,
            trim: true
        },

        fee: {
            type: String,
            trim: true
        },

        qualification: {
            type: String,
            trim: true
        },

        about: {
            type: String,
            trim: true
        }
    },

    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

export default User;
