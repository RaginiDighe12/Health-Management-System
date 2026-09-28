import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

import {
    CalendarDays,
    Clock,
    MapPin,
    Star,
    ArrowLeft,
    CheckCircle
} from "lucide-react";

import "./BookAppointment.css";


function BookAppointment() {

    // Get doctor ID from URL
    const [searchParams] = useSearchParams();

    const doctorId = searchParams.get("doctor");


    // Doctor state
    const [doctor, setDoctor] = useState(null);

    const [loading, setLoading] = useState(true);


    // Form data
    const [formData, setFormData] = useState({
        date: "",
        time: "",
        reason: "",
        patientName: "",
        patientPhone: "",
        patientEmail: ""
    });


    // Success message
    const [isBooked, setIsBooked] = useState(false);


    // Error message
    const [error, setError] = useState("");


    // Available time slots
    const timeSlots = [
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "1:00 PM",
        "2:00 PM",
        "3:00 PM"
    ];


    // Get doctor from backend
    useEffect(() => {

        const fetchDoctor = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:8001/api/doctors"
                );

                const doctors = response.data.doctors;

                const foundDoctor = doctors.find(
                    (item) =>
                        String(item._id) === String(doctorId)
                );

                setDoctor(foundDoctor);

            } catch (error) {

                console.error(
                    "Error fetching doctor:",
                    error
                );

            } finally {

                setLoading(false);

            }
        };


        if (doctorId) {
            fetchDoctor();
        } else {
            setLoading(false);
        }

    }, [doctorId]);


    // Handle input
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };


    // Handle booking
    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        try {

            /*
             * Get logged-in patient
             *
             * IMPORTANT:
             * Change "user" below if your Login.jsx
             * stores the logged-in user with another key.
             */

            const storedUser = localStorage.getItem("user");

            if (!storedUser) {

                setError(
                    "Please login before booking an appointment."
                );

                return;
            }


            const user = JSON.parse(storedUser);

            const patientId =
                user._id || user.id;


            if (!patientId) {

                setError(
                    "Patient ID not found. Please login again."
                );

                return;
            }


            // Send appointment to backend
            const response = await axios.post(
                "http://localhost:8001/api/appointments",
                {
                    patient: patientId,
                    doctor: doctor._id,
                    appointmentDate: formData.date,
                    appointmentTime: formData.time,
                    reason: formData.reason
                }
            );


            console.log(
                "Appointment response:",
                response.data
            );


            if (response.data.success) {

                setIsBooked(true);

            }

        } catch (error) {

            console.error(
                "Booking error:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to book appointment."
            );

        }

    };


    // Loading
    if (loading) {

        return (
            <div className="booking-page">

                <div className="booking-error">

                    <h1>
                        Loading Doctor...
                    </h1>

                </div>

            </div>
        );

    }


    // Doctor not found
    if (!doctor) {

        return (
            <div className="booking-page">

                <div className="booking-error">

                    <h1>
                        Doctor Not Found
                    </h1>

                    <p>
                        Please select a doctor before
                        booking an appointment.
                    </p>

                    <Link to="/doctors">

                        <ArrowLeft size={18} />

                        Back to Doctors

                    </Link>

                </div>

            </div>
        );

    }


    // Booking successful
    if (isBooked) {

        return (
            <div className="booking-page">

                <div className="booking-success">

                    <CheckCircle size={70} />

                    <h1>
                        Appointment Booked Successfully!
                    </h1>

                    <p>
                        Your appointment with{" "}
                        <strong>
                            {doctor.name}
                        </strong>{" "}
                        has been booked.
                    </p>

                    <div className="appointment-summary">

                        <p>

                            <CalendarDays size={18} />

                            {formData.date}

                        </p>

                        <p>

                            <Clock size={18} />

                            {formData.time}

                        </p>

                    </div>


                    <Link
                        to="/patient/appointments"
                        className="view-appointments-btn"
                    >
                        View My Appointments
                    </Link>


                    <Link
                        to="/doctors"
                        className="back-doctors"
                    >
                        Find Another Doctor
                    </Link>

                </div>

            </div>
        );

    }


    return (
        <div className="booking-page">


            {/* Header */}

            <div className="booking-header">

                <Link
                    to={`/doctor/details/${doctor._id}`}
                    className="back-link"
                >

                    <ArrowLeft size={18} />

                    Back to Doctor

                </Link>

                <h1>
                    Book an Appointment
                </h1>

                <p>
                    Schedule your consultation with
                    our healthcare professional.
                </p>

            </div>


            <div className="booking-container">


                {/* Doctor Card */}

                <div className="selected-doctor">

                    <div className="doctor-avatar">
                        DR
                    </div>


                    <div className="selected-doctor-info">

                        <h2>
                            {doctor.name}
                        </h2>

                        <p className="specialty">
                            {doctor.specialty}
                        </p>

                        <p>
                            <MapPin size={16} />

                            {doctor.location}
                        </p>

                        <p>
                            <Star size={16} />

                            {doctor.rating} Rating
                        </p>

                        <p>
                            Consultation Fee:{" "}
                            <strong>
                                {doctor.fee}
                            </strong>
                        </p>

                    </div>

                </div>


                {/* Booking Form */}

                <div className="booking-form-container">

                    <h2>
                        Appointment Details
                    </h2>


                    <form onSubmit={handleSubmit}>


                        {/* Patient Name */}

                        <div className="form-group">

                            <label>
                                Patient Name
                            </label>

                            <input
                                type="text"
                                name="patientName"
                                value={formData.patientName}
                                onChange={handleChange}
                                placeholder="Enter patient name"
                                required
                            />

                        </div>


                        {/* Phone */}

                        <div className="form-group">

                            <label>
                                Phone Number
                            </label>

                            <input
                                type="tel"
                                name="patientPhone"
                                value={formData.patientPhone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                required
                            />

                        </div>


                        {/* Email */}

                        <div className="form-group">

                            <label>
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="patientEmail"
                                value={formData.patientEmail}
                                onChange={handleChange}
                                placeholder="Enter email address"
                                required
                            />

                        </div>


                        {/* Date */}

                        <div className="form-group">

                            <label>

                                <CalendarDays size={16} />

                                Select Date

                            </label>

                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                min={
                                    new Date()
                                        .toISOString()
                                        .split("T")[0]
                                }
                                required
                            />

                        </div>


                        {/* Time */}

                        <div className="form-group">

                            <label>

                                <Clock size={16} />

                                Select Time

                            </label>

                            <select
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select appointment time
                                </option>

                                {timeSlots.map((time) => (

                                    <option
                                        key={time}
                                        value={time}
                                    >
                                        {time}
                                    </option>

                                ))}

                            </select>

                        </div>


                        {/* Reason */}

                        <div className="form-group">

                            <label>
                                Reason for Visit
                            </label>

                            <textarea
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                placeholder="Briefly describe your reason for consultation"
                                rows="4"
                                required
                            />

                        </div>


                        {/* Doctor Availability */}

                        <div className="availability-box">

                            <div>

                                <strong>
                                    Available Days
                                </strong>

                                <span>
                                    {doctor.availableDays}
                                </span>

                            </div>


                            <div>

                                <strong>
                                    Consultation Time
                                </strong>

                                <span>
                                    {doctor.consultationTime}
                                </span>

                            </div>

                        </div>


                        {/* Error */}

                        {error && (

                            <p
                                style={{
                                    color: "red",
                                    marginTop: "10px"
                                }}
                            >
                                {error}
                            </p>

                        )}


                        {/* Submit */}

                        <button
                            type="submit"
                            className="book-submit-btn"
                        >

                            <CalendarDays size={19} />

                            Confirm Appointment

                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}


export default BookAppointment;