
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [doctor, setDoctor] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setDoctor(user);
            } catch (error) {
                console.error("Error reading user data:", error);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        navigate("/login");
    };

    const doctorName = doctor?.name || "Doctor";
    const specialty = doctor?.specialty || "Doctor";
    
    // Create initials from doctor's name
    const initials = doctorName
        .replace("Dr. ", "")
        .split(" ")
        .map((word) => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

    return (
        <>
            <button
                className="sidebar-hamburger"
                onClick={() => setIsOpen(true)}
                aria-label="Open sidebar"
            >
                <span>☰</span>
            </button>

            {isOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            <aside className={`doctor-sidebar ${isOpen ? "open" : ""}`}>

                <button
                    className="sidebar-close"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close sidebar"
                >
                    ×
                </button>

                {/* Logo */}
                <div className="sidebar-logo">
                    <h2>HealthCare</h2>
                    <p>Doctor Panel</p>
                </div>

                {/* Dynamic Doctor Profile */}
                <div className="sidebar-profile">

                    <div className="sidebar-avatar">
                        {initials}
                    </div>

                    <h3>{doctorName}</h3>

                    <p>{specialty}</p>

                </div>

                {/* Navigation */}
                <nav className="sidebar-nav">

                    <NavLink
                        to="/doctor/dashboard"
                        className="sidebar-link"
                        onClick={() => setIsOpen(false)}
                    >
                        <span>🏠</span>
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/doctor/appointments"
                        className="sidebar-link"
                        onClick={() => setIsOpen(false)}
                    >
                        <span>📅</span>
                        Appointments
                    </NavLink>

                    <NavLink
                        to="/doctor/patients"
                        className="sidebar-link"
                        onClick={() => setIsOpen(false)}
                    >
                        <span>👥</span>
                        Patients
                    </NavLink>

                    <NavLink
                        to="/doctor/profile"
                        className="sidebar-link"
                        onClick={() => setIsOpen(false)}
                    >
                        <span>👤</span>
                        My Profile
                    </NavLink>

                    {/* Logout */}
                    <button
    className="sidebar-logout"
    onClick={handleLogout}
>
    <span>🚪</span>
    <span>Logout</span>
</button>

                </nav>

            </aside>
        </>
    );
}

export default Sidebar;