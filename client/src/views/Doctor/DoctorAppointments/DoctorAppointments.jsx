
import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../../../components/SideBar/SideBar";
import SearchBar from "../../../components/SearchBar/SearchBar";
import AppointmentCard from "../../../components/AppointmentCard/AppointmentCard";

import "./DoctorAppointments.css";


function DoctorAppointments() {

    // ================================
    // APPOINTMENT DATA
    // ================================

    const [appointments, setAppointments] = useState([]);


    // ================================
    // STATES
    // ================================

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("All");

    const [selectedAppointment, setSelectedAppointment] =
        useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // ================================
    // GET DOCTOR APPOINTMENTS
    // ================================

    useEffect(() => {

        const fetchDoctorAppointments = async () => {

            try {

                // Get logged-in doctor
                const storedUser =
                    localStorage.getItem("user");


                if (!storedUser) {

                    setError(
                        "Please login to view appointments."
                    );

                    setLoading(false);

                    return;
                }


                const user = JSON.parse(storedUser);
                console.log("Logged-in user from localStorage:", user);


                const doctorId =
                    user._id || user.id;
                    console.log("Doctor ID used for API:", doctorId);


                if (!doctorId) {

                    setError(
                        "Doctor ID not found. Please login again."
                    );

                    setLoading(false);

                    return;
                }


                console.log(
                    "Doctor ID:",
                    + doctorId
                );


                // Get doctor's appointments
                const response = await axios.get(
                    `http://localhost:8001/api/appointments/doctor/${doctorId}`
                );


                console.log(
                    "Doctor appointments:",
                    response.data
                );


                if (response.data.success) {

                    setAppointments(
                        response.data.appointments
                    );

                }

            } catch (error) {

                console.error(
                    "Get doctor appointments error:",
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


        fetchDoctorAppointments();

    }, []);


    // ================================
    // ACCEPT APPOINTMENT
    // ================================

    const acceptAppointment = async (id) => {

        try {

            console.log(
                "Confirming appointment:",
                id
            );


            const response = await axios.put(
                `http://localhost:8001/api/appointments/${id}/status`,
                {
                    status: "Confirmed"
                }
            );


            console.log(
                "Confirm response:",
                response.data
            );


            if (response.data.success) {

                alert(
                    "Appointment confirmed successfully."
                );


                // Update appointment on screen
                setAppointments(
                    (previousAppointments) => {

                        return previousAppointments.map(
                            (appointment) => {

                                if (
                                    appointment._id === id
                                ) {

                                    return {
                                        ...appointment,
                                        status: "Confirmed"
                                    };

                                }

                                return appointment;

                            }
                        );

                    }
                );


                // Update modal if open
                setSelectedAppointment(
                    (previousAppointment) => {

                        if (
                            previousAppointment?._id === id
                        ) {

                            return {
                                ...previousAppointment,
                                status: "Confirmed"
                            };

                        }

                        return previousAppointment;

                    }
                );

            }

        } catch (error) {

            console.error(
                "Confirm appointment error:",
                error
            );


            alert(
                error.response?.data?.message ||
                "Failed to confirm appointment."
            );

        }

    };


    // ================================
    // REJECT APPOINTMENT
    // ================================

    const rejectAppointment = async (id) => {

        const confirmReject = window.confirm(
            "Are you sure you want to reject this appointment?"
        );


        if (!confirmReject) {

            return;

        }


        try {

            console.log(
                "Rejecting appointment:",
                id
            );


            const response = await axios.put(
                `http://localhost:8001/api/appointments/${id}/status`,
                {
                    status: "Rejected"
                }
            );


            console.log(
                "Reject response:",
                response.data
            );


            if (response.data.success) {

                alert(
                    "Appointment rejected successfully."
                );


                // Update appointment on screen
                setAppointments(
                    (previousAppointments) => {

                        return previousAppointments.map(
                            (appointment) => {

                                if (
                                    appointment._id === id
                                ) {

                                    return {
                                        ...appointment,
                                        status: "Rejected"
                                    };

                                }

                                return appointment;

                            }
                        );

                    }
                );


                // Update modal if open
                setSelectedAppointment(
                    (previousAppointment) => {

                        if (
                            previousAppointment?._id === id
                        ) {

                            return {
                                ...previousAppointment,
                                status: "Rejected"
                            };

                        }

                        return previousAppointment;

                    }
                );

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


    // ================================
    // COMPLETE APPOINTMENT
    // ================================

    const completeAppointment = async (id) => {

        const confirmComplete = window.confirm(
            "Are you sure you want to mark this appointment as completed?"
        );


        if (!confirmComplete) {

            return;

        }


        try {

            console.log(
                "Completing appointment:",
                id
            );


            const response = await axios.put(
                `http://localhost:8001/api/appointments/${id}/status`,
                {
                    status: "Completed"
                }
            );


            console.log(
                "Complete response:",
                response.data
            );


            if (response.data.success) {

                alert(
                    "Appointment marked as completed."
                );


                // Update appointment on screen
                setAppointments(
                    (previousAppointments) => {

                        return previousAppointments.map(
                            (appointment) => {

                                if (
                                    appointment._id === id
                                ) {

                                    return {
                                        ...appointment,
                                        status: "Completed"
                                    };

                                }

                                return appointment;

                            }
                        );

                    }
                );


                // Update modal if open
                setSelectedAppointment(
                    (previousAppointment) => {

                        if (
                            previousAppointment?._id === id
                        ) {

                            return {
                                ...previousAppointment,
                                status: "Completed"
                            };

                        }

                        return previousAppointment;

                    }
                );

            }

        } catch (error) {

            console.error(
                "Complete appointment error:",
                error
            );


            alert(
                error.response?.data?.message ||
                "Failed to complete appointment."
            );

        }

    };


    // ================================
    // SEARCH + FILTER
    // ================================

    const filteredAppointments =
        appointments.filter(
            (appointment) => {

                const patientName =
                    appointment.patient?.name || "";


                const matchesSearch =
                    patientName
                        .toLowerCase()
                        .includes(
                            search.toLowerCase()
                        );


                const matchesFilter =
                    filter === "All" ||
                    appointment.status === filter;


                return (
                    matchesSearch &&
                    matchesFilter
                );

            }
        );


    // ================================
    // LOADING
    // ================================

    if (loading) {

        return (

            <div className="doctor-appointments-page">

                <Sidebar />

                <main className="doctor-appointments-main">

                    <div className="no-appointments">

                        Loading appointments...

                    </div>

                </main>

            </div>

        );

    }


    // ================================
    // PAGE
    // ================================

    return (

        <div className="doctor-appointments-page">

            {/* Sidebar */}

            <Sidebar />


            <main className="doctor-appointments-main">


                {/* ================================
                    HEADER
                ================================= */}

                <div className="appointments-header">

                    <div>

                        <h1>
                            Appointments
                        </h1>

                        <p>
                            Manage your patient appointments
                        </p>

                    </div>

                </div>


                {/* ================================
                    ERROR
                ================================= */}

                {error && (

                    <div className="no-appointments">

                        {error}

                    </div>

                )}


                {/* ================================
                    STATISTICS
                ================================= */}

                {!error && (

                    <div className="appointment-stats">


                        {/* Total */}

                        <div>

                            <h3>
                                {appointments.length}
                            </h3>

                            <p>
                                Total
                            </p>

                        </div>


                        {/* Pending */}

                        <div>

                            <h3>

                                {
                                    appointments.filter(
                                        (a) =>
                                            a.status ===
                                            "Pending"
                                    ).length
                                }

                            </h3>

                            <p>
                                Pending
                            </p>

                        </div>


                        {/* Confirmed */}

                        <div>

                            <h3>

                                {
                                    appointments.filter(
                                        (a) =>
                                            a.status ===
                                            "Confirmed"
                                    ).length
                                }

                            </h3>

                            <p>
                                Confirmed
                            </p>

                        </div>


                        {/* Completed */}

                        <div>

                            <h3>

                                {
                                    appointments.filter(
                                        (a) =>
                                            a.status ===
                                            "Completed"
                                    ).length
                                }

                            </h3>

                            <p>
                                Completed
                            </p>

                        </div>


                        {/* Rejected */}

                        <div>

                            <h3>

                                {
                                    appointments.filter(
                                        (a) =>
                                            a.status ===
                                            "Rejected"
                                    ).length
                                }

                            </h3>

                            <p>
                                Rejected
                            </p>

                        </div>

                    </div>

                )}


                {/* ================================
                    SEARCH + FILTER
                ================================= */}

                {!error && (

                    <div className="appointment-controls">


                        <SearchBar
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            placeholder="Search patient..."
                        />


                        <select
                            value={filter}
                            onChange={(e) =>
                                setFilter(
                                    e.target.value
                                )
                            }
                        >

                            <option value="All">
                                All
                            </option>

                            <option value="Pending">
                                Pending
                            </option>

                            <option value="Confirmed">
                                Confirmed
                            </option>

                            <option value="Rejected">
                                Rejected
                            </option>
                            
                            <option value="Completed">
                                Completed
                            </option>

                        </select>

                    </div>

                )}


                {/* ================================
                    APPOINTMENT LIST
                ================================= */}

                {!error && (

                    <div className="appointment-list">


                        {filteredAppointments.map(
                            (appointment) => (

                                <AppointmentCard
                                    key={
                                        appointment._id
                                    }

                                    appointment={
                                        appointment
                                    }

                                    userType="doctor"

                                    onView={
                                        setSelectedAppointment
                                    }

                                    onAccept={
                                        acceptAppointment
                                    }

                                    onReject={
                                        rejectAppointment
                                    }

                                    onComplete={
                                        completeAppointment
                                    }

                                />

                            )
                        )}


                        {/* No Appointments */}

                        {filteredAppointments.length === 0 && (

                            <div className="no-appointments">

                                No appointments found.

                            </div>

                        )}

                    </div>

                )}


            </main>


            {/* ================================
                APPOINTMENT DETAILS MODAL
            ================================= */}

            {selectedAppointment && (

                <div className="appointment-modal-overlay">


                    <div className="appointment-modal">


                        {/* Close Button */}

                        <button
                            onClick={() =>
                                setSelectedAppointment(
                                    null
                                )
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

                            {
                                selectedAppointment.patient
                                    ?.name
                            }

                        </p>


                        <p>

                            <strong>
                                Email:
                            </strong>{" "}

                            {
                                selectedAppointment.patient
                                    ?.email
                            }

                        </p>


                        <p>

                            <strong>
                                Date:
                            </strong>{" "}

                            {
                                selectedAppointment.appointmentDate
                            }

                        </p>


                        <p>

                            <strong>
                                Time:
                            </strong>{" "}

                            {
                                selectedAppointment.appointmentTime
                            }

                        </p>


                        <p>

                            <strong>
                                Reason:
                            </strong>{" "}

                            {
                                selectedAppointment.reason
                            }

                        </p>


                        <p>

                            <strong>
                                Status:
                            </strong>{" "}

                            {
                                selectedAppointment.status
                            }

                        </p>


                    </div>

                </div>

            )}

        </div>

    );

}


export default DoctorAppointments;
