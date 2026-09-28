
import React from "react";
import "./About.css";

function About() {
    return (
        <div className="about-page">

            {/* ================= HERO SECTION ================= */}
            <section className="about-hero">
                <div className="about-hero-content">
                    <h1>About Our Healthcare</h1>

                    <p>
                        Connecting patients with doctors through a simple,
                        secure and convenient healthcare platform.
                    </p>
                </div>
            </section>


            {/* ================= ABOUT SECTION ================= */}
            <section className="about-main">

                <div className="about-container">

                    {/* Left Content */}
                    <div className="about-content">

                        <span className="about-small-title">
                            ABOUT US
                        </span>

                        <h2>
                            Making Healthcare Simple and Accessible
                        </h2>

                        <p>
                            Our Healthcare Management System is a web-based
                            platform designed to make healthcare services
                            easier and more convenient for patients,
                            doctors and administrators.
                        </p>

                        <p>
                            Patients can search for doctors based on their
                            specialization, view doctor details, check
                            available information and book appointments
                            through the platform.
                        </p>

                        <p>
                            Doctors can manage their appointments, view
                            patient information and maintain their profiles
                            through their dashboard.
                        </p>

                        <p>
                            The system helps reduce manual appointment
                            management and provides a centralized platform
                            for managing healthcare-related activities.
                        </p>

                    </div>


                    {/* Right Card */}
                    <div className="about-image-card">

                        <div className="health-icon">
                            🏥
                        </div>

                        <h3>
                            Healthcare Management System
                        </h3>

                        <p>
                            Better healthcare management through
                            technology.
                        </p>

                    </div>

                </div>

            </section>


            {/* ================= FEATURES SECTION ================= */}
            <section className="features-section">

                <div className="section-heading">

                    <span>OUR SERVICES</span>

                    <h2>
                        What Our Platform Provides
                    </h2>

                    <p>
                        Our platform provides useful features for both
                        patients and healthcare professionals.
                    </p>

                </div>


                <div className="features-container">

                    {/* Feature 1 */}
                    <div className="feature-card">

                        <div className="feature-icon">
                            🔍
                        </div>

                        <h3>
                            Find Doctors
                        </h3>

                        <p>
                            Patients can search and view doctors based on
                            specialization and other available information.
                        </p>

                    </div>


                    {/* Feature 2 */}
                    <div className="feature-card">

                        <div className="feature-icon">
                            📅
                        </div>

                        <h3>
                            Book Appointments
                        </h3>

                        <p>
                            Patients can select a doctor and book an
                            appointment according to available schedules.
                        </p>

                    </div>


                    {/* Feature 3 */}
                    <div className="feature-card">

                        <div className="feature-icon">
                            👨‍⚕️
                        </div>

                        <h3>
                            Doctor Management
                        </h3>

                        <p>
                            Doctors can manage their profiles and view
                            their appointment information.
                        </p>

                    </div>


                    {/* Feature 4 */}
                    <div className="feature-card">

                        <div className="feature-icon">
                            👤
                        </div>

                        <h3>
                            Patient Dashboard
                        </h3>

                        <p>
                            Patients can manage their profile,
                            appointments and healthcare activities.
                        </p>

                    </div>

                </div>

            </section>


            {/* ================= HOW IT WORKS ================= */}
            <section className="how-section">

                <div className="section-heading">

                    <span>HOW IT WORKS</span>

                    <h2>
                        Simple Steps to Get Healthcare
                    </h2>

                </div>


                <div className="steps-container">

                    {/* Step 1 */}
                    <div className="step-card">

                        <div className="step-number">
                            1
                        </div>

                        <h3>
                            Register
                        </h3>

                        <p>
                            Create your account as a patient or healthcare
                            professional.
                        </p>

                    </div>


                    {/* Step 2 */}
                    <div className="step-card">

                        <div className="step-number">
                            2
                        </div>

                        <h3>
                            Find a Doctor
                        </h3>

                        <p>
                            Search for doctors and view their specialization
                            and profile information.
                        </p>

                    </div>


                    {/* Step 3 */}
                    <div className="step-card">

                        <div className="step-number">
                            3
                        </div>

                        <h3>
                            Book Appointment
                        </h3>

                        <p>
                            Select a suitable doctor and book an appointment.
                        </p>

                    </div>


                    {/* Step 4 */}
                    <div className="step-card">

                        <div className="step-number">
                            4
                        </div>

                        <h3>
                            Manage Healthcare
                        </h3>

                        <p>
                            Manage your appointments and profile from your
                            dashboard.
                        </p>

                    </div>

                </div>

            </section>


            {/* ================= MISSION SECTION ================= */}
            <section className="mission-section">

                <div className="mission-content">

                    <span>
                        OUR MISSION
                    </span>

                    <h2>
                        Improving Healthcare Through Technology
                    </h2>

                    <p>
                        Our mission is to provide a simple digital platform
                        that helps patients connect with doctors and makes
                        appointment management easier for healthcare
                        professionals.
                    </p>

                </div>

            </section>

        </div>
    );
}

export default About;
