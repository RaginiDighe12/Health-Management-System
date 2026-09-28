import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import User from "./models/User.js";
import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/patients", patientRoutes);

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection error:", error.message);
    }
};

// Test Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Healthcare Management System Backend is running",
    });
});

// Port
const PORT = process.env.PORT || 8001;


app.post("/test-user", async (req, res) => {
    try {
        const user = new User({
            name: "Test Patient",
            email: "testpatient@gmail.com",
            password: "123456",
            role: "patient"
        });

        const savedUser = await user.save();

        res.status(201).json({
            success: true,
            message: "User model is working",
            user: savedUser
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on :${PORT}`);
    connectDB();
});