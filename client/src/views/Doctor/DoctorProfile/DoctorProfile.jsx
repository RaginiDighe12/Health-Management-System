
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../../components/SideBar/SideBar";
import "./DoctorProfile.css";

function DoctorProfile() {

    const [isEditing, setIsEditing] = useState(false);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [doctor, setDoctor] = useState({
        name: "",
        specialty: "",
        qualification: "",
        experience: "",
        phone: "",
        email: "",
        location: "",
        fee: "",
        availableDays: "",
        consultationTime: "",
        about: ""
    });

    // Load logged-in doctor
    useEffect(() => {

        const loadDoctorProfile = async () => {

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

                console.log("Doctor ID:", doctorId);

                // Fetch from backend
                const response = await axios.get(
                    `http://localhost:8001/api/doctors/${doctorId}`
                );

                if (response.data.success) {
                    const fetchedDoctor = response.data.doctor;
                    setDoctor({
                        name: fetchedDoctor.name || "",
                        specialty: fetchedDoctor.specialty || "",
                        qualification: fetchedDoctor.qualification || "",
                        experience: fetchedDoctor.experience || "",
                        phone: fetchedDoctor.phone || "",
                        email: fetchedDoctor.email || "",
                        location: fetchedDoctor.location || "",
                        fee: fetchedDoctor.fee || "",
                        availableDays: fetchedDoctor.availableDays || "",
                        consultationTime: fetchedDoctor.consultationTime || "",
                        about: fetchedDoctor.about || ""
                    });
                } else {
                    setError("Failed to fetch doctor profile.");
                }

            } catch (error) {

                console.error(
                    "Load doctor profile error:",
                    error
                );

                setError("Failed to load doctor profile.");

            } finally {

                setLoading(false);

            }
        };

        loadDoctorProfile();

    }, []);


    // Handle input changes
    const handleChange = (e) => {

        setDoctor({
            ...doctor,
            [e.target.name]: e.target.value
        });

        setSaved(false);
        setError("");
    };


    // Save doctor profile to MongoDB
    const handleSave = async () => {

        try {

            setSaving(true);
            setError("");
            setSaved(false);

            const storedUser = localStorage.getItem("user");

            if (!storedUser) {
                setError("Please login again.");
                return;
            }

            const user = JSON.parse(storedUser);

            const doctorId = user._id || user.id;

            if (!doctorId) {
                setError("Doctor ID not found. Please login again.");
                return;
            }

            console.log("Updating doctor ID:", doctorId);

            console.log("Data being sent to backend:", doctor);

            const response = await axios.put(
                `http://localhost:8001/api/doctors/${doctorId}`,
                doctor
            );

            console.log(
                "Update doctor response:",
                response.data
            );

            if (response.data.success) {

                // Backend returns updated doctor
                const updatedDoctor = response.data.doctor;

                // Update React state
                setDoctor({
                    name: updatedDoctor.name || "",
                    specialty: updatedDoctor.specialty || "",
                    qualification: updatedDoctor.qualification || "",
                    experience: updatedDoctor.experience || "",
                    phone: updatedDoctor.phone || "",
                    email: updatedDoctor.email || "",
                    location: updatedDoctor.location || "",
                    fee: updatedDoctor.fee || "",
                    availableDays: updatedDoctor.availableDays || "",
                    consultationTime:
                        updatedDoctor.consultationTime || "",
                    about: updatedDoctor.about || ""
                });

                // Update localStorage
                localStorage.setItem(
                    "user",
                    JSON.stringify(updatedDoctor)
                );

                setIsEditing(false);
                setSaved(true);

                alert("Profile updated successfully!");

            }

        } catch (error) {

            console.error(
                "Update doctor profile error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to update profile."
            );

        } finally {

            setSaving(false);

        }
    };


    // Cancel editing
    const handleCancel = async () => {

        setIsEditing(false);
        setSaved(false);
        setError("");

        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;
        const user = JSON.parse(storedUser);
        const doctorId = user._id || user.id;

        try {
            const response = await axios.get(
                `http://localhost:8001/api/doctors/${doctorId}`
            );

            if (response.data.success) {
                const fetchedDoctor = response.data.doctor;
                setDoctor({
                    name: fetchedDoctor.name || "",
                    specialty: fetchedDoctor.specialty || "",
                    qualification: fetchedDoctor.qualification || "",
                    experience: fetchedDoctor.experience || "",
                    phone: fetchedDoctor.phone || "",
                    email: fetchedDoctor.email || "",
                    location: fetchedDoctor.location || "",
                    fee: fetchedDoctor.fee || "",
                    availableDays: fetchedDoctor.availableDays || "",
                    consultationTime: fetchedDoctor.consultationTime || "",
                    about: fetchedDoctor.about || ""
                });
            }
        } catch (error) {
            console.error("Cancel profile error:", error);
        }
    };


    if (loading) {

        return (
            <div className="doctor-profile-page">

                <Sidebar />

                <main className="doctor-profile-main">

                    <div className="profile-section">
                        <h2>Loading profile...</h2>
                    </div>

                </main>

            </div>
        );
    }


    return (
        <div className="doctor-profile-page">

            <Sidebar />

            <main className="doctor-profile-main">

                {/* Header */}

                <div className="profile-page-header">

                    <div>

                        <h1>My Profile</h1>

                        <p>
                            Manage your professional information
                        </p>

                    </div>

                    {!isEditing && (

                        <button
                            className="edit-profile-btn"
                            onClick={() => {
                                setIsEditing(true);
                                setSaved(false);
                            }}
                        >
                            ✏️ Edit Profile
                        </button>

                    )}

                </div>


                {/* Error */}

                {error && (

                    <div className="profile-success">
                        {error}
                    </div>

                )}


                {/* Success */}

                {saved && (

                    <div className="profile-success">
                        ✓ Profile updated successfully!
                    </div>

                )}


                {/* Profile Header Card */}

                <div className="profile-card">

                    <div className="profile-avatar">

                        {doctor.name
                            ?.split(" ")
                            .map((name) => name[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase() || "DR"}

                    </div>

                    <div className="profile-main-info">

                        <h2>
                            {doctor.name || "Doctor"}
                        </h2>

                        <p className="profile-specialty">
                            {doctor.specialty ||
                                "Healthcare Specialist"}
                        </p>

                        <p>
                            🎓{" "}
                            {doctor.qualification ||
                                "Qualification not available"}
                        </p>

                        <p>
                            💼{" "}
                            {doctor.experience ||
                                "Experience not available"}{" "}
                            Experience
                        </p>

                    </div>

                </div>


                {/* Professional Information */}

                <section className="profile-section">

                    <h2>Professional Information</h2>

                    <div className="profile-grid">

                        <div className="profile-field">

                            <label>Doctor Name</label>

                            {isEditing ? (

                                <input
                                    name="name"
                                    value={doctor.name}
                                    onChange={handleChange}
                                />

                            ) : (

                                <p>{doctor.name}</p>

                            )}

                        </div>


                        <div className="profile-field">

                            <label>Specialization</label>

                            {isEditing ? (

                                <input
                                    name="specialty"
                                    value={doctor.specialty}
                                    onChange={handleChange}
                                />

                            ) : (

                                <p>{doctor.specialty}</p>

                            )}

                        </div>


                        <div className="profile-field">

                            <label>Qualification</label>

                            {isEditing ? (

                                <input
                                    name="qualification"
                                    value={doctor.qualification}
                                    onChange={handleChange}
                                />

                            ) : (

                                <p>{doctor.qualification}</p>

                            )}

                        </div>


                        <div className="profile-field">

                            <label>Experience</label>

                            {isEditing ? (

                                <input
                                    name="experience"
                                    value={doctor.experience}
                                    onChange={handleChange}
                                />

                            ) : (

                                <p>{doctor.experience}</p>

                            )}

                        </div>

                    </div>

                </section>


                {/* Contact Information */}

                <section className="profile-section">

                    <h2>Contact Information</h2>

                    <div className="profile-grid">

                        <div className="profile-field">

                            <label>Phone</label>

                            {isEditing ? (

                                <input
                                    name="phone"
                                    value={doctor.phone}
                                    onChange={handleChange}
                                />

                            ) : (

                                <p>
                                    📞 {doctor.phone || "N/A"}
                                </p>

                            )}

                        </div>


                        <div className="profile-field">

                            <label>Email</label>

                            {isEditing ? (

                                <input
                                    name="email"
                                    value={doctor.email}
                                    onChange={handleChange}
                                />

                            ) : (

                                <p>
                                    ✉️ {doctor.email}
                                </p>

                            )}

                        </div>


                        <div className="profile-field">

                            <label>Location</label>

                            {isEditing ? (

                                <input
                                    name="location"
                                    value={doctor.location}
                                    onChange={handleChange}
                                />

                            ) : (

                                <p>
                                    📍 {doctor.location || "N/A"}
                                </p>

                            )}

                        </div>


                        <div className="profile-field">

                            <label>Consultation Fee</label>

                            {isEditing ? (

                                <input
                                    name="fee"
                                    value={doctor.fee}
                                    onChange={handleChange}
                                />

                            ) : (

                                <p>
                                    ₹{doctor.fee || "N/A"}
                                </p>

                            )}

                        </div>

                    </div>

                </section>


                {/* Availability */}

                <section className="profile-section">

                    <h2>Availability</h2>

                    <div className="profile-grid">

                        <div className="profile-field">

                            <label>Available Days</label>

                            {isEditing ? (

                                <input
                                    name="availableDays"
                                    value={doctor.availableDays}
                                    onChange={handleChange}
                                />

                            ) : (

                                <p>
                                    📅{" "}
                                    {doctor.availableDays || "N/A"}
                                </p>

                            )}

                        </div>


                        <div className="profile-field">

                            <label>Consultation Time</label>

                            {isEditing ? (

                                <input
                                    name="consultationTime"
                                    value={doctor.consultationTime}
                                    onChange={handleChange}
                                />

                            ) : (

                                <p>
                                    🕐{" "}
                                    {doctor.consultationTime || "N/A"}
                                </p>

                            )}

                        </div>

                    </div>

                </section>


                {/* About */}

                <section className="profile-section">

                    <h2>About Doctor</h2>

                    {isEditing ? (

                        <textarea
                            name="about"
                            value={doctor.about}
                            onChange={handleChange}
                        />

                    ) : (

                        <p className="about-text">

                            {doctor.about ||
                                "No information available."}

                        </p>

                    )}

                </section>


                {/* Save Buttons */}

                {isEditing && (

                    <div className="profile-action-buttons">

                        <button
                            className="save-profile-btn"
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : "✓ Save Changes"}
                        </button>


                        <button
                            className="cancel-profile-btn"
                            onClick={handleCancel}
                            disabled={saving}
                        >
                            Cancel
                        </button>

                    </div>

                )}

            </main>

        </div>
    );
}

export default DoctorProfile;
