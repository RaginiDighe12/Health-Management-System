import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
    UserRound,
    Mail,
    Phone,
    MapPin,
    CalendarDays,
    Edit3,
    Save,
    ArrowLeft,
    ShieldCheck
} from "lucide-react";

import Sidebar from "../../../components/SideBar/SideBar";

import "./PatientProfile.css";


function PatientProfile() {

    const [patient, setPatient] = useState({
        name: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        bloodGroup: "",
        age: "",
        medicalHistory: "",
        allergies: "",
        medications: ""
    });

    const [isEditing, setIsEditing] = useState(false);

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // ==========================================
    // GET LOGGED-IN PATIENT
    // ==========================================

    useEffect(() => {

        const fetchPatientProfile = async () => {

            try {

                const storedUser =
                    localStorage.getItem("user");

                if (!storedUser) {

                    setError("Please login first.");

                    setLoading(false);

                    return;
                }

                const user =
                    JSON.parse(storedUser);

                const patientId =
                    user._id || user.id;

                if (!patientId) {

                    setError(
                        "Patient ID not found. Please login again."
                    );

                    setLoading(false);

                    return;
                }

                const response =
                    await axios.get(
                        `http://localhost:8001/api/patients/${patientId}`
                    );

                if (response.data.success) {

                    const data =
                        response.data.patient;

                    setPatient({

                        name:
                            data.name || "",

                        email:
                            data.email || "",

                        phone:
                            data.phone || "",

                        dateOfBirth:
                            data.dateOfBirth || "",

                        gender:
                            data.gender || "",

                        address:
                            data.address || "",

                        bloodGroup:
                            data.bloodGroup || "",

                        age:
                            data.age || "",

                        medicalHistory:
                            data.medicalHistory || "",

                        allergies:
                            data.allergies || "",

                        medications:
                            data.medications || ""

                    });
                }

            } catch (error) {

                console.error(
                    "Get patient profile error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load profile."
                );

            } finally {

                setLoading(false);

            }
        };

        fetchPatientProfile();

    }, []);


    // ==========================================
    // INPUT CHANGE
    // ==========================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setPatient(
            (previousPatient) => ({
                ...previousPatient,
                [name]: value
            })
        );
    };


    // ==========================================
    // SAVE PROFILE
    // ==========================================

    const handleSave = async () => {

        try {

            const storedUser =
                localStorage.getItem("user");

            if (!storedUser) {

                setError("Please login first.");

                return;
            }

            const user =
                JSON.parse(storedUser);

            const patientId =
                user._id || user.id;

            const response =
                await axios.put(
                    `http://localhost:8001/api/patients/${patientId}`,
                    patient
                );

            if (response.data.success) {

                const updatedPatient =
                    response.data.patient;

                setPatient({

                    name:
                        updatedPatient.name || "",

                    email:
                        updatedPatient.email || "",

                    phone:
                        updatedPatient.phone || "",

                    dateOfBirth:
                        updatedPatient.dateOfBirth || "",

                    gender:
                        updatedPatient.gender || "",

                    address:
                        updatedPatient.address || "",

                    bloodGroup:
                        updatedPatient.bloodGroup || "",

                    age:
                        updatedPatient.age || "",

                    medicalHistory:
                        updatedPatient.medicalHistory || "",

                    allergies:
                        updatedPatient.allergies || "",

                    medications:
                        updatedPatient.medications || ""

                });


                // ==========================================
                // UPDATE LOCAL STORAGE
                // ==========================================

                const updatedUser = {

                    ...user,

                    name:
                        updatedPatient.name,

                    email:
                        updatedPatient.email,

                    phone:
                        updatedPatient.phone,

                    age:
                        updatedPatient.age,

                    dateOfBirth:
                        updatedPatient.dateOfBirth,

                    gender:
                        updatedPatient.gender,

                    bloodGroup:
                        updatedPatient.bloodGroup,

                    address:
                        updatedPatient.address,

                    medicalHistory:
                        updatedPatient.medicalHistory,

                    allergies:
                        updatedPatient.allergies,

                    medications:
                        updatedPatient.medications

                };

                localStorage.setItem(
                    "user",
                    JSON.stringify(updatedUser)
                );


                setIsEditing(false);

                setMessage(
                    "Profile updated successfully!"
                );

                setError("");

                setTimeout(() => {

                    setMessage("");

                }, 3000);
            }

        } catch (error) {

            console.error(
                "Update patient profile error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to update profile."
            );
        }
    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="patient-profile-layout">

                <Sidebar />

                <main className="patient-profile-main">

                    <div className="profile-loading">
                        Loading profile...
                    </div>

                </main>

            </div>
        );
    }


    return (

        <div className="patient-profile-layout">

            {/* =====================================
                PATIENT SIDEBAR
            ====================================== */}

            <Sidebar />


            {/* =====================================
                MAIN CONTENT
            ====================================== */}

            <main className="patient-profile-main">

                <div className="patient-profile-page">


                    {/* =====================================
                        HEADER
                    ====================================== */}

                    <div className="profile-header">

                        <Link
                            to="/patient/dashboard"
                            className="back-link"
                        >

                            <ArrowLeft size={18} />

                            Back to Dashboard

                        </Link>


                        <div className="profile-title">

                            <h1>
                                My Profile
                            </h1>

                            <p>
                                View and manage your personal information.
                            </p>

                        </div>

                    </div>


                    {/* =====================================
                        SUCCESS MESSAGE
                    ====================================== */}

                    {message && (

                        <div className="profile-success">

                            <ShieldCheck size={20} />

                            {message}

                        </div>

                    )}


                    {/* =====================================
                        ERROR MESSAGE
                    ====================================== */}

                    {error && (

                        <div className="profile-error">

                            {error}

                        </div>

                    )}


                    <div className="profile-container">


                        {/* =====================================
                            PROFILE CARD
                        ====================================== */}

                        <div className="profile-card">


                            {/* Profile Top */}

                            <div className="profile-top">

                                <div className="profile-avatar">

                                    {patient.name
                                        ?.split(" ")
                                        .map(
                                            (name) =>
                                                name[0]
                                        )
                                        .join("")
                                        .slice(0, 2)
                                        .toUpperCase() || "PT"}

                                </div>


                                <div>

                                    <h2>
                                        {patient.name ||
                                            "Patient"}
                                    </h2>

                                    <p>
                                        Patient
                                    </p>

                                </div>

                            </div>


                            {/* =====================================
                                PROFILE DETAILS
                            ====================================== */}

                            <div className="profile-details">


                                {/* Name */}

                                <div className="profile-field">

                                    <label>

                                        <UserRound size={17} />

                                        Full Name

                                    </label>

                                    {isEditing ? (

                                        <input
                                            type="text"
                                            name="name"
                                            value={patient.name}
                                            onChange={handleChange}
                                        />

                                    ) : (

                                        <p>
                                            {patient.name ||
                                                "Not provided"}
                                        </p>

                                    )}

                                </div>


                                {/* Email */}

                                <div className="profile-field">

                                    <label>

                                        <Mail size={17} />

                                        Email Address

                                    </label>

                                    {isEditing ? (

                                        <input
                                            type="email"
                                            name="email"
                                            value={patient.email}
                                            onChange={handleChange}
                                        />

                                    ) : (

                                        <p>
                                            {patient.email ||
                                                "Not provided"}
                                        </p>

                                    )}

                                </div>


                                {/* Phone */}

                                <div className="profile-field">

                                    <label>

                                        <Phone size={17} />

                                        Phone Number

                                    </label>

                                    {isEditing ? (

                                        <input
                                            type="tel"
                                            name="phone"
                                            value={patient.phone}
                                            onChange={handleChange}
                                        />

                                    ) : (

                                        <p>
                                            {patient.phone ||
                                                "Not provided"}
                                        </p>

                                    )}

                                </div>


                                {/* Date of Birth */}

                                <div className="profile-field">

                                    <label>

                                        <CalendarDays size={17} />

                                        Date of Birth

                                    </label>

                                    {isEditing ? (

                                        <input
                                            type="date"
                                            name="dateOfBirth"
                                            value={patient.dateOfBirth}
                                            onChange={handleChange}
                                        />

                                    ) : (

                                        <p>

                                            {patient.dateOfBirth
                                                ? new Date(
                                                    patient.dateOfBirth
                                                ).toLocaleDateString(
                                                    "en-IN"
                                                )
                                                : "Not provided"}

                                        </p>

                                    )}

                                </div>


                                {/* Age */}

                                <div className="profile-field">

                                    <label>
                                        Age
                                    </label>

                                    {isEditing ? (

                                        <input
                                            type="number"
                                            name="age"
                                            value={patient.age}
                                            onChange={handleChange}
                                        />

                                    ) : (

                                        <p>
                                            {patient.age ||
                                                "Not provided"}
                                        </p>

                                    )}

                                </div>


                                {/* Gender */}

                                <div className="profile-field">

                                    <label>
                                        Gender
                                    </label>

                                    {isEditing ? (

                                        <select
                                            name="gender"
                                            value={patient.gender}
                                            onChange={handleChange}
                                        >

                                            <option value="">
                                                Select Gender
                                            </option>

                                            <option value="Female">
                                                Female
                                            </option>

                                            <option value="Male">
                                                Male
                                            </option>

                                            <option value="Other">
                                                Other
                                            </option>

                                        </select>

                                    ) : (

                                        <p>
                                            {patient.gender ||
                                                "Not provided"}
                                        </p>

                                    )}

                                </div>


                                {/* Blood Group */}

                                <div className="profile-field">

                                    <label>
                                        Blood Group
                                    </label>

                                    {isEditing ? (

                                        <select
                                            name="bloodGroup"
                                            value={patient.bloodGroup}
                                            onChange={handleChange}
                                        >

                                            <option value="">
                                                Select Blood Group
                                            </option>

                                            <option value="A+">
                                                A+
                                            </option>

                                            <option value="A-">
                                                A-
                                            </option>

                                            <option value="B+">
                                                B+
                                            </option>

                                            <option value="B-">
                                                B-
                                            </option>

                                            <option value="AB+">
                                                AB+
                                            </option>

                                            <option value="AB-">
                                                AB-
                                            </option>

                                            <option value="O+">
                                                O+
                                            </option>

                                            <option value="O-">
                                                O-
                                            </option>

                                        </select>

                                    ) : (

                                        <p>
                                            {patient.bloodGroup ||
                                                "Not provided"}
                                        </p>

                                    )}

                                </div>


                                {/* Address */}

                                <div className="profile-field full-width">

                                    <label>

                                        <MapPin size={17} />

                                        Address

                                    </label>

                                    {isEditing ? (

                                        <textarea
                                            name="address"
                                            value={patient.address}
                                            onChange={handleChange}
                                            rows="3"
                                        />

                                    ) : (

                                        <p>
                                            {patient.address ||
                                                "Not provided"}
                                        </p>

                                    )}

                                </div>


                                {/* Medical History */}

                                <div className="profile-field full-width">

                                    <label>
                                        Medical History
                                    </label>

                                    {isEditing ? (

                                        <textarea
                                            name="medicalHistory"
                                            value={
                                                patient.medicalHistory
                                            }
                                            onChange={handleChange}
                                            rows="3"
                                        />

                                    ) : (

                                        <p>
                                            {patient.medicalHistory ||
                                                "Not provided"}
                                        </p>

                                    )}

                                </div>


                                {/* Allergies */}

                                <div className="profile-field full-width">

                                    <label>
                                        Allergies
                                    </label>

                                    {isEditing ? (

                                        <textarea
                                            name="allergies"
                                            value={
                                                patient.allergies
                                            }
                                            onChange={handleChange}
                                            rows="2"
                                        />

                                    ) : (

                                        <p>
                                            {patient.allergies ||
                                                "Not provided"}
                                        </p>

                                    )}

                                </div>


                                {/* Medications */}

                                <div className="profile-field full-width">

                                    <label>
                                        Current Medications
                                    </label>

                                    {isEditing ? (

                                        <textarea
                                            name="medications"
                                            value={
                                                patient.medications
                                            }
                                            onChange={handleChange}
                                            rows="2"
                                        />

                                    ) : (

                                        <p>
                                            {patient.medications ||
                                                "Not provided"}
                                        </p>

                                    )}

                                </div>

                            </div>


                            {/* =====================================
                                PROFILE ACTIONS
                            ====================================== */}

                            <div className="profile-actions">

                                {isEditing ? (

                                    <button
                                        className="save-profile-btn"
                                        onClick={handleSave}
                                    >

                                        <Save size={18} />

                                        Save Changes

                                    </button>

                                ) : (

                                    <button
                                        className="edit-profile-btn"
                                        onClick={() =>
                                            setIsEditing(true)
                                        }
                                    >

                                        <Edit3 size={18} />

                                        Edit Profile

                                    </button>

                                )}

                            </div>

                        </div>


                        {/* =====================================
                            RIGHT SIDE
                        ====================================== */}

                        <div className="profile-side">

                            <div className="profile-side-card">

                                <h2>
                                    Quick Links
                                </h2>

                                <Link to="/patient/dashboard">
                                    Patient Dashboard
                                </Link>

                                <Link to="/patient/appointments">
                                    My Appointments
                                </Link>

                                <Link to="/doctors">
                                    Find a Doctor
                                </Link>

                                <Link to="/patient/book-appointment">
                                    Book Appointment
                                </Link>

                            </div>


                            <div className="profile-side-card">

                                <h2>
                                    Account Information
                                </h2>

                                <div className="account-item">

                                    <span>
                                        Account Type
                                    </span>

                                    <strong>
                                        Patient
                                    </strong>

                                </div>


                                <div className="account-item">

                                    <span>
                                        Account Status
                                    </span>

                                    <strong className="active-status">
                                        Active
                                    </strong>

                                </div>


                                <div className="account-item">

                                    <span>
                                        Profile
                                    </span>

                                    <strong>
                                        Complete
                                    </strong>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}


export default PatientProfile;