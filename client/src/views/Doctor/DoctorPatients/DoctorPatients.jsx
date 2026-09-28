import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
    ArrowLeft,
    Search,
    Users,
    UserRound,
    Phone,
    Mail,
    CalendarDays,
    Activity,
    X,
    MapPin,
    Droplets,
    HeartPulse,
    Pill,
    AlertCircle
} from "lucide-react";

import Sidebar from "../../../components/SideBar/SideBar";

import "./DoctorPatients.css";

function DoctorPatients() {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ===============================
    // GET LOGGED-IN DOCTOR ID
    // ===============================
    const user = JSON.parse(localStorage.getItem("user"));

    const doctorId = user?._id || user?.id;

    // ===============================
    // FETCH DOCTOR'S PATIENTS
    // ===============================
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                if (!doctorId) {
                    setError("Doctor information not found.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get(
                    `http://localhost:8001/api/appointments/doctor/${doctorId}`
                );

                const appointments = response.data.appointments || [];

                // ===============================
                // REMOVE DUPLICATE PATIENTS
                // ===============================
                const patientMap = new Map();

                appointments.forEach((appointment) => {
                    const patient = appointment.patient;

                    if (!patient?._id) return;

                    const existingPatient = patientMap.get(patient._id);

                    if (existingPatient) {
                        existingPatient.appointmentsCount += 1;

                        if (
                            new Date(appointment.createdAt) >
                            new Date(existingPatient.latestCreatedAt)
                        ) {
                            existingPatient.lastVisit =
                                appointment.appointmentDate;

                            existingPatient.condition =
                                appointment.reason;

                            existingPatient.status =
                                appointment.status;

                            existingPatient.latestCreatedAt =
                                appointment.createdAt;
                        }
                    } else {
                        patientMap.set(patient._id, {
                            id: patient._id,

                            name:
                                patient.name ||
                                "Unknown Patient",

                            email:
                                patient.email ||
                                "N/A",

                            phone:
                                patient.phone ||
                                "N/A",

                            age:
                                patient.age ||
                                "N/A",

                            gender:
                                patient.gender ||
                                "N/A",

                            bloodGroup:
                                patient.bloodGroup ||
                                "N/A",

                            address:
                                patient.address ||
                                "N/A",

                            medicalHistory:
                                patient.medicalHistory ||
                                "N/A",

                            allergies:
                                patient.allergies ||
                                "N/A",

                            medications:
                                patient.medications ||
                                "N/A",

                            lastVisit:
                                appointment.appointmentDate ||
                                "N/A",

                            condition:
                                appointment.reason ||
                                "N/A",

                            status:
                                appointment.status ||
                                "Pending",

                            appointmentsCount: 1,

                            activeCase:
                                appointment.status === "Pending" ||
                                appointment.status === "Confirmed",

                            latestCreatedAt:
                                appointment.createdAt ||
                                appointment.appointmentDate
                        });
                    }
                });

                setPatients(
                    Array.from(patientMap.values())
                );
            } catch (err) {
                console.error(
                    "Error fetching doctor patients:",
                    err
                );

                setError(
                    err.response?.data?.message ||
                    "Failed to load patients."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchPatients();
    }, [doctorId]);

    // ===============================
    // SEARCH PATIENTS
    // ===============================
    const filteredPatients = useMemo(() => {
        return patients.filter((patient) => {
            const search =
                searchTerm.toLowerCase();

            return (
                patient.name
                    ?.toLowerCase()
                    .includes(search) ||
                patient.email
                    ?.toLowerCase()
                    .includes(search) ||
                patient.phone
                    ?.toLowerCase()
                    .includes(search)
            );
        });
    }, [patients, searchTerm]);

    // ===============================
    // STATISTICS
    // ===============================
    const totalPatients =
        patients.length;

    const malePatients =
        patients.filter(
            (patient) =>
                patient.gender === "Male"
        ).length;

    const femalePatients =
        patients.filter(
            (patient) =>
                patient.gender === "Female"
        ).length;

    const activePatients =
        patients.filter(
            (patient) =>
                patient.activeCase
        ).length;

    // ===============================
    // LOADING
    // ===============================
    if (loading) {
        return (
            <div className="doctor-patients-layout">

                <Sidebar />

                <main className="doctor-patients-main">

                    <div className="doctor-patients-page">

                        <div className="loading-container">

                            <h2>
                                Loading Patients...
                            </h2>

                            <p>
                                Please wait while patient
                                information is loaded.
                            </p>

                        </div>

                    </div>

                </main>

            </div>
        );
    }

    return (
        <div className="doctor-patients-layout">

            {/* ================= SIDEBAR ================= */}
            <Sidebar />

            {/* ================= MAIN CONTENT ================= */}
            <main className="doctor-patients-main">

                <div className="doctor-patients-page">

                    {/* ================= HEADER ================= */}
                    <div className="patients-header">

                        <Link
                            to="/doctor/dashboard"
                            className="back-link"
                        >
                            <ArrowLeft size={18} />
                            Back to Dashboard
                        </Link>

                        <div className="patients-title">

                            <h1>
                                My Patients
                            </h1>

                            <p>
                                View and manage information
                                about your patients.
                            </p>

                        </div>

                    </div>

                    {/* ================= ERROR ================= */}
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    {/* ================= STAT CARDS ================= */}
                    <div className="patient-stats">

                        <div className="patient-stat-card">

                            <div className="stat-icon">
                                <Users size={22} />
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

                        <div className="patient-stat-card">

                            <div className="stat-icon">
                                <UserRound size={22} />
                            </div>

                            <div>
                                <h3>
                                    {malePatients}
                                </h3>

                                <p>
                                    Male Patients
                                </p>
                            </div>

                        </div>

                        <div className="patient-stat-card">

                            <div className="stat-icon">
                                <UserRound size={22} />
                            </div>

                            <div>
                                <h3>
                                    {femalePatients}
                                </h3>

                                <p>
                                    Female Patients
                                </p>
                            </div>

                        </div>

                        <div className="patient-stat-card">

                            <div className="stat-icon">
                                <Activity size={22} />
                            </div>

                            <div>
                                <h3>
                                    {activePatients}
                                </h3>

                                <p>
                                    Active Cases
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* ================= SEARCH ================= */}
                    <div className="patients-toolbar">

                        <div className="search-box">

                            <Search size={20} />

                            <input
                                type="text"
                                placeholder="Search patient by name, email or phone..."
                                value={searchTerm}
                                onChange={(e) =>
                                    setSearchTerm(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="patient-count">

                            {filteredPatients.length} Patient
                            {filteredPatients.length !== 1
                                ? "s"
                                : ""}

                        </div>

                    </div>

                    {/* ================= PATIENT LIST ================= */}
                    {filteredPatients.length === 0 ? (

                        <div className="no-patients">

                            <Users size={45} />

                            <h2>
                                No Patients Found
                            </h2>

                            <p>
                                No patient records are available.
                            </p>

                        </div>

                    ) : (

                        <div className="patients-grid">

                            {filteredPatients.map(
                                (patient) => (

                                    <div
                                        className="patient-card"
                                        key={patient.id}
                                    >

                                        {/* Patient Header */}
                                        <div className="patient-card-header">

                                            <div className="patient-avatar">

                                                {patient.name
                                                    ?.split(" ")
                                                    .map(
                                                        (name) =>
                                                            name[0]
                                                    )
                                                    .join("")
                                                    .substring(
                                                        0,
                                                        2
                                                    )
                                                    .toUpperCase()}

                                            </div>

                                            <div className="patient-basic">

                                                <h2>
                                                    {patient.name}
                                                </h2>

                                                <p>
                                                    {patient.gender !==
                                                    "N/A"
                                                        ? patient.gender
                                                        : "Patient"}
                                                </p>

                                            </div>

                                        </div>

                                        {/* Patient Basic Information */}
                                        <div className="patient-info">

                                            <div className="info-item">

                                                <Mail size={17} />

                                                <span>
                                                    {patient.email}
                                                </span>

                                            </div>

                                            <div className="info-item">

                                                <Phone size={17} />

                                                <span>
                                                    {patient.phone}
                                                </span>

                                            </div>

                                            <div className="info-item">

                                                <UserRound size={17} />

                                                <span>
                                                    Age: {patient.age}
                                                </span>

                                            </div>

                                            <div className="info-item">

                                                <Droplets size={17} />

                                                <span>
                                                    Blood Group:{" "}
                                                    {patient.bloodGroup}
                                                </span>

                                            </div>

                                            <div className="info-item">

                                                <CalendarDays
                                                    size={17}
                                                />

                                                <span>
                                                    Last Visit:{" "}
                                                    {patient.lastVisit}
                                                </span>

                                            </div>

                                        </div>

                                        {/* Condition */}
                                        <div className="patient-condition">

                                            <span>
                                                Reason for Visit
                                            </span>

                                            <strong>
                                                {patient.condition}
                                            </strong>

                                        </div>

                                        {/* Status */}
                                        <div className="patient-status-row">

                                            <span
                                                className={`status-badge ${
                                                    patient.status?.toLowerCase()
                                                }`}
                                            >
                                                {patient.status}
                                            </span>

                                            <span>
                                                {
                                                    patient.appointmentsCount
                                                }{" "}
                                                Appointment
                                                {patient.appointmentsCount !==
                                                1
                                                    ? "s"
                                                    : ""}
                                            </span>

                                        </div>

                                        {/* Button */}
                                        <button
                                            className="view-patient-btn"
                                            onClick={() =>
                                                setSelectedPatient(
                                                    patient
                                                )
                                            }
                                        >
                                            View Patient Details
                                        </button>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                    {/* ================= PATIENT MODAL ================= */}
                    {selectedPatient && (

                        <div
                            className="patient-modal-overlay"
                            onClick={() =>
                                setSelectedPatient(null)
                            }
                        >

                            <div
                                className="patient-modal"
                                onClick={(e) =>
                                    e.stopPropagation()
                                }
                            >

                                {/* Modal Header */}
                                <div className="modal-header">

                                    <div>

                                        <h2>
                                            Patient Details
                                        </h2>

                                        <p>
                                            Complete patient
                                            information
                                        </p>

                                    </div>

                                    <button
                                        className="close-modal-btn"
                                        onClick={() =>
                                            setSelectedPatient(
                                                null
                                            )
                                        }
                                    >
                                        <X size={22} />
                                    </button>

                                </div>

                                {/* Patient Profile */}
                                <div className="modal-patient-profile">

                                    <div className="modal-avatar">

                                        {selectedPatient.name
                                            ?.split(" ")
                                            .map(
                                                (name) =>
                                                    name[0]
                                            )
                                            .join("")
                                            .substring(
                                                0,
                                                2
                                            )
                                            .toUpperCase()}

                                    </div>

                                    <div>

                                        <h2>
                                            {
                                                selectedPatient.name
                                            }
                                        </h2>

                                        <p>
                                            {
                                                selectedPatient.gender
                                            }{" "}
                                            • Age{" "}
                                            {
                                                selectedPatient.age
                                            }
                                        </p>

                                    </div>

                                </div>

                                {/* Personal Information */}
                                <div className="modal-section">

                                    <h3>
                                        Personal Information
                                    </h3>

                                    <div className="modal-grid">

                                        <div className="modal-info">

                                            <Mail size={18} />

                                            <div>

                                                <span>
                                                    Email
                                                </span>

                                                <strong>
                                                    {
                                                        selectedPatient.email
                                                    }
                                                </strong>

                                            </div>

                                        </div>

                                        <div className="modal-info">

                                            <Phone size={18} />

                                            <div>

                                                <span>
                                                    Phone
                                                </span>

                                                <strong>
                                                    {
                                                        selectedPatient.phone
                                                    }
                                                </strong>

                                            </div>

                                        </div>

                                        <div className="modal-info">

                                            <UserRound
                                                size={18}
                                            />

                                            <div>

                                                <span>
                                                    Age
                                                </span>

                                                <strong>
                                                    {
                                                        selectedPatient.age
                                                    }
                                                </strong>

                                            </div>

                                        </div>

                                        <div className="modal-info">

                                            <UserRound
                                                size={18}
                                            />

                                            <div>

                                                <span>
                                                    Gender
                                                </span>

                                                <strong>
                                                    {
                                                        selectedPatient.gender
                                                    }
                                                </strong>

                                            </div>

                                        </div>

                                        <div className="modal-info">

                                            <Droplets
                                                size={18}
                                            />

                                            <div>

                                                <span>
                                                    Blood Group
                                                </span>

                                                <strong>
                                                    {
                                                        selectedPatient.bloodGroup
                                                    }
                                                </strong>

                                            </div>

                                        </div>

                                        <div className="modal-info">

                                            <MapPin size={18} />

                                            <div>

                                                <span>
                                                    Address
                                                </span>

                                                <strong>
                                                    {
                                                        selectedPatient.address
                                                    }
                                                </strong>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* Medical Information */}
                                <div className="modal-section">

                                    <h3>
                                        Medical Information
                                    </h3>

                                    <div className="medical-details">

                                        <div className="medical-item">

                                            <HeartPulse
                                                size={19}
                                            />

                                            <div>

                                                <span>
                                                    Medical History
                                                </span>

                                                <p>
                                                    {
                                                        selectedPatient.medicalHistory ||
                                                        "No medical history provided"
                                                    }
                                                </p>

                                            </div>

                                        </div>

                                        <div className="medical-item">

                                            <AlertCircle
                                                size={19}
                                            />

                                            <div>

                                                <span>
                                                    Allergies
                                                </span>

                                                <p>
                                                    {
                                                        selectedPatient.allergies ||
                                                        "No allergies provided"
                                                    }
                                                </p>

                                            </div>

                                        </div>

                                        <div className="medical-item">

                                            <Pill size={19} />

                                            <div>

                                                <span>
                                                    Current Medications
                                                </span>

                                                <p>
                                                    {
                                                        selectedPatient.medications ||
                                                        "No medications provided"
                                                    }
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* Appointment Information */}
                                <div className="modal-section">

                                    <h3>
                                        Appointment Information
                                    </h3>

                                    <div className="appointment-summary">

                                        <div>

                                            <span>
                                                Last Visit
                                            </span>

                                            <strong>
                                                {
                                                    selectedPatient.lastVisit
                                                }
                                            </strong>

                                        </div>

                                        <div>

                                            <span>
                                                Reason
                                            </span>

                                            <strong>
                                                {
                                                    selectedPatient.condition
                                                }
                                            </strong>

                                        </div>

                                        <div>

                                            <span>
                                                Status
                                            </span>

                                            <strong>
                                                {
                                                    selectedPatient.status
                                                }
                                            </strong>

                                        </div>

                                        <div>

                                            <span>
                                                Total Appointments
                                            </span>

                                            <strong>
                                                {
                                                    selectedPatient.appointmentsCount
                                                }
                                            </strong>

                                        </div>

                                    </div>

                                </div>

                                {/* Close */}
                                <div className="modal-footer">

                                    <button
                                        onClick={() =>
                                            setSelectedPatient(
                                                null
                                            )
                                        }
                                    >
                                        Close
                                    </button>

                                </div>

                            </div>

                        </div>

                    )}

                </div>

            </main>

        </div>
    );
}

export default DoctorPatients;