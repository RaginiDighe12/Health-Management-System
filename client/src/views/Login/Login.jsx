
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockKeyhole, Mail } from "lucide-react";
import axios from "axios";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:8001/api/auth/login",
                {
                    email,
                    password
                }
            );

            console.log("Login response:", response.data);

            // Save token
            localStorage.setItem(
                "token",
                response.data.token
            );

            // Save user information
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            alert("Login successful!");

            // Go to dashboard
            if (response.data.user.role === "doctor") {
                navigate("/doctor/dashboard");
            } else {
                navigate("/patient/dashboard");
            }

        } catch (error) {

            console.error("Login error:", error);

            alert(
                error.response?.data?.message ||
                "Login failed. Please try again."
            );
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <h1>Welcome Back</h1>

                <p>Login to your healthcare account</p>

                <form onSubmit={handleLogin}>

                    <label>Email</label>

                    <div className="input-box">

                        <Mail size={18} />

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                    </div>

                    <label>Password</label>

                    <div className="input-box">

                        <LockKeyhole size={18} />

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                    </div>

                    <button type="submit">
                        Login
                    </button>

                </form>

                <p>
                    Don't have an account?
                    <Link to="/register"> Register</Link>
                </p>

            </div>

        </div>
    );
}

export default Login;
