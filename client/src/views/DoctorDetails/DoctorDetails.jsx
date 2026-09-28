import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import {
    MapPin,
    Star,
    Clock,
    GraduationCap,
    CalendarDays,
    ArrowLeft,
    UserRound,
    IndianRupee
} from "lucide-react";

import "./DoctorDetails.css";

function DoctorDetails() {

    const { id } = useParams();

    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchDoctors = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:8001/api/doctors"
                );

                const doctors = response.data.doctors;

                console.log("URL Doctor ID:", id);

                console.log(
                    "Doctors received in DoctorDetails:",
                    doctors
                );

                console.log("URL ID:", id);

console.log(
    "MongoDB IDs:",
    doctors.map((doctor) => doctor._id)
);


                // Find doctor using MongoDB _id
                const foundDoctor = doctors.find(
                    (doctor) => String(doctor._id) === String(id)
                );

                console.log(
                    "Doctor found:",
                    foundDoctor
                );

                setDoctor(foundDoctor);

            } catch (error) {

                console.error(
                    "Error fetching doctors:",
                    error
                );

            } finally {

                setLoading(false);

            }
        };

        fetchDoctors();

    }, [id]);


    // Loading
    if (loading) {

        return (
            <div className="doctor-details-loading">

                <h2>
                    Loading Doctor Details...
                </h2>

            </div>
        );

    }


    // Doctor not found
    if (!doctor) {

        return (
            <div className="doctor-details-error">

                <h1>
                    Doctor Not Found
                </h1>

                <p>
                    No doctor found for ID: {id}
                </p>

                <Link
                    to="/doctors"
                    className="back-doctors-btn"
                >

                    <ArrowLeft size={18} />

                    Back to Doctors

                </Link>

            </div>
        );

    }


    // Doctor Details
    return (

        <div className="doctor-details-page">

            {/* Back */}

            <Link
                to="/doctors"
                className="back-link"
            >

                <ArrowLeft size={18} />

                Back to Doctors

            </Link>


            {/* Doctor Profile */}

            <div className="doctor-profile-card">

                <div className="doctor-profile-image">

                    <div className="doctor-profile-avatar">
                        DR
                    </div>

                </div>


                <div className="doctor-profile-main">

                    <div className="doctor-title-row">

                        <div>

                            <h1>
                                {doctor.name}
                            </h1>

                            <h3>
                                {doctor.specialty}
                            </h3>

                        </div>


                        <div className="profile-rating">

                            <Star
                                size={18}
                                fill="currentColor"
                            />

                            <span>
                                {doctor.rating}
                            </span>

                        </div>

                    </div>


                    <div className="profile-details-list">

                        <div className="profile-detail">

                            <GraduationCap size={19} />

                            <span>
                                {doctor.qualification}
                            </span>

                        </div>


                        <div className="profile-detail">

                            <Clock size={19} />

                            <span>
                                {doctor.experience} experience
                            </span>

                        </div>


                        <div className="profile-detail">

                            <MapPin size={19} />

                            <span>
                                {doctor.location}
                            </span>

                        </div>

                    </div>

                </div>

            </div>


            {/* Doctor Information */}

            <div className="doctor-information">


                {/* About */}

                <div className="doctor-info-box">

                    <div className="info-icon">

                        <UserRound size={22} />

                    </div>

                    <div>

                        <h2>
                            About Doctor
                        </h2>

                        <p>
                            {doctor.about ||
                                `${doctor.name} is an experienced ${doctor.specialty} specialist with ${doctor.experience} of professional experience.`
                            }
                        </p>

                    </div>

                </div>


                {/* Available Days */}

                <div className="doctor-info-box">

                    <div className="info-icon">

                        <CalendarDays size={22} />

                    </div>

                    <div>

                        <h2>
                            Available Days
                        </h2>

                        <p>
                            {doctor.availableDays}
                        </p>

                    </div>

                </div>


                {/* Consultation Time */}

                <div className="doctor-info-box">

                    <div className="info-icon">

                        <Clock size={22} />

                    </div>

                    <div>

                        <h2>
                            Consultation Time
                        </h2>

                        <p>
                            {doctor.consultationTime}
                        </p>

                    </div>

                </div>


                {/* Fee */}

                <div className="doctor-info-box">

                    <div className="info-icon">

                        <IndianRupee size={22} />

                    </div>

                    <div>

                        <h2>
                            Consultation Fee
                        </h2>

                        <p className="consultation-fee">
                            {doctor.fee}
                        </p>

                    </div>

                </div>

            </div>


            {/* Book Appointment */}

            <div className="booking-section">

                <div>

                    <h2>
                        Ready to Book an Appointment?
                    </h2>

                    <p>
                        Choose a convenient time and book your
                        consultation with {doctor.name}.
                    </p>

                </div>


                <Link
                    to={`/patient/book-appointment?doctor=${doctor._id}`}
                    className="book-appointment-btn"
                >

                    <CalendarDays size={19} />

                    Book Appointment

                </Link>

            </div>

        </div>

    );

}

export default DoctorDetails;