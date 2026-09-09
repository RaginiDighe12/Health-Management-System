import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from  "dotenv";
dotenv.config();

const app=express();

app.use(express.json());
app.use(cors());

const connectDB=async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        if(conn){
            console.log("connect Successfully");
        }

    }catch(error){
        console.log("connection error",error)

    }
};

app.get("/" , (req,res) => {
    res.json({
        success:true,
        message:"server is not running",
    });
});

const PORT=process.env.PORT || 8001;

app.listen(PORT,()=>{
    console.log(`server is running on :${PORT}`);
    connectDB();
});