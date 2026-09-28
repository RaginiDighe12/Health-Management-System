
import { Link } from "react-router-dom";
import {
    MapPin,
    Star,
    Clock,
    GraduationCap
} from "lucide-react";

import "./DoctorCard.css";

function DoctorCard({ doctor }) {
    console.log("Doctor received in Card:", doctor);

    return (
        <div className="common-doctor-card">

            {/* Doctor Image / Avatar */}
            <div className="common-doctor-image">

                <div className="common-doctor-avatar">
                    DR
                </div>

                {/* Rating */}
                <div className="common-rating-badge">
                    <Star
                        size={15}
                        fill="currentColor"
                    />
                    {doctor.rating}
                </div>

            </div>


            {/* Doctor Information */}
            <div className="common-doctor-content">

                <h2>
                    {doctor.name}
                </h2>

                <p className="common-doctor-specialty">
                    {doctor.specialty}
                </p>


                {/* Experience */}
                <div className="common-doctor-detail">

                    <Clock size={16} />

                    <span>
                        {doctor.experience} experience
                    </span>

                </div>


                {/* Location */}
                <div className="common-doctor-detail">

                    <MapPin size={16} />

                    <span>
                        {doctor.location}
                    </span>

                </div>


                {/* Qualification */}
                <div className="common-doctor-detail">

                    <GraduationCap size={16} />

                    <span>
                        {doctor.qualification}
                    </span>

                </div>


                {/* Bottom Section */}
                <div className="common-doctor-bottom">

                    <div className="common-doctor-fee">

                        <small>
                            Consultation Fee
                        </small>

                        <strong>
                            {doctor.fee}
                        </strong>

                    </div>


                    <Link
                        to={`/doctor/details/${doctor._id}`}
                        className="common-view-profile-btn"
                    >
                        View Profile
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default DoctorCard;