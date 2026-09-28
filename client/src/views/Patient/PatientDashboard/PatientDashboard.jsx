import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
    CalendarDays,
    UserRound,
    Search,
    Clock
} from "lucide-react";

import "./PatientDashboard.css";

function PatientDashboard() {

    const [stats, setStats] = useState({
        appointments: 0,
        doctors: 0,
        upcoming: 0
    });

    const [patientName, setPatientName] = useState("Patient");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchDashboardData = async () => {

            try {

                // Get logged-in patient
                const storedUser = localStorage.getItem("user");

                if (!storedUser) {
                    setLoading(false);
                    return;
                }

                const user = JSON.parse(storedUser);

                const patientId = user._id || user.id;

                if (!patientId) {
                    setLoading(false);
                    return;
                }

                try {
                    const profileResponse = await axios.get(
                        `http://localhost:8001/api/patients/${patientId}`
                    );
                    if (profileResponse.data.success) {
                        setPatientName(profileResponse.data.patient.name || "Patient");
                    } else {
                        setPatientName(user.name || "Patient");
                    }
                } catch (err) {
                    console.error("Failed to fetch patient profile", err);
                    setPatientName(user.name || "Patient");
                }


                // Get all doctors
                const doctorsResponse = await axios.get(
                    "http://localhost:8001/api/doctors"
                );

                const doctors =
                    doctorsResponse.data.doctors || [];


                // Get patient's appointments
                const appointmentsResponse = await axios.get(
                    `http://localhost:8001/api/appointments/patient/${patientId}`
                );

                const appointments =
                    appointmentsResponse.data.appointments || [];


                // Find upcoming appointments
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const upcomingAppointments =
                    appointments.filter((appointment) => {

                        const appointmentDate =
                            new Date(appointment.appointmentDate);

                        appointmentDate.setHours(0, 0, 0, 0);

                        return (
                            appointmentDate >= today &&
                            appointment.status !== "Cancelled" &&
                            appointment.status !== "Rejected"
                        );
                    });


                // Update dashboard statistics
                setStats({
                    appointments: appointments.length,
                    doctors: doctors.length,
                    upcoming: upcomingAppointments.length
                });

            } catch (error) {

                console.error(
                    "Error loading patient dashboard:",
                    error
                );

            } finally {

                setLoading(false);

            }
        };


        fetchDashboardData();

    }, []);


    return (
        <div className="patient-dashboard">

            <h1>Patient Dashboard</h1>

            <p className="welcome">
                Welcome back, {patientName}!
            </p>


            {/* Dashboard Statistics */}

            <div className="dashboard-cards">

                <div>
                    <CalendarDays />

                    <h2>
                        {loading ? "..." : stats.appointments}
                    </h2>

                    <p>Appointments</p>
                </div>


                <div>
                    <UserRound />

                    <h2>
                        {loading ? "..." : stats.doctors}
                    </h2>

                    <p>Doctors Available</p>
                </div>


                <div>
                    <Clock />

                    <h2>
                        {loading ? "..." : stats.upcoming}
                    </h2>

                    <p>Upcoming Appointment</p>
                </div>

            </div>


            {/* Dashboard Actions */}

            <div className="dashboard-actions">

                <Link to="/doctors">
                    <Search />
                    Find Doctor
                </Link>


                <Link to="/patient/appointments">
                    <Clock />
                    My Appointments
                </Link>


                <Link to="/patient/profile">
                    <UserRound />
                    My Profile
                </Link>

            </div>

        </div>
    );
}

export default PatientDashboard;