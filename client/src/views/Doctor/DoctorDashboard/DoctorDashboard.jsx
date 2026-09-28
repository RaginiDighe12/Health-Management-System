
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../../components/SideBar/SideBar";
import "./DoctorDashboard.css";

function DoctorDashboard() {

    const [appointments, setAppointments] = useState([]);
    const [doctor, setDoctor] = useState(null);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchDoctorDashboard = async () => {

            try {

                const storedUser = localStorage.getItem("user");

                if (!storedUser) {
                    setError("Please login first.");
                    setLoading(false);
                    return;
                }

                const user = JSON.parse(storedUser);

                console.log("Logged-in doctor:", user);

                if (user.role !== "doctor") {
                    setError("Please login with a doctor account.");
                    setLoading(false);
                    return;
                }

                const doctorId = user._id || user.id;

                if (!doctorId) {
                    setError("Doctor ID not found. Please login again.");
                    setLoading(false);
                    return;
                }

                setDoctor(user);

                console.log("Doctor ID:", doctorId);

                const response = await axios.get(
                    `http://localhost:8001/api/appointments/doctor/${doctorId}`
                );

                console.log(
                    "Doctor dashboard appointments:",
                    response.data
                );

                if (response.data.success) {
                    setAppointments(
                        response.data.appointments || []
                    );
                }

            } catch (error) {

                console.error(
                    "Doctor dashboard error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load dashboard."
                );

            } finally {

                setLoading(false);

            }
        };

        fetchDoctorDashboard();

    }, []);


    // ==========================================
    // TODAY'S DATE
    // ==========================================

    const today = new Date();

    const todayDate =
        `${today.getFullYear()}-${String(
            today.getMonth() + 1
        ).padStart(2, "0")}-${String(
            today.getDate()
        ).padStart(2, "0")}`;


    // ==========================================
    // TODAY'S APPOINTMENTS
    // ==========================================

    const todayAppointments = appointments.filter(
        (appointment) =>
            appointment.appointmentDate === todayDate
    );


    // ==========================================
    // PENDING APPOINTMENTS
    // ==========================================

    const pendingCount = appointments.filter(
        (appointment) =>
            appointment.status === "Pending"
    ).length;


    // ==========================================
    // CONFIRMED APPOINTMENTS
    // ==========================================

    const confirmedCount = appointments.filter(
        (appointment) =>
            appointment.status === "Confirmed"
    ).length;


    // ==========================================
    // TOTAL UNIQUE PATIENTS
    // ==========================================

    const totalPatients = new Set(
        appointments
            .map(
                (appointment) =>
                    appointment.patient?._id
            )
            .filter(Boolean)
    ).size;


    // ==========================================
    // ACCEPT APPOINTMENT
    // ==========================================

    const acceptAppointment = async (id) => {

        try {

            const response = await axios.put(
                `http://localhost:8001/api/appointments/${id}/status`,
                {
                    status: "Confirmed"
                }
            );

            if (response.data.success) {

                setAppointments((previousAppointments) =>
                    previousAppointments.map((appointment) =>
                        appointment._id === id
                            ? {
                                ...appointment,
                                status: "Confirmed"
                            }
                            : appointment
                    )
                );

                setSelectedAppointment((previousAppointment) => {

                    if (
                        previousAppointment &&
                        previousAppointment._id === id
                    ) {
                        return {
                            ...previousAppointment,
                            status: "Confirmed"
                        };
                    }

                    return previousAppointment;
                });

            }

        } catch (error) {

            console.error(
                "Accept appointment error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to confirm appointment."
            );
        }
    };


    // ==========================================
    // REJECT APPOINTMENT
    // ==========================================

    const rejectAppointment = async (id) => {

        const confirmReject = window.confirm(
            "Are you sure you want to reject this appointment?"
        );

        if (!confirmReject) {
            return;
        }

        try {

            const response = await axios.put(
                `http://localhost:8001/api/appointments/${id}/status`,
                {
                    status: "Rejected"
                }
            );

            if (response.data.success) {

                setAppointments((previousAppointments) =>
                    previousAppointments.map((appointment) =>
                        appointment._id === id
                            ? {
                                ...appointment,
                                status: "Rejected"
                            }
                            : appointment
                    )
                );

                setSelectedAppointment((previousAppointment) => {

                    if (
                        previousAppointment &&
                        previousAppointment._id === id
                    ) {
                        return {
                            ...previousAppointment,
                            status: "Rejected"
                        };
                    }

                    return previousAppointment;
                });

            }

        } catch (error) {

            console.error(
                "Reject appointment error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to reject appointment."
            );
        }
    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <div className="doctor-dashboard-page">

                <Sidebar />

                <main className="doctor-dashboard-main">

                    <div className="dashboard-section">

                        <h2>
                            Loading dashboard...
                        </h2>

                    </div>

                </main>

            </div>
        );
    }


    // ==========================================
    // DASHBOARD
    // ==========================================

    return (
        <div className="doctor-dashboard-page">

            <Sidebar />

            <main className="doctor-dashboard-main">


                {/* ==============================
                    HEADER
                ============================== */}

                <div className="dashboard-header">

                    <div>

                        <h1>
                            Doctor Dashboard
                        </h1>

                        <p>
                            Welcome back, Dr.{" "}
                            {doctor?.name || "Doctor"}
                        </p>

                    </div>


                    <div className="doctor-header-profile">

                        <div className="header-avatar">

                            {doctor?.name
                                ?.split(" ")
                                .map((name) => name[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase() || "DR"}

                        </div>


                        <div>

                            <strong>
                                Dr. {doctor?.name || "Doctor"}
                            </strong>

                            <span>
                                {doctor?.specialty ||
                                    "Healthcare Specialist"}
                            </span>

                        </div>

                    </div>

                </div>


                {/* ==============================
                    ERROR
                ============================== */}

                {error && (

                    <div className="dashboard-section">

                        <p>
                            {error}
                        </p>

                    </div>

                )}


                {!error && (

                    <>


                        {/* ==============================
                            STATISTICS
                        ============================== */}

                        <div className="dashboard-stats">


                            {/* TODAY'S APPOINTMENTS */}

                            <div className="dashboard-stat-card">

                                <div className="stat-icon">
                                    📅
                                </div>

                                <div>

                                    <h3>
                                        {
                                            todayAppointments.length
                                        }
                                    </h3>

                                    <p>
                                        Today's Appointments
                                    </p>

                                </div>

                            </div>


                            {/* PENDING */}

                            <div className="dashboard-stat-card">

                                <div className="stat-icon">
                                    ⏳
                                </div>

                                <div>

                                    <h3>
                                        {pendingCount}
                                    </h3>

                                    <p>
                                        Pending
                                    </p>

                                </div>

                            </div>


                            {/* CONFIRMED */}

                            <div className="dashboard-stat-card">

                                <div className="stat-icon">
                                    ✓
                                </div>

                                <div>

                                    <h3>
                                        {confirmedCount}
                                    </h3>

                                    <p>
                                        Confirmed
                                    </p>

                                </div>

                            </div>


                            {/* TOTAL PATIENTS */}

                            <div className="dashboard-stat-card">

                                <div className="stat-icon">
                                    👥
                                </div>

                                <div>

                                    <h3>
                                        {totalPatients}
                                    </h3>

                                    <p>
                                        Total Patients
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* ==============================
                            APPOINTMENTS
                        ============================== */}

                        <section className="dashboard-section">

                            <div className="section-heading">

                                <div>

                                    <h2>
                                        Today's Appointments
                                    </h2>

                                    <p>
                                        Manage your upcoming appointments
                                    </p>

                                </div>

                            </div>


                            <div className="dashboard-appointments">

                                {appointments.map(
                                    (appointment) => {

                                        const patientName =
                                            appointment.patient?.name ||
                                            "Patient";


                                        const initials =
                                            patientName
                                                .split(" ")
                                                .map(
                                                    (name) =>
                                                        name[0]
                                                )
                                                .join("")
                                                .slice(0, 2)
                                                .toUpperCase();


                                        return (

                                            <div
                                                className="dashboard-appointment-card"
                                                key={appointment._id}
                                            >


                                                <div className="patient-avatar">

                                                    {initials}

                                                </div>


                                                <div className="appointment-info">

                                                    <h3>
                                                        {patientName}
                                                    </h3>

                                                    <p>
                                                        Email:{" "}
                                                        {appointment.patient?.email ||
                                                            "N/A"}
                                                    </p>

                                                    <p>
                                                        🩺{" "}
                                                        {appointment.reason}
                                                    </p>

                                                </div>


                                                <div className="appointment-time">

                                                    <strong>
                                                        {
                                                            appointment.appointmentTime
                                                        }
                                                    </strong>

                                                    <span
                                                        className={`status ${appointment.status.toLowerCase()}`}
                                                    >
                                                        {
                                                            appointment.status
                                                        }
                                                    </span>

                                                </div>


                                                <div className="appointment-buttons">

                                                    <button
                                                        className="view-btn"
                                                        onClick={() =>
                                                            setSelectedAppointment(
                                                                appointment
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </button>


                                                    {appointment.status ===
                                                        "Pending" && (

                                                        <>

                                                            <button
                                                                className="accept-btn"
                                                                onClick={() =>
                                                                    acceptAppointment(
                                                                        appointment._id
                                                                    )
                                                                }
                                                            >
                                                                Accept
                                                            </button>


                                                            <button
                                                                className="reject-btn"
                                                                onClick={() =>
                                                                    rejectAppointment(
                                                                        appointment._id
                                                                    )
                                                                }
                                                            >
                                                                Reject
                                                            </button>

                                                        </>

                                                    )}

                                                </div>

                                            </div>

                                        );

                                    }
                                )}


                                {appointments.length === 0 && (

                                    <div className="dashboard-section">

                                        <p>
                                            No appointments found.
                                        </p>

                                    </div>

                                )}

                            </div>

                        </section>

                    </>

                )}

            </main>


            {/* ==============================
                MODAL
            ============================== */}

            {selectedAppointment && (

                <div className="dashboard-modal-overlay">

                    <div className="dashboard-modal">


                        <button
                            className="close-modal"
                            onClick={() =>
                                setSelectedAppointment(null)
                            }
                        >
                            ×
                        </button>


                        <h2>
                            Appointment Details
                        </h2>


                        <p>

                            <strong>
                                Patient:
                            </strong>{" "}

                            {selectedAppointment.patient?.name}

                        </p>


                        <p>

                            <strong>
                                Email:
                            </strong>{" "}

                            {selectedAppointment.patient?.email}

                        </p>


                        <p>

                            <strong>
                                Date:
                            </strong>{" "}

                            {selectedAppointment.appointmentDate}

                        </p>


                        <p>

                            <strong>
                                Time:
                            </strong>{" "}

                            {selectedAppointment.appointmentTime}

                        </p>


                        <p>

                            <strong>
                                Reason:
                            </strong>{" "}

                            {selectedAppointment.reason}

                        </p>


                        <p>

                            <strong>
                                Status:
                            </strong>{" "}

                            {selectedAppointment.status}

                        </p>


                    </div>

                </div>

            )}

        </div>
    );
}

export default DoctorDashboard;