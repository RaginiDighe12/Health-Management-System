
import {
    CalendarDays,
    Clock,
    Stethoscope
} from "lucide-react";

import "./AppointmentCard.css";


function AppointmentCard({
    appointment,
    userType = "doctor",
    onView,
    onAccept,
    onReject,
    onCancel,
    onComplete
}) {

    const isDoctor = userType === "doctor";


    // =================================
    // GET PERSON INFORMATION
    // =================================

    const personName = isDoctor
        ? appointment.patient?.name
        : appointment.doctor?.name;


    const personEmail = isDoctor
        ? appointment.patient?.email
        : appointment.doctor?.email;


    // =================================
    // GENERATE INITIALS
    // =================================

    const initials = personName
        ? personName
            .split(" ")
            .map((name) => name[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()
        : "U";


    // =================================
    // APPOINTMENT ID
    // =================================

    const appointmentId =
        appointment._id || appointment.id;


    // =================================
    // DATE
    // =================================

    const appointmentDate =
        appointment.appointmentDate ||
        appointment.date;


    // =================================
    // TIME
    // =================================

    const appointmentTime =
        appointment.appointmentTime ||
        appointment.time;


    return (

        <div className="common-appointment-card">


            {/* =========================
                TOP SECTION
            ========================== */}

            <div className="appointment-card-top">

                <div className="appointment-person">

                    <div className="appointment-person-avatar">
                        {initials}
                    </div>

                    <div>

                        <h3>
                            {personName || "Patient"}
                        </h3>

                        <p>

                            {isDoctor
                                ? `Email: ${personEmail || "N/A"}`
                                : appointment.doctor?.specialty ||
                                  "Healthcare Specialist"
                            }

                        </p>

                    </div>

                </div>


                {/* Status */}

                <span
                    className={`common-appointment-status ${
                        appointment.status?.toLowerCase()
                    }`}
                >
                    {appointment.status}
                </span>

            </div>



            {/* =========================
                APPOINTMENT DETAILS
            ========================== */}

            <div className="appointment-card-details">


                {/* Date */}

                <div className="appointment-detail">

                    <CalendarDays size={18} />

                    <div>

                        <small>
                            Date
                        </small>

                        <strong>
                            {appointmentDate}
                        </strong>

                    </div>

                </div>


                {/* Time */}

                <div className="appointment-detail">

                    <Clock size={18} />

                    <div>

                        <small>
                            Time
                        </small>

                        <strong>
                            {appointmentTime}
                        </strong>

                    </div>

                </div>


                {/* Reason */}

                <div className="appointment-detail">

                    <Stethoscope size={18} />

                    <div>

                        <small>
                            Reason
                        </small>

                        <strong>
                            {appointment.reason}
                        </strong>

                    </div>

                </div>

            </div>



            {/* =========================
                ACTION BUTTONS
            ========================== */}

            <div className="common-appointment-actions">


                {/* View */}

                {onView && (

                    <button
                        className="appointment-btn appointment-view-btn"
                        onClick={() =>
                            onView(appointment)
                        }
                    >
                        View Details
                    </button>

                )}


                {/* =========================
                    DOCTOR ACTIONS
                ========================== */}

                {isDoctor &&
                    appointment.status === "Pending" && (

                        <>


                            {/* Accept */}

                            {onAccept && (

                                <button
                                    className="appointment-btn appointment-accept-btn"
                                    onClick={() =>
                                        onAccept(
                                            appointmentId
                                        )
                                    }
                                >
                                    Accept
                                </button>

                            )}


                            {/* Reject */}

                            {onReject && (

                                <button
                                    className="appointment-btn appointment-reject-btn"
                                    onClick={() =>
                                        onReject(
                                            appointmentId
                                        )
                                    }
                                >
                                    Reject
                                </button>

                            )}

                        </>

                    )
                }
                
                {isDoctor &&
                    appointment.status === "Confirmed" && (
                        <>
                            {onComplete && (
                                <button
                                    className="appointment-btn appointment-accept-btn"
                                    style={{ backgroundColor: "blue", color: "white" }}
                                    onClick={() =>
                                        onComplete(
                                            appointmentId
                                        )
                                    }
                                >
                                    Complete
                                </button>
                            )}
                        </>
                    )
                }


                {/* =========================
                    PATIENT ACTION
                ========================== */}

                {!isDoctor &&
                    appointment.status === "Confirmed" &&
                    onCancel && (

                        <button
                            className="appointment-btn appointment-cancel-btn"
                            onClick={() =>
                                onCancel(
                                    appointmentId
                                )
                            }
                        >
                            Cancel Appointment
                        </button>

                    )
                }


            </div>


        </div>

    );

}


export default AppointmentCard;
