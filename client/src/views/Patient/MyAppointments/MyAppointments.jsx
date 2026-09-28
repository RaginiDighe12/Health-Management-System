
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
    CalendarDays,
    Clock,
    MapPin,
    Star,
    ArrowLeft,
    Plus,
    CheckCircle,
    XCircle
} from "lucide-react";

import "./MyAppointments.css";


function MyAppointments() {

    // Appointments from MongoDB
    const [appointments, setAppointments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // Get patient appointments
    useEffect(() => {

        const fetchAppointments = async () => {

            try {

                // Get logged-in user
                const storedUser =
                    localStorage.getItem("user");


                if (!storedUser) {

                    setError(
                        "Please login to view your appointments."
                    );

                    setLoading(false);

                    return;
                }


                const user = JSON.parse(storedUser);

                const patientId =
                    user._id || user.id;


                if (!patientId) {

                    setError(
                        "Patient ID not found. Please login again."
                    );

                    setLoading(false);

                    return;
                }


                console.log(
                    "Patient ID:",
                    patientId
                );


                // Get appointments from backend
                const response = await axios.get(
                    `http://localhost:8001/api/appointments/patient/${patientId}`
                );


                console.log(
                    "Appointments from backend:",
                    response.data
                );


                if (response.data.success) {

                    setAppointments(
                        response.data.appointments
                    );

                }

            } catch (error) {

                console.error(
                    "Get appointments error:",
                    error
                );


                setError(
                    error.response?.data?.message ||
                    "Failed to load appointments."
                );

            } finally {

                setLoading(false);

            }

        };


        fetchAppointments();

    }, []);


    // Format date
    const formatDate = (date) => {

        const newDate = new Date(date);

        return newDate.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

    };


    // Cancel appointment
    const handleCancelAppointment = async (
        appointmentId
    ) => {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this appointment?"
        );


        if (!confirmCancel) {
            return;
        }


        try {

            console.log(
                "Cancelling appointment:",
                appointmentId
            );


            const response = await axios.put(
                `http://localhost:8001/api/appointments/${appointmentId}/status`,
                {
                    status: "Cancelled"
                }
            );


            console.log(
                "Cancel appointment response:",
                response.data
            );


            if (response.data.success) {

                alert(
                    "Appointment cancelled successfully."
                );


                // Remove cancelled appointment from screen
                setAppointments(
                    (previousAppointments) => {

                        return previousAppointments.filter(
                            (appointment) =>
                                appointment._id !==
                                appointmentId
                        );

                    }
                );

            }

        } catch (error) {

            console.error(
                "Cancel appointment error:",
                error
            );


            alert(
                error.response?.data?.message ||
                "Failed to cancel appointment."
            );

        }

    };


    // Loading
    if (loading) {

        return (
            <div className="my-appointments-page">

                <div className="no-appointments">

                    <CalendarDays size={60} />

                    <h2>
                        Loading Appointments...
                    </h2>

                </div>

            </div>
        );

    }


    return (

        <div className="my-appointments-page">


            {/* Header */}

            <div className="appointments-header">

                <Link
                    to="/patient/dashboard"
                    className="back-link"
                >

                    <ArrowLeft size={18} />

                    Back to Dashboard

                </Link>


                <div className="header-content">

                    <div>

                        <h1>
                            My Appointments
                        </h1>

                        <p>
                            View and manage your upcoming
                            doctor appointments.
                        </p>

                    </div>


                    <Link
                        to="/doctors"
                        className="book-new-btn"
                    >

                        <Plus size={18} />

                        Book New Appointment

                    </Link>

                </div>

            </div>


            {/* Error */}

            {error && (

                <div className="no-appointments">

                    <XCircle size={60} />

                    <h2>
                        {error}
                    </h2>

                </div>

            )}


            {/* Appointment Count */}

            {!error && (

                <div className="appointment-count">

                    <div className="count-box">

                        <CalendarDays size={25} />

                        <div>

                            <h3>
                                {appointments.length}
                            </h3>

                            <p>
                                Total Appointments
                            </p>

                        </div>

                    </div>

                </div>

            )}


            {/* Appointment List */}

            {!error && (

                <div className="appointments-list">

                    {appointments.length === 0 ? (

                        <div className="no-appointments">

                            <CalendarDays size={60} />

                            <h2>
                                No Appointments Found
                            </h2>

                            <p>
                                You have not booked any
                                appointments yet.
                            </p>


                            <Link
                                to="/doctors"
                                className="book-new-btn"
                            >

                                Find a Doctor

                            </Link>

                        </div>

                    ) : (

                        appointments.map(
                            (appointment) => {

                                const doctor =
                                    appointment.doctor;


                                return (

                                    <div
                                        className="appointment-card"
                                        key={appointment._id}
                                    >


                                        {/* Doctor Information */}

                                        <div className="appointment-doctor">

                                            <div className="doctor-avatar">
                                                DR
                                            </div>


                                            <div>

                                                <h2>
                                                    {doctor?.name}
                                                </h2>

                                                <p className="specialty">
                                                    {doctor?.specialty}
                                                </p>

                                                <p>

                                                    <MapPin
                                                        size={15}
                                                    />

                                                    {doctor?.location}

                                                </p>

                                                <p>

                                                    <Star
                                                        size={15}
                                                    />

                                                    {doctor?.rating}
                                                    {" "}Rating

                                                </p>

                                            </div>

                                        </div>


                                        {/* Appointment Details */}

                                        <div className="appointment-details">


                                            {/* Date */}

                                            <div className="detail-item">

                                                <CalendarDays
                                                    size={20}
                                                />

                                                <div>

                                                    <span>
                                                        Date
                                                    </span>

                                                    <strong>
                                                        {formatDate(
                                                            appointment.appointmentDate
                                                        )}
                                                    </strong>

                                                </div>

                                            </div>


                                            {/* Time */}

                                            <div className="detail-item">

                                                <Clock
                                                    size={20}
                                                />

                                                <div>

                                                    <span>
                                                        Time
                                                    </span>

                                                    <strong>
                                                        {
                                                            appointment.appointmentTime
                                                        }
                                                    </strong>

                                                </div>

                                            </div>


                                            {/* Reason */}

                                            <div className="detail-item">

                                                <div>

                                                    <span>
                                                        Reason
                                                    </span>

                                                    <strong>
                                                        {
                                                            appointment.reason
                                                        }
                                                    </strong>

                                                </div>

                                            </div>

                                        </div>


                                        {/* Status */}

                                        <div className="appointment-status">


                                            {/* Confirmed */}

                                            {appointment.status ===
                                            "Confirmed" ? (

                                                <>

                                                    <CheckCircle
                                                        size={18}
                                                    />

                                                    <span>
                                                        Confirmed
                                                    </span>

                                                </>

                                            ) : appointment.status ===
                                            "Rejected" ? (

                                                /* Rejected */

                                                <>

                                                    <XCircle
                                                        size={18}
                                                    />

                                                    <span>
                                                        Rejected
                                                    </span>

                                                </>

                                            ) : appointment.status ===
                                            "Cancelled" ? (

                                                /* Cancelled */

                                                <>

                                                    <XCircle
                                                        size={18}
                                                    />

                                                    <span>
                                                        Cancelled
                                                    </span>

                                                </>

                                            ) : appointment.status ===
                                            "Completed" ? (

                                                /* Completed */

                                                <>

                                                    <CheckCircle
                                                        size={18}
                                                    />

                                                    <span>
                                                        Completed
                                                    </span>

                                                </>

                                            ) : (

                                                /* Pending */

                                                <>

                                                    <Clock
                                                        size={18}
                                                    />

                                                    <span>
                                                        Pending
                                                    </span>

                                                </>

                                            )}

                                        </div>


                                        {/* Actions */}

                                        <div className="appointment-actions">


                                            {/* View Doctor */}

                                            <Link
                                                to={`/doctor/details/${doctor?._id}`}
                                                className="view-doctor-btn"
                                            >

                                                View Doctor

                                            </Link>


                                            {/* Cancel Appointment */}

                                            <button
                                                className="cancel-btn"
                                                onClick={() =>
                                                    handleCancelAppointment(
                                                        appointment._id
                                                    )
                                                }
                                                disabled={
                                                    appointment.status ===
                                                    "Cancelled" ||
                                                    appointment.status ===
                                                    "Completed" ||
                                                    appointment.status ===
                                                    "Rejected"
                                                }
                                            >

                                                Cancel Appointment

                                            </button>

                                        </div>

                                    </div>

                                );

                            }

                        )

                    )}

                </div>

            )}

        </div>

    );

}


export default MyAppointments;