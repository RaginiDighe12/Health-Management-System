
import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import DoctorCard from "../../components/DoctorCard/DoctorCard";
import { X } from "lucide-react";
import axios from "axios";

import "./Doctors.css";

function Doctors() {

    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ================= GET DOCTORS FROM BACKEND =================

    useEffect(() => {

        const fetchDoctors = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:8001/api/doctors"
                );

                console.log("Doctors from backend:", response.data);

                setDoctors(response.data.doctors);

            } catch (error) {

                console.error("Error fetching doctors:", error);

                setError("Unable to load doctors.");

            } finally {

                setLoading(false);

            }
        };

        fetchDoctors();

    }, []);


    // ================= SEARCH =================

    const filteredDoctors = doctors.filter((doctor) => {

        const search = searchTerm.toLowerCase().trim();

        return (
            doctor.name?.toLowerCase().includes(search) ||
            doctor.specialty?.toLowerCase().includes(search) ||
            doctor.location?.toLowerCase().includes(search)
        );

    });


    // ================= CLEAR SEARCH =================

    const clearSearch = () => {
        setSearchTerm("");
    };


    // ================= LOADING =================

    if (loading) {
        return (
            <div className="doctors-page">
                <h2>Loading doctors...</h2>
            </div>
        );
    }


    // ================= ERROR =================

    if (error) {
        return (
            <div className="doctors-page">
                <h2>{error}</h2>
                <p>Make sure your backend server is running.</p>
            </div>
        );
    }


    return (

        <div className="doctors-page">

            {/* ================= HEADER ================= */}

            <section className="doctors-header">

                <div className="doctors-header-content">

                    <span>HEALTHCARE PROFESSIONALS</span>

                    <h1>Find the Right Doctor</h1>

                    <p>
                        Search for experienced healthcare professionals
                        and find the right doctor for your needs.
                    </p>

                </div>

            </section>


            {/* ================= SEARCH ================= */}

            <section className="doctor-search-section">

                <SearchBar
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by doctor name, specialization or location..."
                />

                {searchTerm && (

                    <div className="search-result-area">

                        <p className="search-result-text">

                            {filteredDoctors.length} doctor
                            {filteredDoctors.length !== 1 ? "s" : ""} found
                            for "<strong>{searchTerm}</strong>"

                        </p>

                        <button
                            className="clear-search"
                            onClick={clearSearch}
                            type="button"
                        >
                            <X size={20} />
                        </button>

                    </div>

                )}

            </section>


            {/* ================= DOCTORS ================= */}

            <section className="doctors-section">

                <div className="doctors-title">

                    <div>

                        <span>OUR DOCTORS</span>

                        <h2>
                            Experienced Healthcare Professionals
                        </h2>

                    </div>

                    <p>
                        {filteredDoctors.length} doctors available
                    </p>

                </div>


                {/* ================= DOCTOR CARDS ================= */}

                {filteredDoctors.length > 0 ? (

                    <div className="doctor-grid">

                        {filteredDoctors.map((doctor) => (

                            <DoctorCard
                                key={doctor._id}
                                doctor={doctor}
                            />

                        ))}

                    </div>

                ) : (

                    /* ================= NO RESULT ================= */

                    <div className="no-doctor">

                        <div className="no-doctor-icon">
                            🔍
                        </div>

                        <h2>
                            No Doctor Found
                        </h2>

                        <p>
                            We couldn't find a doctor matching
                            "{searchTerm}".
                        </p>

                        <button
                            onClick={clearSearch}
                            className="show-all-btn"
                        >
                            Show All Doctors
                        </button>

                    </div>

                )}

            </section>

        </div>

    );
}

export default Doctors;
