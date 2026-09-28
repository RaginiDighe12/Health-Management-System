import { Link, useNavigate } from "react-router-dom";
import { Stethoscope } from "lucide-react";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    let user = null;
    
    if (storedUser) {
        try {
            user = JSON.parse(storedUser);
        } catch (e) {
            console.error("Error parsing user");
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="navbar">

            <Link to="/" className="logo">
                <Stethoscope size={30} />
                <span>HealthCare</span>
            </Link>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/doctors">Doctors</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                
                {token && user ? (
                    <>
                        <Link to={user.role === "doctor" ? "/doctor/dashboard" : "/patient/dashboard"}>
                            Dashboard
                        </Link>
                        <button onClick={handleLogout} className="login-btn" style={{background: 'red', color: 'white', border: 'none', cursor: 'pointer'}}>
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="login-btn">
                        Login
                    </Link>
                )}
            </div>

        </nav>
    );
}

export default Navbar;